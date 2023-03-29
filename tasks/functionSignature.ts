import { task, types } from "hardhat/config";

// npx hardhat getFunctionSelector --network localhost --func "approve(address,uint256)"
// 检查: https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7#writeContract
task("getFunctionSelector", "Get function selector")
  .addParam("func", "Function name and parameters", null, types.string)
  .setAction(async (taskArgs, hre) => {
    const func = taskArgs.func;

    const selector = hre.ethers.utils
      .keccak256(hre.ethers.utils.toUtf8Bytes(func))
      .slice(0, 10);
    console.log(`Function ${func} selector is ${selector}`);

    const fullFunc = "function " + taskArgs.func;
    const contractInterface = new hre.ethers.utils.Interface([fullFunc]);
    const selctorFromContract = contractInterface.getSighash(fullFunc);
    console.log(
      `Function ${func} selector from contract is ${selctorFromContract}`
    );
  });

// npx hardhat getFunctionCalldata --network localhost --func "approve(address,uint256)" "0x32eB34d060c12aD0491d260c436d30e5fB13a8Cd" 100
task("getFunctionCalldata", "Get function calldata")
  .addParam("func", "Function name and parameters", null, types.string)
  .addVariadicPositionalParam("params", "Function parameters")
  .setAction(async (taskArgs, hre) => {
    const func = "function " + taskArgs.func;
    const params = taskArgs.params;

    console.log("func: ", func);
    console.log("params: ", params);

    const contractInterface = new hre.ethers.utils.Interface([func]);
    const encodedCalldata = contractInterface.encodeFunctionData(
      taskArgs.func,
      params
    );
    console.log(`Encoded calldata is ${encodedCalldata}`);
  });
