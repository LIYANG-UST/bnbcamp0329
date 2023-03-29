import { task, types } from "hardhat/config";
import { readAddressList } from "../scripts/helper";

task("getStorageAt", "Get value at a specific storage slot")
  .addParam("slot", "The storage slot to query", 0, types.string)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;

    const slot = hre.ethers.utils.hexValue(
      hre.ethers.BigNumber.from(taskArgs.slot)
    );

    const addressList = readAddressList();
    const address = addressList[network.name].StorageStructure;

    const value = await hre.ethers.provider.getStorageAt(address, slot);
    console.log(`Contract ${address} at slot ${slot} is ${value}`);
  });

task("getMappingLocation", "Get mapping storage location")
  .addParam("key", "The mapping key to query", null, types.string)
  .addParam(
    "slot",
    "The storage slot of the mapping definition",
    0,
    types.string
  )
  .setAction(async (taskArgs, hre) => {
    const key = taskArgs.key;
    const slot = taskArgs.slot;

    // 在Solidity中的计算方式:
    //  Location = keccack256(abi.encodePacked(key, slot))
    const location = hre.ethers.utils.solidityKeccak256(
      ["uint256", "uint256"],
      [key, slot]
    );

    console.log(
      `Storage location of mapping with key ${key} is stored at location ${location}`
    );
  });

task("getMappingValue", "Get mapping value")
  .addParam(
    "slot",
    "The storage slot of the mapping definition",
    0,
    types.string
  )
  .addParam("key", "The mapping key to query", null, types.string)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;

    const key = taskArgs.key;
    const slot = hre.ethers.utils.hexValue(
      hre.ethers.BigNumber.from(taskArgs.slot)
    );

    const addressList = readAddressList();
    const address = addressList[network.name].StorageStructure;

    const location = hre.ethers.utils.solidityKeccak256(
      ["uint256", "uint256"],
      [key, slot]
    );

    const value = await hre.ethers.provider.getStorageAt(address, location);
    console.log(
      `Contract ${address}'s ${taskArgs.slot}th mapping with key ${key} is stored at location ${location} \nValue is ${value}`
    );
  });

task("keccak256", "Get keccak256 hash").setAction(async (_, hre) => {
  const input =
    "0x89832631fb3c3307a103ba2c84ab569c64d6182a18893dcd163f0f1c2090733a";

  const hash = hre.ethers.utils.solidityKeccak256(["uint256"], [input]);
  console.log(`keccak256 hash of ${input} is ${hash}`);
});
