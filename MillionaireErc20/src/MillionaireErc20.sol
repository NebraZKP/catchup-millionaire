// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "upa/upa/contracts/IUpaVerifier.sol";

contract MillionaireERC20 is ERC20, Ownable {
    bytes32 zkTlsCircuitId;
    IUpaVerifier upaVerifier;

    // Constructor to initialize the token with a name and symbol
    constructor(string memory name, string memory symbol, address _upaVerifier, bytes32 _zkTlsCirctuitId) ERC20(name, symbol) Ownable(msg.sender) {
        upaVerifier = IUpaVerifier(_upaVerifier);
        zkTlsCircuitId = _zkTlsCirctuitId;
    }

    // Function to mint tokens to an address
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function sendSalaryTokens(address recipient, uint256 salary) external onlyOwner {
        uint256[] memory tlsPublicInputs;
        tlsPublicInputs[0] = salary;
        bool isProofVerified = upaVerifier.isProofVerified(zkTlsCircuitId, tlsPublicInputs);

        require(isProofVerified, "Solution not verified by UPA");

        _mint(recipient, salary);
    }

    // Function to send tokens while ensuring the user's total balance equals the input
    function sendTokens(address recipient, uint256 desiredBalance) external onlyOwner {
        uint256 currentBalance = balanceOf(recipient);

        // Only mint new tokens if the recipient's balance is less than the desired balance
        if (currentBalance < desiredBalance) {
            uint256 amountToSend = desiredBalance - currentBalance;
            _mint(recipient, amountToSend);
        }
    }
}
