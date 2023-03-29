// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract StandardImpl {
    // uint256 public constant VERSION = 1;
    uint256 public constant VERSION = 2;

    bool public initialized;

    uint256 public value;

    modifier initializer() {
        require(!initialized, "Only initialize once");
        _;
        initialized = true;
    }

    function initialize(uint256 _initValue) public initializer {
        value = _initValue;
    }

    function setValue(uint256 _newValue) public {
        value = _newValue + 10;
    }
}
