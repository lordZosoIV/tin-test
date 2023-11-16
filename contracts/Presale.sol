pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./TinToken.sol";

contract Presale is Ownable {

    TinToken public token;
    address public wallet;
    uint256 public rate;
    uint256 public weiRaised;

    constructor(uint256 _rate, address _wallet, TinToken _token) {
        rate = _rate;
        wallet = _wallet;
        token = _token;
    }

    receive() external payable {
    }

    function buyTokens() public payable {
        require(msg.value != 0);

        uint256 tokens = msg.value * rate;
        weiRaised = weiRaised + msg.value;

        require(token.transfer(msg.sender, tokens));
        payable(wallet).transfer(msg.value);
    }

    function transferToWallet() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function setRate(uint256 newRate) external onlyOwner {
        rate = newRate;
    }

    function setWallet(address newWallet) external onlyOwner {
        wallet = newWallet;
    }

    function transferAllTokensToOwner() external onlyOwner {
        token.transfer(owner(), token.balanceOf(address(this)));
    }

}
