pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TinToken.sol";

contract PresaleV2 is Ownable {
    TinToken public token;
    uint256 public rate;
    uint256 public weiRaised;
    IERC20 public usdtToken;

    constructor(uint256 _rate, TinToken _token, address _usdtToken)  {
        rate = _rate;
        token = _token;
        usdtToken = IERC20(_usdtToken);
    }

    receive() external payable {
        revert("Use buyTokensWithUSDT for USDT purchases");
    }

    function buyTokensWithUSDT(uint256 usdtAmount) public {
        require(usdtAmount > 0, "USDT amount must be greater than zero");

        uint256 tokens = usdtAmount * rate;

        require(usdtToken.transferFrom(msg.sender, address(this), usdtAmount), "USDT transfer failed");
        require(token.transfer(msg.sender, tokens), "Token transfer failed");

        weiRaised += tokens;
    }

    function withdrawUSDT() external onlyOwner {
        uint256 usdtBalance = usdtToken.balanceOf(address(this));
        require(usdtToken.transfer(owner(), usdtBalance), "USDT transfer to owner failed");
    }
}
