// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
// import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

interface ISBabelERC20 {
    function stakingContract() external view returns (address);

    function circulatingSupply() external view returns (uint);
}

interface IWBabelERC20 {
    function staking() external view returns (address);

    function wrapFromsBABEL(uint _amount) external returns (uint);
}

interface IStaking {
    function BABEL() external view returns (address);

    function warmupPeriod() external view returns (uint);

    function epoch() external view returns (
        uint length,
        uint number,
        uint endTime,
        uint distribute
    );

    function stake(uint256 _amount, address _recipient) external returns (bool);

    function unstake(uint _amount, bool _trigger) external;
}

interface IStakingHelper {
    function staking() external view returns (address);

    function stake(uint _amount, address _recipient) external;
}

interface IBondDepository {
    function principle() external view returns (address);

    function bondInfo(address _depositor) external returns (
        uint payout,
        uint vesting,
        uint lastTime,
        uint pricePaid
    );

    function deposit(
        uint _amount,
        uint _maxPrice,
        address _depositor
    ) external returns (uint);

    function redeem(address _recipient, bool _stake) external returns (uint);

    function bondPriceInUSD() external view returns (uint);

    function bondPrice() external view returns (uint);
}

interface IUniswapV2Router is IUniswapV2Router02 {
    function WAVAX() external pure returns (address);

    function addLiquidityAVAX(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);

    function swapExactTokensForAVAX(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
    external
    returns (uint[] memory amounts);
}

interface IUniswapV2Pair is IERC20 {
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function mint(address to) external returns (uint liquidity);
}

contract BondingArbitrage is Pausable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address public token; // subject token, e.g., OHM
    address public sToken; // staking token, e.g., sOHM
    address public wsToken; // wrapped staking token, e.g., wsOHM

    address public staking;
    address public stakingHelper;

    address[] public reserveDepositors; // push only, only for viewing.
    mapping(address => bool) public isReserveDepositor;
    address[] public liquidityDepositors; // push only, only for viewing.
    mapping(address => bool) public isLiquidityDepositor;

    enum NATIVE_TOKEN {WETH, WAVAX}
    NATIVE_TOKEN public nativeToken;
    address public wNativeToken;
    address public router;
    address public usdPair;
    address public currentDepositor;

    address[] public stakers;
    mapping(address => uint256) public sTokenAmounts;
    uint256 public totalAmount;

    address[] public newStakers;
    mapping(address => uint256) public newWsTokenAmounts;
    uint256 public newTotalAmount;

    constructor (
        address _token,
        address _sToken,
        address _wsToken,
        address _staking,
        address _stakingHelper
    ) {
        require(ISBabelERC20(_sToken).stakingContract() == _staking);
        require(IWBabelERC20(_wsToken).staking() == _staking);
        require(IStaking(_staking).BABEL() == _token);
        require(IStakingHelper(_staking).staking() == _staking);

        token = _token;
        sToken = _sToken;
        wsToken = _wsToken;
        staking = _staking;
        stakingHelper = _stakingHelper;
    }

    function setUsdPair(address _usdPair) external {
        require(IUniswapV2Pair(_usdPair).token0() == token || IUniswapV2Pair(_usdPair).token1() == token);
        usdPair = _usdPair;
    }

    function setRouter(address _router, NATIVE_TOKEN _nativeToken) external {
        nativeToken = _nativeToken;
        if (_nativeToken == NATIVE_TOKEN.WETH) {
            wNativeToken = IUniswapV2Router(_router).WETH();
        } else if (_nativeToken == NATIVE_TOKEN.WAVAX) {
            wNativeToken = IUniswapV2Router(_router).WAVAX();
        } else {
            revert("unknown wrapped native token");
        }
        router = _router;
    }

    function addDepositor(address depositor, bool isLiquidity) external {
        if (isLiquidity) {
            require(!isLiquidityDepositor[depositor]);
            address lpPair = IBondDepository(depositor).principle();
            address token0 = IUniswapV2Pair(lpPair).token0();
            address token1 = IUniswapV2Pair(lpPair).token1();
            require(token0 == token || token1 == token);

            isLiquidityDepositor[depositor] = true;
            liquidityDepositors.push(depositor);
        } else {
            require(!isReserveDepositor[depositor]);

            isReserveDepositor[depositor] = true;
            reserveDepositors.push(depositor);
        }
    }

    function deposit(uint256 amount) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        uint256 sTokenBalance = IERC20(sToken).balanceOf(address(this));

        // no warmup
        require(IStaking(staking).warmupPeriod() == 0);
        // stake
        IERC20(token).approve(stakingHelper, amount);
        IStakingHelper(stakingHelper).stake(amount, address(this));

        _depositS(msg.sender, IERC20(sToken).balanceOf(address(this)).sub(sTokenBalance));
    }

    function depositS(uint256 amount) external {
        IERC20(sToken).safeTransferFrom(msg.sender, address(this), amount);

        _depositS(msg.sender, amount);
    }

    function _depositS(address recipient, uint256 amount) internal {
        uint256 wsTokenBalance = IERC20(wsToken).balanceOf(address(this));

        IERC20(sToken).approve(address(this), amount);
        IWBabelERC20(wsToken).wrapFromsBABEL(amount);

        uint256 wsTokenDelta = IERC20(wsToken).balanceOf(address(this)).sub(wsTokenBalance);
        newStakers.push(recipient);
        newWsTokenAmounts[recipient] = newWsTokenAmounts[recipient] + wsTokenDelta;
    }

    function depositWS(uint256 amount) external {
        IERC20(wsToken).safeTransferFrom(msg.sender, address(this), amount);

        newStakers.push(msg.sender);
        newWsTokenAmounts[msg.sender] = newWsTokenAmounts[msg.sender] + amount;
    }

    function restake(address _depositor) external {
        bool isLiquidity = isLiquidityDepositor[_depositor];
        if (!isLiquidity) {
            require(isReserveDepositor[_depositor], "invalid depositor");
        }

        uint256 fiveDayRate;

        {
            (uint256 pendingPayout, , ,) = IBondDepository(currentDepositor).bondInfo(address(this));
            require(pendingPayout == 0, "pending bonding payout");

            uint256 bondPrice = IBondDepository(_depositor).bondPriceInUSD();
            uint256 marketPrice = _priceInUSD();
            // 1e4
            uint256 bondDiscount = marketPrice.sub(bondPrice).mul(1e4).div(bondPrice);

            (, , , uint256 stakingReward) = IStaking(staking).epoch();
            uint256 supply = ISBabelERC20(sToken).circulatingSupply();
            // 1e4; fraction with 4 decimals
            fiveDayRate = (stakingReward.mul(1e4).div(supply).add(1e4) ** (3 * 5)).div(1e4 ** (3 * 5 - 1)).sub(1e4);

            // profit must >= 1%
            // dex fee is 0.3%
            // b% + s%/2 - 0.3% >= 1%
            uint256 profitRate = bondDiscount.add(fiveDayRate.div(2)).sub(30);
            require(profitRate >= fiveDayRate + 100, "extra profit < 1%");

        }

        currentDepositor = _depositor;

        uint256 amount = IERC20(sToken).balanceOf(address(this));
        IStaking(staking).unstake(amount, true);

        uint256 payout;
        if (isLiquidity) {
            // (1-k)*x = k*x*(1-0.3%)
            // k = 1000/1997
            uint256 amountIn = amount.mul(1000).div(1997);
            uint256 amountA = amount.sub(amountIn);

            address lpPair = IBondDepository(currentDepositor).principle();
            address token0 = IUniswapV2Pair(lpPair).token0();
            address token1 = IUniswapV2Pair(lpPair).token1();

            address tokenA = token;
            address tokenB;
            if (token0 == tokenA) {
                tokenB = token1;
            } else {
                tokenB = token0;
            }

            address[] memory path = new address[](2);
            path[0] = tokenA;
            path[1] = tokenB;
            IERC20(token).approve(router, amountIn);

            // swap
            uint[] memory amounts;
            if (tokenB == wNativeToken) {
                amounts = _swapExactTokensForNative(amountIn, 0, path, address(this), block.timestamp);
            } else {
                amounts = IUniswapV2Router(router).swapExactTokensForTokens(amountIn, 0, path, address(this), block.timestamp);
            }

            // add liquidity
            uint amountB = amounts[amounts.length - 1];
            IERC20(tokenA).approve(router, amountA);
            uint liquidity;
            if (tokenB == wNativeToken) {
                (,, liquidity) = _addLiquidityNative(tokenA, amountA, amountB, 0, 0, address(this), block.timestamp);
            } else {
                IERC20(tokenB).approve(router, amountB);

                (,, liquidity) = IUniswapV2Router(router).addLiquidity(tokenA, tokenB, amountA, amountB, 0, 0, address(this), block.timestamp);
            }

            // deposit
            IERC20(lpPair).approve(router, liquidity);
            payout = IBondDepository(currentDepositor).deposit(liquidity, IBondDepository(currentDepositor).bondPrice(), address(this));
        } else {
            address reserveToken = IBondDepository(currentDepositor).principle();

            address[] memory path = new address[](2);
            path[0] = token;
            path[1] = reserveToken;
            IERC20(token).approve(router, amount);

            // swap
            uint[] memory amounts;
            if (reserveToken == wNativeToken) {
                amounts = _swapExactTokensForNative(amount, 0, path, address(this), block.timestamp);
            } else {
                amounts = IUniswapV2Router(router).swapExactTokensForTokens(amount, 0, path, address(this), block.timestamp);
            }

            // deposit
            uint amountReserve = amounts[amounts.length - 1];
            IERC20(reserveToken).approve(router, amountReserve);
            payout = IBondDepository(currentDepositor).deposit(amountReserve, IBondDepository(currentDepositor).bondPrice(), address(this));
        }

        uint256 combinationAmount = payout.mul(fiveDayRate.div(2).add(1e4));
        uint256 stakingAmount = amount.mul(fiveDayRate.add(1e4));
        console.log("combination amount: %s, staking amount: %s (all multiplied by 1e4)", combinationAmount, stakingAmount);
        require(combinationAmount >= stakingAmount.add(amount.mul(100 - 10)), "combination of bonding and staking not profitable");
    }

    function redeemAndStake() external {
        uint256 payout = IBondDepository(currentDepositor).redeem(address(this), true);
        uint256 total = IERC20(sToken).balanceOf(address(this));
        console.log("redeem and stake amount: %s, total staked amount: %s", payout, total);
    }

    function _priceInUSD() internal view returns (uint256) {
        address token0 = IUniswapV2Pair(usdPair).token0();
        address token1 = IUniswapV2Pair(usdPair).token1();
        (uint256 reserve0, uint256 reserve1,) = IUniswapV2Pair(usdPair).getReserves();
        if (token0 == token) {
            return reserve1.mul(10 ** IERC20Metadata(token0).decimals()).div(reserve0);
        } else {
            return reserve0.mul(10 ** IERC20Metadata(token1).decimals()).div(reserve1);
        }
    }

    function _swapExactTokensForNative(uint amountIn, uint amountOutMin, address[] memory path, address to, uint deadline)
    internal
    returns (uint[] memory amounts) {
        if (nativeToken == NATIVE_TOKEN.WETH) {
            return IUniswapV2Router(router).swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline);
        } else if (nativeToken == NATIVE_TOKEN.WAVAX) {
            return IUniswapV2Router(router).swapExactTokensForAVAX(amountIn, amountOutMin, path, to, deadline);
        } else {
            revert("unknown wrapped native token");
        }
    }

    function _addLiquidityNative(
        address _token,
        uint amountTokenDesired,
        uint amountNativeDesired,
        uint amountTokenMin,
        uint amountNativeMin,
        address to,
        uint deadline
    ) internal returns (uint amountToken, uint amountETH, uint liquidity) {
        if (nativeToken == NATIVE_TOKEN.WETH) {
            return IUniswapV2Router(router).addLiquidityETH{value : amountNativeDesired}(_token, amountTokenDesired, amountTokenMin, amountNativeMin, to, deadline);
        } else if (nativeToken == NATIVE_TOKEN.WAVAX) {
            return IUniswapV2Router(router).addLiquidityAVAX{value : amountNativeDesired}(_token, amountTokenDesired, amountTokenMin, amountNativeMin, to, deadline);
        } else {
            revert("unknown wrapped native token");
        }
    }
}
