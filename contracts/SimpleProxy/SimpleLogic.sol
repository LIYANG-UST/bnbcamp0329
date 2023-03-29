// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./SimpleStorage.sol";

contract SimpleLogic {
    SimpleStorage storageContract;

    function getValue() external view returns (uint256) {
        return storageContract.getValue();
    }

    function setValue(uint256 _newValue) external {
        storageContract.setValue(_newValue);
    }

    function upgradeTo(address _newLogic) external {
        storageContract.upgrade(_newLogic);
    }
}
