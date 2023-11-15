import { ethers } from 'hardhat';
import {Contract, Signer} from 'ethers';
import { expect } from 'chai';
import MerkleTree from 'merkletreejs';
import keccak256 from 'keccak256';

describe('MerkleTest', function () {
    let merkleTest: Contract;
    let owner: Signer;
    let addr1: Signer;
    let addr2: Signer;
    let addrs: Signer[];

    before(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        // Deploy the MerkleTest contract
        const MerkleTestFactory = await ethers.getContractFactory('MerkleTest');
        merkleTest = await MerkleTestFactory.deploy();
        await merkleTest.deployed();

        // Set the Merkle root hash (your actual root hash)
        const newRoot = ethers.utils.formatBytes32String('YourMerkleRootHashHere');
        await merkleTest.setRoot(newRoot);
    });

    it('Should set the root correctly', async function () {
        expect(await merkleTest.root()).to.equal(ethers.utils.formatBytes32String('YourMerkleRootHashHere'));
    });

    it('Should check the validity of a Merkle proof using merkletreejs', async function () {
        // Generate the leaves from data that matches your contract's expectations
        const leaves = [
           '5',
            '2'// Add more hashed data as needed
        ];

        // Create a Merkle tree
        const merkleTree = new MerkleTree(leaves, ethers.utils.keccak256, {hashLeaves:true, sortPairs: true });

        console.log(merkleTree.toString())

        const root = merkleTree.getHexRoot();
        await merkleTest.setRoot(root);


        // Hash the value you want to check
        const stringToCheck = ethers.utils.keccak256('5');

        const proof = merkleTree.getHexProof(stringToCheck);
        console.log("proof: ", proof);

        // Verify the Merkle proof using the MerkleTest contract
        const result = await merkleTest.connect(addr1).checkValidity(proof, 5);
        expect(result).to.equal(true);
    });

});
