// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";

interface ITreasury {
    function deposit(
        uint256 _amount,
        address _token,
        uint256 _profit
    ) external returns (uint256 send_);

    function valueOf(address _token, uint256 _amount)
    external
    view
    returns (uint256 value_);
}

interface IStaking {
    function stake(uint256 _amount, address _recipient) external returns (bool);
}

contract BabelIDO is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address public BABEL;
    address public MIM;
    address public addressToSendMIM;
    address public mimBabelLP;
    address public staking;

    uint256 public totalAmount;
    uint256 public salePrice;
    uint256 public openPrice;
    uint256 public totalWhiteListed;
    uint256 public startOfSale;
    uint256 public endOfSale;

    bool public initialized;
    bool public whiteListEnabled;
    bool public cancelled;
    bool public finalized;

    mapping(address => bool) public boughtBABEL;
    mapping(address => bool) public whiteListed;

    address[] buyers;
    mapping(address => uint256) public purchasedAmounts;

    address treasury;

    constructor(
        address _BABEL,
        address _MIM,
        address _treasury,
        address _staking,
        address _mimBabelLP
    ) {
        require(_BABEL != address(0));
        require(_MIM != address(0));
        require(_treasury != address(0));
        require(_staking != address(0));
        require(_mimBabelLP != address(0));

        BABEL = _BABEL;
        MIM = _MIM;
        treasury = _treasury;
        mimBabelLP = _mimBabelLP;
        staking = _staking;
        cancelled = false;
        finalized = false;
    }

    function saleStarted() public view returns (bool) {
        return initialized && startOfSale <= block.timestamp;
    }

    function whiteListBuyers(address[] memory _buyers)
    external
    onlyOwner
    returns (bool)
    {
        require(saleStarted() == false, 'Already started');

        totalWhiteListed = totalWhiteListed.add(_buyers.length);

        for (uint256 i; i < _buyers.length; i++) {
            whiteListed[_buyers[i]] = true;
        }

        return true;
    }

    function initialize(
        uint256 _totalAmount,
        uint256 _salePrice,
        uint256 _saleLength,
        uint256 _startOfSale
    ) external onlyOwner returns (bool) {
        require(initialized == false, 'Already initialized');
        initialized = true;
        whiteListEnabled = true;
        totalAmount = _totalAmount;
        salePrice = _salePrice;
        startOfSale = _startOfSale;
        endOfSale = _startOfSale.add(_saleLength);
        return true;
    }

    function getAllotmentPerBuyer() public view returns (uint256) {
        if (whiteListEnabled) {
            return totalAmount.div(totalWhiteListed);
        } else {
            return Math.min(200 * 1e9, totalAmount);
        }
    }

    function purchaseBABEL(uint256 _amountMIM) external returns (bool) {
        require(saleStarted() == true, 'Not started');
        require(
            !whiteListEnabled || whiteListed[msg.sender] == true,
            'Not whitelisted'
        );
        require(boughtBABEL[msg.sender] == false, 'Already participated');

        boughtBABEL[msg.sender] = true;

        uint256 _purchaseAmount = _calculateSaleQuote(_amountMIM);

        require(_purchaseAmount <= getAllotmentPerBuyer(), 'More than alloted');
        if (whiteListEnabled) {
            totalWhiteListed = totalWhiteListed.sub(1);
        }

        totalAmount = totalAmount.sub(_purchaseAmount);

        purchasedAmounts[msg.sender] = _purchaseAmount;
        buyers.push(msg.sender);

        IERC20(MIM).safeTransferFrom(msg.sender, address(this), _amountMIM);

        return true;
    }

    function disableWhiteList() external onlyOwner {
        whiteListEnabled = false;
    }

    function _calculateSaleQuote(uint256 paymentAmount_)
    internal
    view
    returns (uint256)
    {
        return uint256(1e9).mul(paymentAmount_).div(salePrice);
    }

    function calculateSaleQuote(uint256 paymentAmount_)
    external
    view
    returns (uint256)
    {
        return _calculateSaleQuote(paymentAmount_);
    }

    /// @dev Only Emergency Use
    /// cancel the IDO and return the funds to all buyer
    function cancel() external onlyOwner {
        cancelled = true;
        startOfSale = 99999999999;
    }

    function withdraw() external {
        require(cancelled, 'ido is not cancelled');
        uint256 amount = purchasedAmounts[msg.sender];
        IERC20(MIM).transfer(msg.sender, (amount / 1e9) * salePrice);
    }

    function claim(address _recipient) external {
        require(finalized, 'only can claim after finalized');
        require(purchasedAmounts[_recipient] > 0, 'not purchased');
        IStaking(staking).stake(purchasedAmounts[_recipient], _recipient);
        purchasedAmounts[_recipient] = 0;
    }

    function finalize() external onlyOwner {
        require(totalAmount == 0, 'need all babels to be sold');

        uint256 mimInTreasure = 250000 * 1e18;

        IERC20(MIM).approve(treasury, mimInTreasure);
        uint256 babelMinted = ITreasury(treasury).deposit(mimInTreasure, MIM, 0);

        require(babelMinted == 250000 * 1e9);

        // dev: create lp with 15 MIM per BABEL
        IERC20(MIM).transfer(mimBabelLP, 750000 * 1e18);
        IERC20(BABEL).transfer(mimBabelLP, 50000 * 1e9);
        uint256 lpBalance = IUniswapV2Pair(mimBabelLP).mint(address(this));
        uint256 valueOfToken = ITreasury(treasury).valueOf(
            mimBabelLP,
            lpBalance
        );

        IUniswapV2Pair(mimBabelLP).approve(treasury, lpBalance);
        uint256 zeroMinted = ITreasury(treasury).deposit(
            lpBalance,
            mimBabelLP,
            valueOfToken
        );
        require(zeroMinted == 0, 'should not mint any BABEL');
        IERC20(BABEL).approve(staking, babelMinted);

        finalized = true;
    }
}
