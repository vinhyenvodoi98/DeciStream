// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/DeciStream.sol";

contract TestDeciStream is Test {
    DeciStream c;

    function setUp() public {
        c = new DeciStream();
    }
}
