// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract StorageStructure {
    // Slot 0
    uint256 public number;

    // Slot 1
    bytes32 public hashValue;

    // Slot 2 & 3
    uint256[2] public numbers = [1, 2];

    // Slot 4
    uint8 public shortNumberA;
    uint8 public shortNumberB;
    uint128 public shortNumberC;

    // Slot 5 is empty
    // Value location for "key" is keccak256(key.slot)
    mapping(uint256 => string) public names;

    constructor() {
        number = 1;
        hashValue = keccak256(abi.encodePacked(number));
        names[1] = "alice";
        names[2] = "I am a very long name, and I am longer than 31 bytes";
        shortNumberA = 1;
        shortNumberB = 2;
        shortNumberC = 20;
    }
}

contract StringStorage {
    string a = unicode"我比较短";
    string b = unicode"我特别特别长，已经超过了一个插槽存储量";
}
