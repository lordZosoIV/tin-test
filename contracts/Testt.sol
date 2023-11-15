pragma solidity >=0.8.0 <0.9.0;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "hardhat/console.sol";

contract MerkleTest {
    // The Merkle root hash
    bytes32 public root;
    using MerkleProof for bytes32[];

    function setRoot(bytes32 _newRoot) public {
        root = _newRoot;
    }

    function checkValidity(bytes32[] memory proof,uint256 value) public view returns (bool) {
        console.logBytes32(keccak256(abi.encodePacked(value)));
        require(proof.verify(root, keccak256(abi.encodePacked(value))), "hbhbh");
        return true;
    }


}
