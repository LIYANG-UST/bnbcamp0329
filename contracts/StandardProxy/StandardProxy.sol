// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

contract StandardProxy {
    // bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1))
    bytes32 constant IMPL_SLOT =
        0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    constructor(address _logic) {
        _setImplementation(_logic);
    }

    function _setImplementation(address _logicContract) internal {
        assembly {
            sstore(IMPL_SLOT, _logicContract)
        }
    }

    function _getImplementation() internal view returns (address impl) {
        assembly {
            impl := sload(IMPL_SLOT)
        }
    }

    function _delegate(address implementation) internal virtual {
        assembly {
            // Copy msg.data. We take full control of memory in this inline assembly
            // block because it will not return to Solidity code. We overwrite the
            // Solidity scratch pad at memory position 0.
            calldatacopy(0, 0, calldatasize())

            // Call the implementation.
            // out and outsize are 0 because we don't know the size yet.
            let result := delegatecall(
                gas(),
                implementation,
                0,
                calldatasize(),
                0,
                0
            )

            // Copy the returned data.
            returndatacopy(0, 0, returndatasize())

            switch result
            // delegatecall returns 0 on error.
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    fallback() external {
        _delegate(_getImplementation());
    }
}
