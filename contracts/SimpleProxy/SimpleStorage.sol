// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract SimpleStorage {
    address private logicContract;

    uint256 private value;

    modifier onlyLogicContract() {
        require(msg.sender == logicContract, "Only logic contract can call");
        _;
    }

    function getValue() external view returns (uint256) {
        return value;
    }

    function setValue(uint256 _newValue) external onlyLogicContract {
        value = _newValue;
    }

    function upgrade(address _newLogic) external onlyLogicContract {
        logicContract = _newLogic;
    }
}
