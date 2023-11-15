import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";

let owner: Signer;
let user: Signer;
let tinToken: Contract; // Replace with your TinToken contract type
let presale: Contract;
let usdtToken: Contract; // Replace with your USDTToken contract type

// Replace these with the addresses of your existing contracts
const tinTokenAddress = "0xb66eb8c6B02af03C9aDE6cceB4e83c567E458632";
const usdtTokenAddress = "0xD3A77EB6A892d96BC8213D0e81f42022D60FD974";
const presaleAddress = "0x0C8a684ba58852Da84b8aC6a31F7D40f672c5b60"
async function main() {
    const [account1, account2] = await ethers.getSigners();
    owner = account1;
    user = account2;

    // // Get the existing TinToken contract
    const TinToken = await ethers.getContractFactory("TinToken");
    tinToken = await TinToken.attach(tinTokenAddress);
    //
    // console.log("Using existing TinToken at address ", tinToken.address);
    //
    // // Deploy the crowdsale contract
    const Presale = await ethers.getContractFactory("PresaleV2");
    //
    // // Get the existing USDTToken contract
    // const USDTToken = await ethers.getContractFactory('USDTToken');
    // usdtToken = await USDTToken.attach(usdtTokenAddress);
    //
    // console.log("Using existing USDTToken at address ", usdtToken.address);

    presale = await Presale.attach(presaleAddress);
    // await presale.deployed();
    await tinToken.connect(owner).transfer(presale.address, ethers.utils.parseEther("1000000"));

    console.log("presale deployed at address ", presale.address);

    // You may not need to transfer tokens if they are already in the presale contract.

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
