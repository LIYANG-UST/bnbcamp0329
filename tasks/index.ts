import { task, types } from "hardhat/config";
import { readAddressList } from "../scripts/helper";
import { StandardImpl__factory } from "../typechain-types";

task("getValue").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new StandardImpl__factory(dev).attach(
    addressList[network.name].MyContract
  );
  const value = await myContract.value();
  console.log("value: ", value.toString());
});

task("getVersion").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new StandardImpl__factory(dev).attach(
    addressList[network.name].MyContract
  );
  const version = await myContract.VERSION();
  console.log("version: ", version.toString());
});

task("setValue")
  .addParam("value", "The value to set", undefined, types.int)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const myContract = new StandardImpl__factory(dev).attach(
      addressList[network.name].MyContract
    );
    const tx = await myContract.setValue(taskArgs.value);
    console.log("tx: ", await tx.wait());

    const currentValue = await myContract.value();
    console.log("currentValue: ", currentValue.toString());
  });
