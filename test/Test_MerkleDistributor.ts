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
        const MerkleTestFactory = await ethers.getContractFactory('MerkleDistributorTest');
        merkleTest = await MerkleTestFactory.deploy();
        await merkleTest.deployed();

        // Set the Merkle root hash (your actual root hash)
    });


    it('Should check the validity of a Merkle proof using merkletreejs', async function () {
        const { ethers } = require('ethers');

        const balances = [
            {
                addr: await addr1.getAddress(),
                amount: ethers.utils.defaultAbiCoder.encode(['uint256'], ['10']),
            },
            {
                addr: await addr2.getAddress(),
                amount: ethers.utils.defaultAbiCoder.encode(['uint256'], ['20000000000000000000000000']),
            },
        ];

        console.log(balances);


        const leafNodes = balances.map((balance) =>
            keccak256(
                Buffer.concat([
                    Buffer.from(balance.addr.replace("0x", ""), "hex"),
                    Buffer.from(balance.amount.replace("0x", ""), "hex"),
                ])
            )
        );


        const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
        console.log("---------");
        console.log("Merke Tree");
        console.log("---------");
        console.log(merkleTree.toString());
        console.log("---------");
        await merkleTest.setRoot(merkleTree.getHexRoot());

        console.log("Merkle Root: " + merkleTree.getHexRoot());

        console.log("Proof 1: " + merkleTree.getHexProof(leafNodes[0]));
        console.log("Proof 2: " + merkleTree.getHexProof(leafNodes[1]));
        const proof = merkleTree.getHexProof(leafNodes[0]);
        console.log("proof: ", proof);
        await merkleTest.claim(await addr1.getAddress(),10, proof);



    });

});
