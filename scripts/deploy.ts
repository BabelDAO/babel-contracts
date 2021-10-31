// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

import type { BabelERC20 } from "../typechain-types";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const BabelERC20 = await ethers.getContractFactory("BabelERC20");
  const babelERC20 = await BabelERC20.deploy() as BabelERC20;
  await babelERC20.deployed();
  console.log(`Deployed BabelERC20 to: ${babelERC20.address}, name: ${await babelERC20.name()}, symbol: ${await babelERC20.symbol()}, decimals: ${await babelERC20.decimals()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
