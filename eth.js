// Import necessary libraries
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Initialize web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); // Connect to local Ethereum node

// Load compiled smart contract artifact
const contractPath = path.resolve(__dirname, 'build', 'contracts', 'YourContract.json');
const contractJSON = fs.readFileSync(contractPath, 'utf8');
const contractData = JSON.parse(contractJSON);

// Get contract ABI and bytecode
const abi = contractData.abi;
const bytecode = contractData.bytecode;

// Define contract address (if already deployed) or deploy a new contract
const contractAddress = '0x...'; // Replace with the deployed contract address

// Create contract instance
const contractInstance = new web3.eth.Contract(abi, contractAddress);

// Example: Deploying a new contract
async function deployContract() {
    try {
        const accounts = await web3.eth.getAccounts();
        const deployedContract = await contractInstance.deploy({
            data: '0x' + bytecode
        }).send({
            from: accounts[0],
            gas: '3000000'
        });
        console.log('Contract deployed at address:', deployedContract.options.address);
    } catch (error) {
        console.error('Error deploying contract:', error);
    }
}

// Example: Interacting with contract methods
async function interactWithContract() {
    try {
        // Call contract methods
        const result = await contractInstance.methods.yourMethod().call();
        console.log('Result:', result);

        // Send transactions to contract methods
        const accounts = await web3.eth.getAccounts();
        const tx = await contractInstance.methods.anotherMethod(param1, param2).send({
            from: accounts[0],
            gas: '3000000'
        });
        console.log('Transaction hash:', tx.transactionHash);
    } catch (error) {
        console.error('Error interacting with contract:', error);
    }
}

// Example: Listen to contract events
function listenToEvents() {
    contractInstance.events.YourEvent()
        .on('data', (event) => {
            console.log('Event data:', event.returnValues);
        })
        .on('error', console.error);
}

// Deploy contract (uncomment if deploying a new contract)
// deployContract();

// Interact with contract
// interactWithContract();

// Listen to contract events
// listenToEvents();

module.exports = {
    web3,
    contractInstance
};
