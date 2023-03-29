// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

// contract Proxy {
//     address public logicContract;

//     constructor(address _logicContract) {
//         logicContract = _logicContract;
//     }

//     function setLogicContract(address _logicContract) public {
//         logicContract = _logicContract;
//     }

//     fallback() external {
//         address _impl = logicContract;
//         assembly {
//             calldatacopy(0, 0, calldatasize())
//             let result := delegatecall(gas(), _impl, 0, calldatasize(), 0, 0)
//             returndatacopy(0, 0, returndatasize())
//             switch result
//             case 0 {
//                 revert(0, returndatasize())
//             }
//             default {
//                 return(0, returndatasize())
//             }
//         }
//     }
// }

// contract Impl {
//     uint256 public number;
//     string public name;

//     function setNumber(uint256 _number) public {
//         number = _number;
//     }

//     function setName(string memory _name) public {
//         name = _name;
//     }
// }

interface ITestContract {
    function getValue() external view returns (uint256);

    function setValue(uint256 _newValue) external;
}

import "hardhat/console.sol";

contract hi{
    event newEvent(uint256 value);
}


contract Console {

    uint8 public shortNumber = 10;
    uint8 public shorNumber2 = 25;

    uint256 public value;

    function setValue(uint256 _newValue) external {
        console.log(_newValue);
        console.log("new value is ", _newValue);
        console.log("doubled new value is ", _newValue * 2);

        value = _newValue;
    }
}


