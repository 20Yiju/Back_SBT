const Web3 = require('web3');
const contractAbi = require('./build/contracts/SBT.json').abi;
const contractAddress = '0x149a04b25512bB6D5C12844f07905F687Befb47B'; // Replace with your contract address

const web3 = new Web3('http://127.0.0.1:7545'); // Replace with your RPC endpoint
const myContract = new web3.eth.Contract(contractAbi, contractAddress);

// address of the owner
const ownerAddress = '0xecb9990Ca6619380541ae32fcDB8B937cdB78577';

// get all token IDs owned by the owner
myContract.methods.getTotalTokenIdFromOwner(ownerAddress).call((error, tokenIds) => {
  if (error) {
    console.log(error);
    return;
  }

  // retrieve URI of each token
  tokenIds.forEach((tokenId) => {
    myContract.methods.tokenURI(tokenId).call((error, uri) => {
      if (error) {
        console.log(error);
        return;
      }

	if(tokenId != 0){
	 console.log(`Token ${tokenId} URI: ${uri}`);	
	}
    });
  });
});
