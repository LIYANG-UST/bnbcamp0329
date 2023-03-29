// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract Impl {
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
        value = _newValue;
    }
}
