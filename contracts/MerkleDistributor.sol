pragma solidity >=0.8.0 <0.9.0;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "hardhat/console.sol";



contract MerkleDistributorTest {
    address public token;
    bytes32 public merkleRoot;

    mapping(address => bool) public isClaimed;

    mapping(uint256 => uint256) private claimedBitMap;


    constructor() {
    }

    function claim(
        address account,
        uint256 amount,
        bytes32[] calldata merkleProof
    ) external {
        require(!isClaimed[account], 'Already claimed.');

        bytes32 node = keccak256(
            abi.encodePacked(account, amount)
        );
        bool isValidProof = MerkleProof.verifyCalldata(
            merkleProof,
            merkleRoot,
            node
        );
        require(isValidProof, 'Invalid proof.');

        isClaimed[account] = true;
    }

    function setRoot(bytes32 _newRoot) public {
        merkleRoot = _newRoot;
    }


    //    function isClaimed(uint256 index) public view returns (bool) {
//        uint256 claimedWordIndex = index / 256;
//        uint256 claimedBitIndex = index % 256;
//        uint256 claimedWord = claimedBitMap[claimedWordIndex];
//        uint256 mask = (1 << claimedBitIndex);
//        return claimedWord & mask == mask;
//    }
//
//    function _setClaimed(uint256 index) private {
//        uint256 claimedWordIndex = index / 256;
//        uint256 claimedBitIndex = index % 256;
//        claimedBitMap[claimedWordIndex] = claimedBitMap[claimedWordIndex] | (1 << claimedBitIndex);
//    }
//
//    function claim(uint256 index, address account, uint256 amount, bytes32[] calldata merkleProof) external {
//        require(!isClaimed(index), 'MerkleDistributor: Drop already claimed.');
//        _setClaimed(index);
//    }


}

