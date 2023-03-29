// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract FunctionSignature {
    address anotherContract;

    function callAnotherContract() public returns (uint256) {
        uint256[] memory numbers = new uint256[](2);

        (bool res, bytes memory data) = anotherContract.call(
            abi.encodeWithSignature("setValue(uint256)", numbers)
        );

        require(res, "Call failed");

        return abi.decode(data, (uint256));
    }
}
