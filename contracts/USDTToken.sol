// MockUSDTToken.sol
// This is a simplified mock of a standard ERC-20 token like USDT, only for testing purposes.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDTToken is ERC20 {
    constructor() ERC20("USDT Mock", "USDTM") {
        _mint(msg.sender, 1000000 * 10**18); // Mint 1,000,000 USDT Mock tokens to the deployer
    }

    // Function to allow minting tokens to an address
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

}
