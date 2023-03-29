import { task, types } from "hardhat/config";

task("getStorageAt", "Get value at a specific storage slot")
  .addParam("address", "The address to query", null, types.string)
  .addParam("slot", "The storage slot to query", 0, types.string)
  .setAction(async (taskArgs, hre) => {
    const address = taskArgs.address;
    const slot = hre.ethers.utils.hexValue(
      hre.ethers.BigNumber.from(taskArgs.slot)
    );

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
  .addParam("address", "The address to query", null, types.string)
  .addParam("key", "The mapping key to query", null, types.string)
  .addParam(
    "slot",
    "The storage slot of the mapping definition",
    0,
    types.string
  )
  .setAction(async (taskArgs, hre) => {
    const address = taskArgs.address;
    const key = taskArgs.key;
    const slot = hre.ethers.utils.hexValue(
      hre.ethers.BigNumber.from(taskArgs.slot)
    );

    const location = hre.ethers.utils.solidityKeccak256(
      ["uint256", "uint256"],
      [key, slot]
    );

    const value = await hre.ethers.provider.getStorageAt(address, location);
    console.log(
      `Contract ${address}'s ${taskArgs.slot}th mapping with key ${key} is stored at location ${location}, value is ${value}`
    );
  });

task("keccak256", "Get keccak256 hash").setAction(async (_, hre) => {
  const input = 1;

  const hash = hre.ethers.utils.solidityKeccak256(["uint256"], [input]);
  console.log(`keccak256 hash of ${input} is ${hash}`);
});
