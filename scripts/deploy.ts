import { ethers } from "hardhat";
import {Contract, Signer} from "ethers";

let owner: Signer;
let user: Signer;
let tinToken: Contract;
let presale: Contract;

async function main() {
  const [account1, account2] = await ethers.getSigners();
  owner = account1;
  user = account2;

  // Deploy the OwnicToken contract
  const TinToken = await ethers.getContractFactory("TinToken");
  tinToken = await TinToken.deploy("Tin Token Test", "TTT", ethers.utils.parseEther("1000000000"));

  // Wait for the contract to be mined
  await tinToken.deployed();

  console.log("Token deployed at address ", tinToken.address)

  // Deploy the crowdsale contract
  const Presale = await ethers.getContractFactory("Presale");
  presale = await Presale.deploy(12500,  '0x820e79F77bf90e9E0f4e3818aD816783f0442EF8', tinToken.address);
  await presale.deployed();

  console.log("presale deployed at address ", presale.address)

  await tinToken.connect(owner).transfer(presale.address, ethers.utils.parseEther("500000000"));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
