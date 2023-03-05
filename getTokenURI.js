const Web3 = require('web3');
const contractAbi = require('./build/contracts/SBT.json').abi;
const contractAddress = '0xA6306613570cAD714F83f54084280c6136681C10'; // Replace with your contract address

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your RPC endpoint
const myContract = new web3.eth.Contract(contractAbi, contractAddress);

// Get the default account from Ganache
web3.eth.getAccounts((err, accounts) => {
  if (err) throw err;
  const defaultAccount = accounts[0];

  // Call the tokenURI() method with the `from` option
  myContract.methods.tokenURI(0).call()
	.then((result) => {
		console.log(result);})
	.catch((error) => {
	console.error(error);});
});
