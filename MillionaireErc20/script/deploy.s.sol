// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/MillionaireERC20.sol";

contract DeployMillionaireERC20 is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy the MillionaireERC20 contract
        MillionaireERC20 token = new MillionaireERC20("MillionaireToken", "MTK");

        vm.stopBroadcast();
    }
}
