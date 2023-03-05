const Web3 = require('web3');
const contractAbi = require('./build/contracts/SBT.json').abi;
const contractAddress = '0xA6306613570cAD714F83f54084280c6136681C10'; // Replace with your contract address

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your RPC endpoint
const myContract = new web3.eth.Contract(contractAbi, contractAddress);

// Get the default account from Ganache
web3.eth.getAccounts((err, accounts) => {
  if (err) throw err;
  const defaultAccount = accounts[0];

  // Call the safeMint() method with the `from` option
  myContract.methods.safeMint('0x21d2c960c3c66C1256b7097Cde68008E3db050dA', 'ipfs://bafkreic6ov4qo4ucd4g4uuyve4h72nc4y2lg7ugtq3n3vxnfp3lojvtmdu').send({
    from: defaultAccount,
    gas: 3000000 // Optionally specify the gas limit
  })
  .then((receipt) => {
    console.log("Transaction receipt:", receipt);
  })
  .catch((error) => {
    console.error("Error sending transaction:", error);
  });
});
