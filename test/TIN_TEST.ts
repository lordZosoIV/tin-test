import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, Signer } from "ethers";

describe("OwnicToken", function () {
    let owner: Signer;
    let user: Signer;
    let tinToken: Contract;
    let presale: Contract;

    beforeEach(async function () {
        // Get the accounts from Hardhat
        const [account1, account2] = await ethers.getSigners();
        owner = account1;
        user = account2;

        // Deploy the OwnicToken contract
        const TinToken = await ethers.getContractFactory("TinToken");
        tinToken = await TinToken.deploy("Tin Token", "Tin", ethers.utils.parseEther("1000"));

        // Wait for the contract to be mined
        await tinToken.deployed();

        // Deploy the crowdsale contract
        const Presale = await ethers.getContractFactory("Presale");
        presale = await Presale.deploy(100,  owner.getAddress(), tinToken.address);
        await presale.deployed();
    });

    it("should have correct name, symbol, and initial supply", async function () {
        // Get the name, symbol, and initial supply of the token
        const name = await tinToken.name();
        const symbol = await tinToken.symbol();
        const initialSupply = await tinToken.totalSupply();

        // Verify the values
        expect(name).to.equal("Tin Token");
        expect(symbol).to.equal("Tin");
        expect(initialSupply).to.equal(ethers.utils.parseEther("1000"));
    });



    it("should allow transferring tokens", async function () {
        // Get the addresses of two accounts
        const [sender, recipient] = await ethers.getSigners();

        // Transfer 100 tokens from sender to recipient
        await tinToken.connect(sender).transfer(await recipient.getAddress(), ethers.utils.parseEther("100"));

        // Get the balances of the sender and recipient
        const senderBalance = await tinToken.balanceOf(await sender.getAddress());
        const recipientBalance = await tinToken.balanceOf(await recipient.getAddress());

        // Verify the balances after the transfer
        expect(senderBalance).to.equal(ethers.utils.parseEther("900"));
        expect(recipientBalance).to.equal(ethers.utils.parseEther("100"));
    });

    it("should allow buying tokens", async function () {
        await tinToken.connect(owner).transfer(presale.address, ethers.utils.parseEther("100"));
        const tokenBalance = await tinToken.balanceOf(presale.address);
        console.log("crowdsale balanace ", tokenBalance.toString());
        await presale.connect(user).buyTokens({ value: 1});
        const tokenBalance2 = await tinToken.balanceOf(presale.address);
        console.log("crowdsale balanace after ", tokenBalance2.toString());
    });

    it("Should not allow non-owner to transfer tokens", async function () {
        await expect(presale.connect(user).transferToWallet()).to.be.revertedWith(
            "Ownable: caller is not the owner"
        );
    });

    it("Should transfer tokens to the owner", async function () {
        const initialOwnerBalance = await tinToken.balanceOf(await owner.getAddress());
        const presaleBalance = await tinToken.balanceOf(presale.address);

        await presale.transferToWallet();

        const finalOwnerBalance = await tinToken.balanceOf(await owner.getAddress());
        const finalPresaleBalance = await tinToken.balanceOf(presale.address);

        // Check the balances after the transfer
        expect(finalOwnerBalance).to.equal(initialOwnerBalance.add(presaleBalance));
        expect(finalPresaleBalance).to.equal(ethers.constants.Zero);
    });


    it("Should transfer all tokens to the owner", async function () {
        // Transfer some tokens to the presale contract
        await tinToken.connect(owner).transfer(presale.address, ethers.utils.parseEther("500"));

        // Get the balances before the transfer
        const initialOwnerBalance = await tinToken.balanceOf(await owner.getAddress());
        const presaleBalance = await tinToken.balanceOf(presale.address);

        // Transfer all tokens to the owner
        await presale.connect(owner).transferAllTokensToOwner();

        // Get the balances after the transfer
        const finalOwnerBalance = await tinToken.balanceOf(await owner.getAddress());
        const finalPresaleBalance = await tinToken.balanceOf(presale.address);

        // Check the balances after the transfer
        expect(finalOwnerBalance).to.equal(initialOwnerBalance.add(presaleBalance));
        expect(finalPresaleBalance).to.equal(ethers.constants.Zero);
    });

});
