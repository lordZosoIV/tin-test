import { ethers } from "hardhat";
import {Contract, Signer} from "ethers";

let owner: Signer;
let user: Signer;
let tinToken: Contract;
let presale: Contract;
let usdtToken: Contract; // Replace with your USDTToken contract type

async function main() {
    const [account1, account2] = await ethers.getSigners();
    owner = account1;
    user = account2;

    // Deploy the OwnicToken contract
    const TinToken = await ethers.getContractFactory("TinToken");
    tinToken = await TinToken.deploy("Tin Token Test", "TTT", ethers.utils.parseEther("10000000000000000"));

    // Wait for the contract to be mined
    await tinToken.deployed();

    console.log("Token deployed at address ", tinToken.address)

    // Deploy the crowdsale contract
    const Presale = await ethers.getContractFactory("PresaleV2");

    const USDTToken = await ethers.getContractFactory('USDTToken');
    usdtToken = await USDTToken.deploy();
    console.log("mockusdt deployed at address ", usdtToken.address)

    presale = await Presale.deploy(10, tinToken.address, usdtToken.address);
    await presale.deployed();

    console.log("presale deployed at address ", presale.address)

    await tinToken.connect(owner).transfer(presale.address, ethers.utils.parseEther("1000000"));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
