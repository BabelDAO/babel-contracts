// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import bn from "bignumber.js";
import * as fs from "fs";

import type {
  BabelERC20,
  SBabelERC20,
  WBabelERC20,
  MimERC20,
  BabelTreasury,
  BabelBondingCalculator,
  BabelStaking,
  BabelDistributor,
  BabelStakingHelper,
  BabelStakingWarmup,
  BabelRedeemHelper,
  BabelBondDepository,
  BabelNstBondDepository,
  BabelNstLpBondDepository,
  BabelIDO,
  UniswapV2Factory,
  UniswapV2Pair
} from "../typechain-types";

function sqrt(value: BigNumber): BigNumber {
  return BigNumber.from(new bn(value.toString()).sqrt().toFixed().split(".")[0]);
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  let mimAddress = "";
  for (const arg of process.argv) {
  }

  const epochLengthInSeconds = 28800; // 8h
  const firstEpochTimestamp = Math.floor(Date.now() / 1000) + 5; // seconds since unix epoch
  const firstEpochNumber = 1;
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  const bondVestingLength = "432000"; // 5 days
  const maxBondPayout = "20";
  const bondFee = "10000"; // fee rate to DAO

  const initialRewardRate = "5000"; // if 80% staking, rebase rate will be 0.625%, APY 91823%

  const initialIndex = "1000000000";

  const largeApproval = "100000000000000000000000000000000";

  const signers = await ethers.getSigners();
  const deployer = signers[0];
  const dao = signers[1] || deployer;
  const user = signers[2] || deployer;

  /******************************** 0. Deploy MIM token contract ********************************/
  const MimERC20 = await ethers.getContractFactory("MimERC20");
  const mimERC20 = await MimERC20.deploy() as MimERC20;
  await mimERC20.deployed();
  console.log(`Deployed MimERC20 to: ${mimERC20.address}, name: ${await mimERC20.name()}, symbol: ${await mimERC20.symbol()}, decimals: ${await mimERC20.decimals()}`);
  const mimDecimals = await mimERC20.decimals();
  // Mint 10000000 MIM.
  await mimERC20.mint(deployer.address, "10000000000000000000000000");

  /******************************** 1. Deploy BABEL and sBABEL token contracts ********************************/
  const BabelERC20 = await ethers.getContractFactory("BabelERC20");
  const babelERC20 = await BabelERC20.deploy() as BabelERC20;
  await babelERC20.deployed();
  console.log(`Deployed BabelERC20 to: ${babelERC20.address}, name: ${await babelERC20.name()}, symbol: ${await babelERC20.symbol()}, decimals: ${await babelERC20.decimals()}`);
  const babelDecimals = await babelERC20.decimals();

  const SBabelERC20 = await ethers.getContractFactory("sBabelERC20");
  const sBabelERC20 = await SBabelERC20.deploy() as SBabelERC20;
  await sBabelERC20.deployed();
  console.log(`Deployed sBabelERC20 to: ${sBabelERC20.address}, name: ${await sBabelERC20.name()}, symbol: ${await sBabelERC20.symbol()}, decimals: ${await sBabelERC20.decimals()}`);

  /******************************** 2. Deploy treasury contract ********************************/
  const BabelTreasury = await ethers.getContractFactory("BabelTreasury");
  const babelTreasury = await BabelTreasury.deploy(babelERC20.address, 0) as BabelTreasury;
  await babelTreasury.deployed();
  console.log(`Deployed BabelTreasury to: ${babelTreasury.address}`);

  const BabelBondingCalculator = await ethers.getContractFactory("BabelBondingCalculator");
  const babelBondingCalculator = await BabelBondingCalculator.deploy(babelERC20.address) as BabelBondingCalculator;
  await babelBondingCalculator.deployed();
  console.log(`Deployed BabelBondingCalculator to: ${babelBondingCalculator.address}`);

  const BabelDistributor = await ethers.getContractFactory("BabelDistributor");
  const babelDistributor = await BabelDistributor.deploy(babelTreasury.address, babelERC20.address, epochLengthInSeconds, firstEpochTimestamp) as BabelDistributor;
  await babelDistributor.deployed();
  console.log(`Deployed BabelDistributor to: ${babelDistributor.address}`);

  /******************************** 3. Deploy staking contract ********************************/
  const BabelStaking = await ethers.getContractFactory("BabelStaking");
  const babelStaking = await BabelStaking.deploy(babelERC20.address, sBabelERC20.address, epochLengthInSeconds, firstEpochNumber, firstEpochTimestamp) as BabelStaking;
  await babelStaking.deployed();
  console.log(`Deployed BabelStaking to: ${babelStaking.address}`);

  const BabelStakingWarmup = await ethers.getContractFactory("BabelStakingWarmup");
  const babelStakingWarmup = await BabelStakingWarmup.deploy(babelStaking.address, sBabelERC20.address) as BabelStakingWarmup;
  await babelStakingWarmup.deployed();
  console.log(`Deployed BabelStakingWarmup to: ${babelStakingWarmup.address}`);

  const BabelStakingHelper = await ethers.getContractFactory("BabelStakingHelper");
  const babelStakingHelper = await BabelStakingHelper.deploy(babelStaking.address, babelERC20.address) as BabelStakingHelper;
  await babelStakingHelper.deployed();
  console.log(`Deployed BabelStakingHelper to: ${babelStakingHelper.address}`);

  const WBabelERC20 = await ethers.getContractFactory("WBabelERC20");
  const wBabelERC20 = await WBabelERC20.deploy(babelStaking.address, babelERC20.address, sBabelERC20.address) as WBabelERC20;
  await wBabelERC20.deployed();
  console.log(`Deployed WBabelERC20 to: ${wBabelERC20.address}, name: ${await wBabelERC20.name()}, symbol: ${await wBabelERC20.symbol()}, decimals: ${await wBabelERC20.decimals()}`);

  /******************************** 4. Deploy MIM reserve bonding contract ********************************/
  const BabelBondDepository = await ethers.getContractFactory("BabelBondDepository");
  const mimBondDepository = await BabelBondDepository.deploy(babelERC20.address, mimERC20.address, babelTreasury.address, dao.address, zeroAddress) as BabelBondDepository;
  await mimBondDepository.deployed();
  console.log(`Deployed MIM BabelBondDepository to: ${mimBondDepository.address}`);

  /******************************** 5. Deploy BABEL-MIM LP bonding contract ********************************/
  const UniswapV2Factory = await ethers.getContractFactory(
    "UniswapV2Factory"
  );
  const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");

  const uniFactory = await UniswapV2Factory.deploy(deployer.address) as UniswapV2Factory;
  await uniFactory.deployed();
  console.log(`Deployed UniswapV2Factory to: ${uniFactory.address}`);

  await (await uniFactory.createPair(babelERC20.address, mimERC20.address)).wait();
  const babelMimPairAddress = await uniFactory.getPair(babelERC20.address, mimERC20.address);
  const babelMimLP = UniswapV2Pair.attach(babelMimPairAddress) as UniswapV2Pair;
  console.log(`Created BABEL-MIM LP pair to: ${babelMimLP.address}, name: ${await babelMimLP.name()}, symbol: ${await babelMimLP.symbol()}, decimals: ${await babelMimLP.decimals()}`);

  const babelMimLpBondDepository = await BabelBondDepository.deploy(babelERC20.address, babelMimLP.address, babelTreasury.address, dao.address, babelBondingCalculator.address) as BabelBondDepository;
  await babelMimLpBondDepository.deployed();
  console.log(`Deployed BABEL-MIM BabelBondDepository to: ${babelMimLpBondDepository.address}`);

  /******************************** 6. Set relationship between contracts ********************************/
  // Set MIM as reserve token.
  await (await babelTreasury.queue("2", mimERC20.address)).wait();
  await babelTreasury.toggle("2", mimERC20.address, zeroAddress);
  // Set MIM reserve bond depository as reserve depositor.
  await (await babelTreasury.queue("0", mimBondDepository.address)).wait();
  await babelTreasury.toggle("0", mimBondDepository.address, zeroAddress);

  // Set BABEL-MIM as lp token.
  await (await babelTreasury.queue("5", babelMimLP.address)).wait();
  await babelTreasury.toggle("5", babelMimLP.address, babelBondingCalculator.address);
  // Set BABEL-MIM lp bond depository as lp depositor.
  await (await babelTreasury.queue("4", babelMimLpBondDepository.address)).wait();
  await babelTreasury.toggle("4", babelMimLpBondDepository.address, zeroAddress);

  const babelDecimalsMultiplier = BigNumber.from(10).pow(babelDecimals);
  const mimDecimalsMultiplier = BigNumber.from(10).pow(mimDecimals);
  const babelAmountInitialTotal = ethers.utils.parseUnits("250000", babelDecimals);
  const babelAmountIDO = ethers.utils.parseUnits("200000", babelDecimals);
  const babelAmountInitialInLp = babelAmountInitialTotal.sub(babelAmountIDO);
  const babelPriceIDO = ethers.utils.parseUnits("5", mimDecimals);
  const babelPriceInitialDex = ethers.utils.parseUnits("15", mimDecimals);
  const minBondPrice = "1500"; // minimum bond price $15
  const mimBondInitialBondDebt = babelAmountIDO;
  const babelMimBondInitialBondDebt = sqrt((babelAmountInitialInLp.div(babelDecimalsMultiplier)).mul(babelPriceInitialDex.div(mimDecimalsMultiplier)).mul(babelAmountInitialInLp.div(babelDecimalsMultiplier))).mul(2).mul(babelDecimalsMultiplier);
  console.log(`mimBond BondDebt: ${mimBondInitialBondDebt.div(babelDecimalsMultiplier)} USD, babelMimBond BondDebt: ${babelMimBondInitialBondDebt.div(babelDecimalsMultiplier)} USD`);
  const mimBondInitialDebtRatio = mimBondInitialBondDebt.mul(1e9).div(babelAmountInitialTotal); // * 1e9
  const babelMimBondInitialDebtRatio = babelMimBondInitialBondDebt.mul(1e9).div(babelAmountInitialTotal); // * 1e9
  console.log(`mimBond DebtRatio: ${mimBondInitialDebtRatio.toNumber() / 1e9}, babelMimBond DebtRatio: ${babelMimBondInitialDebtRatio.toNumber() / 1e9}`);
  const mimBondBCV = Math.floor(babelPriceInitialDex.div(mimDecimalsMultiplier).mul(1e9).sub(1e9).toNumber() / mimBondInitialDebtRatio.toNumber());
  const babelPriceInitialDexMarkdown = babelMimBondInitialBondDebt.mul(mimDecimalsMultiplier).div(2).div(babelAmountInitialInLp);
  const babelMimBondBCV = Math.floor(babelPriceInitialDex.mul(1e9).div(babelPriceInitialDexMarkdown).sub(1e9).toNumber() / babelMimBondInitialDebtRatio.toNumber());
  const minBondPriceForLp = babelPriceInitialDex.mul(1e2).div(babelPriceInitialDexMarkdown);
  console.log(`babelPriceInitialDex markdown: ${babelPriceInitialDexMarkdown.mul(100).div(mimDecimalsMultiplier).toNumber() / 100} USD`);
  console.log(`mimBondBCV: ${mimBondBCV}, babelMimBondBCV: ${babelMimBondBCV}`);

  const mimBondMaxDebt = ethers.utils.parseUnits("1000000000000000", babelDecimals);
  const babelMimLpBondMaxDebt = ethers.utils.parseUnits("50000000000000", babelDecimals);

  await mimBondDepository.initializeBondTerms(mimBondBCV, bondVestingLength, minBondPrice, maxBondPayout, bondFee, mimBondMaxDebt, mimBondInitialBondDebt);
  await babelMimLpBondDepository.initializeBondTerms(babelMimBondBCV, bondVestingLength, minBondPriceForLp, maxBondPayout, bondFee, babelMimLpBondMaxDebt, babelMimBondInitialBondDebt);

  // Set staking contract for MIM bond and BABEL-MIM bond.
  await mimBondDepository.setStaking(babelStakingHelper.address, true);
  await babelMimLpBondDepository.setStaking(babelStakingHelper.address, true);

  // Initialize sBABEL and set the index.
  await sBabelERC20.initialize(babelStaking.address);
  await sBabelERC20.setIndex(initialIndex);
  console.log(`Initial index: ${ethers.utils.formatUnits(await sBabelERC20.index(), babelDecimals)}`);

  // Set distributor and warmup for staking contract.
  await babelStaking.setContract("0", babelDistributor.address);
  await babelStaking.setContract("1", babelStakingWarmup.address);

  // Set treasury for BABEL.
  await babelERC20.setVault(babelTreasury.address);

  // Add staking contract as distributor recipient.
  await babelDistributor.addRecipient(babelStaking.address, initialRewardRate);

  // Set distributor as reward manager.
  await (await babelTreasury.queue("8", babelDistributor.address)).wait();
  await babelTreasury.toggle("8", babelDistributor.address, zeroAddress);
  // Set deployer as reserve depositor.
  await (await babelTreasury.queue("0", deployer.address)).wait();
  await babelTreasury.toggle("0", deployer.address, zeroAddress);
  // Set deployer as lp depositor.
  await (await babelTreasury.queue("4", deployer.address)).wait();
  await babelTreasury.toggle("4", deployer.address, zeroAddress);

  /******************************** 7. Deploy IDO contract ********************************/
  const BabelIDO = await ethers.getContractFactory("BabelIDO");
  const babelIDO = await BabelIDO.deploy(babelERC20.address, mimERC20.address, babelTreasury.address, babelStaking.address, babelMimLP.address) as BabelIDO;
  await babelIDO.deployed();
  console.log(`Deployed BabelIDO to: ${babelIDO.address}`);

  // Set ido as reserve depositor.
  await (await babelTreasury.queue("0", babelIDO.address)).wait();
  await babelTreasury.toggle("0", babelIDO.address, zeroAddress);
  // Set ido as lp depositor.
  await (await babelTreasury.queue("4", babelIDO.address)).wait();
  await babelTreasury.toggle("4", babelIDO.address, zeroAddress);

  /******************************** 8. IDO launch ********************************/
  await (await babelIDO.whiteListBuyers([user.address])).wait();

  // 200000 BABEL, at price $5.
  const saleLength = 172800; // 2 days
  const startOfSale = firstEpochTimestamp;
  await (await babelIDO.initialize(babelAmountIDO, babelPriceIDO, saleLength, startOfSale)).wait();

  await (await mimERC20.transfer(user.address, "1000000000000000000000000")).wait();
  await (await mimERC20.connect(user).approve(babelIDO.address, largeApproval)).wait();
  await sleep(Date.now() + 100 - startOfSale * 1000);
  await (await babelIDO.connect(user).purchaseBABEL("1000000000000000000000000")).wait();

  await (await babelIDO.finalize()).wait();

  // Claim from ido contract, and stake into staking contract.
  await (await babelIDO.claim(user.address)).wait();
  await babelStaking.claim(user.address);

  await babelStaking.rebase();

  await (await mimERC20.transfer(user.address, "5000000000000000000000000")).wait();

  const frontendConfig = {
    chainId: (await ethers.provider.getNetwork()).chainId,
    rpcUrl: ethers.provider.connection.url,
    explorerUrl: "",
    babelAddress: babelERC20.address,
    sBabelAddress: sBabelERC20.address,
    stakingAddress: babelStaking.address,
    stakingHelperAddress: babelStakingHelper.address,
    bondingCalcAddress: babelBondingCalculator.address,
    treasuryAddress: babelTreasury.address,
    bonding: {
      mim: {
        tokenAddress: mimERC20.address,
        bondAddress: mimBondDepository.address
      },
      babelMim: {
        tokenAddress: babelMimLP.address,
        bondAddress: babelMimLpBondDepository.address
      }
    }
  };
  fs.writeFileSync("frontend-config.json", JSON.stringify(frontendConfig, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
