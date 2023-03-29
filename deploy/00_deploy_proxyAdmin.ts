import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { readAddressList, storeAddressList } from "../scripts/helper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  // const [deployer] = await hre.ethers.getSigners()
  console.log("Deploying ProxyAdmin with account:", deployer);

  const addressList = readAddressList();

  const proxyAdmin = await deploy("ProxyAdmin", {
    contract: "ProxyAdmin",
    from: deployer,
    args: [],
    log: true,
  });
  console.log("ProxyAdmin deployed to:", proxyAdmin.address);

  addressList[network.name].ProxyAdmin = proxyAdmin.address;
  storeAddressList(addressList);
};

func.tags = ["ProxyAdmin"];
export default func;
