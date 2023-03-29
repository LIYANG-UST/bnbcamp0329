import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const storageStructure = await deploy("StorageStructure", {
    contract: "StorageStructure",
    from: deployer,
    args: [],
    log: true,
  });
  console.log("StorageStructure deployed to:", storageStructure.address);
};

func.tags = ["StorageStructure"];
export default func;