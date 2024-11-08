const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // )
  // wallet = await wallet.connect(provider)

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  )
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log("deploying, please wait....")
  const contract = await contractFactory.deploy()
  await contract.deployTransaction.wait(1)
  console.log(`Contract address: ${contract.address}`)

  // console.log("lets deploy with only transaction data!");
  // const nonce = await wallet.getTransactionCount();
  // const { chainId } = await provider.getNetwork();
  // const tx = {
  //   nonce: nonce,
  //   gasPrice: 20000000000,
  //   gasLimit: 1000000,
  //   to: null,
  //   value: 0,
  //   data: "0x608060405234801561001057600080fd5b50610771806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c57806343ec8f471461007a5780636057361d146100aa5780636f760f41146100c65780639e7a13ad146100e2575b600080fd5b610064610113565b604051610071919061035c565b60405180910390f35b610094600480360381019061008f91906104d1565b61011c565b6040516100a1919061035c565b60405180910390f35b6100c460048036038101906100bf9190610546565b61014a565b005b6100e060048036038101906100db9190610573565b610154565b005b6100fc60048036038101906100f79190610546565b6101e4565b60405161010a929190610657565b60405180910390f35b60008054905090565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b8060008190555050565b600160405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101ba9291906102a0565b505050806002836040516101ce91906106c3565b9081526020016040518091039020819055505050565b600181815481106101f457600080fd5b906000526020600020906002020160009150905080600001549080600101805461021d90610709565b80601f016020809104026020016040519081016040528092919081815260200182805461024990610709565b80156102965780601f1061026b57610100808354040283529160200191610296565b820191906000526020600020905b81548152906001019060200180831161027957829003601f168201915b5050505050905082565b8280546102ac90610709565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b6000819050919050565b61035681610343565b82525050565b6000602082019050610371600083018461034d565b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6103de82610395565b810181811067ffffffffffffffff821117156103fd576103fc6103a6565b5b80604052505050565b6000610410610377565b905061041c82826103d5565b919050565b600067ffffffffffffffff82111561043c5761043b6103a6565b5b61044582610395565b9050602081019050919050565b82818337600083830152505050565b600061047461046f84610421565b610406565b9050828152602081018484840111156104905761048f610390565b5b61049b848285610452565b509392505050565b600082601f8301126104b8576104b761038b565b5b81356104c8848260208601610461565b91505092915050565b6000602082840312156104e7576104e6610381565b5b600082013567ffffffffffffffff81111561050557610504610386565b5b610511848285016104a3565b91505092915050565b61052381610343565b811461052e57600080fd5b50565b6000813590506105408161051a565b92915050565b60006020828403121561055c5761055b610381565b5b600061056a84828501610531565b91505092915050565b6000806040838503121561058a57610589610381565b5b600083013567ffffffffffffffff8111156105a8576105a7610386565b5b6105b4858286016104a3565b92505060206105c585828601610531565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b838110156106095780820151818401526020810190506105ee565b83811115610618576000848401525b50505050565b6000610629826105cf565b61063381856105da565b93506106438185602086016105eb565b61064c81610395565b840191505092915050565b600060408201905061066c600083018561034d565b818103602083015261067e818461061e565b90509392505050565b600081905092915050565b600061069d826105cf565b6106a78185610687565b93506106b78185602086016105eb565b80840191505092915050565b60006106cf8284610692565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061072157607f821691505b60208210811415610735576107346106da565b5b5091905056fea2646970667358221220f55f2a62b17e8b2a859ba98e68af94e3ed364192cb88f5d58087d47f755d9b5c64736f6c63430008080033",
  //   chainId: chainId,
  // };
  // const sentTxResponse = await wallet.sendTransaction(tx);
  // console.log(sentTxResponse);
  // console.log(chainId, "this is chainId");

  const curentFavNumber = await contract.retrieve()
  console.log(`current fav number: ${curentFavNumber.toString()}`)
  const transactionResponse = await contract.store("110")
  const transactionSuccess = await transactionResponse.wait(1)
  const updatedFavNumber = await contract.retrieve()
  console.log(`updated fav number: ${updatedFavNumber.toString()}`)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
