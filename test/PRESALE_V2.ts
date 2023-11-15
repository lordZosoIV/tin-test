import { ethers } from 'hardhat';
import {Contract, Signer} from 'ethers';
import { expect } from 'chai';

describe('PresaleV2 Contract', function () {
    let owner: Signer;
    let user1: Signer;
    let tinToken: Contract; // Replace with your TinToken contract type
    let usdtToken: Contract; // Replace with your USDTToken contract type
    let presale: Contract; // Replace with your Presale contract type

    const rate = 10; // Example rate: 1 USDT = 10 Tin Tokens
    let walletAddress : String;

    beforeEach(async () => {
        [owner, user1] = await ethers.getSigners();

        // Deploy TinToken
        const TinToken = await ethers.getContractFactory('TinToken');
        tinToken = await TinToken.deploy("Tin Token", "Tin", ethers.utils.parseEther("10000000"));

        // Deploy USDT token (or use an existing one)
        // Replace with the actual USDT token address if using a real USDT contract
        const USDTToken = await ethers.getContractFactory('USDTToken');
        usdtToken = await USDTToken.deploy();

        // Deploy Presale contract
        const Presale = await ethers.getContractFactory('PresaleV2');

        presale = await Presale.deploy(rate, tinToken.address, usdtToken.address);

        await tinToken.connect(owner).transfer(presale.address, ethers.utils.parseEther("10000"));

    });

    it('should allow users to buy Tin tokens with USDT', async () => {
        const usdtAmount = 1000; // Example: 1000 USDT
        const expectedTokens = usdtAmount * rate;

        await usdtToken.connect(user1).mint(user1.getAddress(), usdtAmount);

        // User1 approves the Presale contract to spend their USDT
        await usdtToken.connect(user1).approve(presale.address, usdtAmount);

        // User1 buys Tin tokens with USDT
        await presale.connect(user1).buyTokensWithUSDT(usdtAmount);

        // Check Tin token balance of user1
        const user1TinBalance = await tinToken.balanceOf(user1.getAddress());
        expect(user1TinBalance).to.equal(expectedTokens);

        // Check weiRaised in the Presale contract
        const weiRaised = await presale.weiRaised();
        expect(weiRaised).to.equal(expectedTokens);

        // Check USDT balance of the contract (should be 1000 USDT)
        const usdtBalance = await usdtToken.balanceOf(presale.address);
        expect(usdtBalance).to.equal(usdtAmount);

    });

    it('should allow the owner to withdraw USDT', async () => {
        const usdtAmount = 1000; // Example: 1000 USDT
        await usdtToken.connect(user1).mint(user1.getAddress(), usdtAmount);


        // User1 approves the Presale contract to spend their USDT
        await usdtToken.connect(user1).approve(presale.address, usdtAmount);

        // User1 buys Tin tokens with USDT
        await presale.connect(user1).buyTokensWithUSDT(usdtAmount);

        // Owner withdraws USDT
        await presale.connect(owner).withdrawUSDT();

        // Check USDT balance of the contract (should be 0)
        const usdtBalance = await usdtToken.balanceOf(presale.address);
        expect(usdtBalance).to.equal(0);

    });
});
