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

    const fullFunc = "function " + func;

    const contractInterface = new hre.ethers.utils.Interface([fullFunc]);
    const selctorFromContract = contractInterface.getSighash(func);
    console.log(
      `Function ${func} selector from contract is ${selctorFromContract}`
    );

    const encodedCalldata = contractInterface.encodeFunctionData(func, [
      hre.ethers.constants.AddressZero,
      456,
    ]);
    console.log(`Encoded calldata is ${encodedCalldata}`);
  });
