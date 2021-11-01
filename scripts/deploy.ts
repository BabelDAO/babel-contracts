// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

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
  BabelNstLpBondDepository
} from "../typechain-types";

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

  const epochLengthInBlocks = 28800;
  const firstEpochBlock = 50;
  const firstEpochNumber = 0;
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  const mimBondBCV = "369";
  const bondVestingLength = "432000"; // 5 days
  const minBondPrice = "50000";
  const maxBondPayout = "50";
  const bondFee = "10000";
  const maxBondDebt = "1000000000000000";
  const initialBondDebt = "0";

  const initialRewardRate = "3000";

  const initialIndex = '7675210820';

  const largeApproval = '100000000000000000000000000000000';

  const signers = await ethers.getSigners();
  const deployer = signers[0];
  const dao = signers[1];

  const MimERC20 = await ethers.getContractFactory("MimERC20");
  const mimERC20 = await MimERC20.deploy() as MimERC20;
  await mimERC20.deployed();
  console.log(`Deployed MimERC20 to: ${mimERC20.address}, name: ${await mimERC20.name()}, symbol: ${await mimERC20.symbol()}, decimals: ${await mimERC20.decimals()}`);
  await mimERC20.mint(deployer.address, "10000000000000000000000000");

  const BabelERC20 = await ethers.getContractFactory("BabelERC20");
  const babelERC20 = await BabelERC20.deploy() as BabelERC20;
  await babelERC20.deployed();
  console.log(`Deployed BabelERC20 to: ${babelERC20.address}, name: ${await babelERC20.name()}, symbol: ${await babelERC20.symbol()}, decimals: ${await babelERC20.decimals()}`);
  await babelERC20.setVault(deployer.address); // TODO

  const SBabelERC20 = await ethers.getContractFactory("sBabelERC20");
  const sBabelERC20 = await SBabelERC20.deploy() as SBabelERC20;
  await sBabelERC20.deployed();
  console.log(`Deployed sBabelERC20 to: ${sBabelERC20.address}, name: ${await sBabelERC20.name()}, symbol: ${await sBabelERC20.symbol()}, decimals: ${await sBabelERC20.decimals()}`);

  const BabelTreasury = await ethers.getContractFactory("BabelTreasury");
  const babelTreasury = await BabelTreasury.deploy(babelERC20.address, 0) as BabelTreasury;
  await babelTreasury.deployed();
  console.log(`Deployed BabelTreasury to: ${babelTreasury.address}`);

  const BabelBondingCalculator = await ethers.getContractFactory("BabelBondingCalculator");
  const babelBondingCalculator = await BabelBondingCalculator.deploy(babelERC20.address) as BabelBondingCalculator;
  await babelBondingCalculator.deployed();
  console.log(`Deployed BabelBondingCalculator to: ${babelBondingCalculator.address}`);

  const BabelDistributor = await ethers.getContractFactory("BabelDistributor");
  const babelDistributor = await BabelDistributor.deploy(babelTreasury.address, babelERC20.address, epochLengthInBlocks, firstEpochBlock) as BabelDistributor;
  await babelDistributor.deployed();
  console.log(`Deployed BabelDistributor to: ${babelDistributor.address}`);

  const BabelStaking = await ethers.getContractFactory("BabelStaking");
  const babelStaking = await BabelStaking.deploy(babelERC20.address, sBabelERC20.address, epochLengthInBlocks, firstEpochNumber, firstEpochBlock) as BabelStaking;
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

  const BabelBondDepository = await ethers.getContractFactory("BabelBondDepository");
  const mimBondDepository = await BabelBondDepository.deploy(babelERC20.address, mimERC20.address, babelTreasury.address, dao.address, zeroAddress) as BabelBondDepository;
  await mimBondDepository.deployed();
  console.log(`Deployed MIM BabelBondDepository to: ${mimBondDepository.address}`);

  await babelTreasury.queue("2", mimERC20.address);
  await babelTreasury.toggle("2", mimERC20.address, zeroAddress);
  await babelTreasury.queue("0", mimBondDepository.address);
  await babelTreasury.toggle("0", mimBondDepository.address, zeroAddress);

  await mimBondDepository.initializeBondTerms(mimBondBCV, bondVestingLength, minBondPrice, maxBondPayout, bondFee, maxBondDebt, initialBondDebt);

  await mimBondDepository.setStaking(babelStakingHelper.address, true);

  await sBabelERC20.initialize(babelStaking.address);
  await sBabelERC20.setIndex(initialIndex);

  await babelStaking.setContract("0", babelDistributor.address);
  await babelStaking.setContract("1", babelStakingWarmup.address);

  await babelERC20.setVault(babelTreasury.address);

  await babelDistributor.addRecipient(babelStaking.address, initialRewardRate);

  await babelTreasury.queue("8", babelDistributor.address);
  await babelTreasury.toggle("8", babelDistributor.address, zeroAddress);

  await babelTreasury.queue("0", deployer.address);
  await babelTreasury.toggle("0", deployer.address, zeroAddress);

  await babelTreasury.queue("4", deployer.address);
  await babelTreasury.toggle("4", deployer.address, zeroAddress);

  await mimERC20.approve(babelTreasury.address, largeApproval);

  await mimERC20.approve(mimBondDepository.address, largeApproval);

  await babelERC20.approve(babelStaking.address, largeApproval);
  await babelERC20.approve(babelStakingHelper.address, largeApproval);

  const WBabelERC20 = await ethers.getContractFactory("WBabelERC20");
  const wBabelERC20 = await WBabelERC20.deploy(babelStaking.address, babelERC20.address, sBabelERC20.address) as WBabelERC20;
  await wBabelERC20.deployed();
  console.log(`Deployed WBabelERC20 to: ${wBabelERC20.address}, name: ${await wBabelERC20.name()}, symbol: ${await wBabelERC20.symbol()}, decimals: ${await wBabelERC20.decimals()}`);

  await babelTreasury.deposit('9000000000000000000000000', mimERC20.address, '8400000000000000');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
