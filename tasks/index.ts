import { task, types } from "hardhat/config";


task("getMappingStorage", "Get mapping storage location").setAction(
  async (_, hre) => {
    // Location = keccack256(abi.encodePacked(key, slot))
    const location = hre.ethers.utils.solidityKeccak256(
      ["uint256", "uint256"],
      [1, 5]
    );

    console.log("location: ", location);
  }
);

// npx hardhat getStorageAt --network localhost --address 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 --slot 0xe2689cd4a84e23ad2f564004f1c9013e9589d260bde6380aba3ca7e09e4df40c 