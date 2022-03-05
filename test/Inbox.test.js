const assert = require('assert');
const ganache = require('ganache-cli'); // Our local test network
const Web3 = require('web3'); // Capital letter because its a constructor function (used to create instances of the web3 library)
const web3 = new Web3(ganache.provider()); // actual instance of web3, ganache.provider() -depends on what network we are goint to connect to.
const { interface, bytecode } = require('../compile'); // interface - abi, bytecode - compiled contract

// Every function we call with web3 i async - it returns a promise

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';
beforeEach(async () => {
  // Get a list of all accounts (pregenerated unlocked accounts only for testing localy)

  accounts = await web3.eth.getAccounts();

  // Use one of those account to deploy the contract
  // inbox is a JS respresentation of our contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)) // Teaches web3 about what methods an Inbox contract has, param: json representation of our contract
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] }) // Tells web3 that we want to deploy a new copy of this contract,data - we specify the bytecode of the contract, arguments - calling the constructor function in our contract, creates the object that can be deployed to the network
    .send({ from: accounts[0], gas: '1000000' }); // Instructs web3 to send out a transaction that creates this contract, from: person that is creating the contract
});

describe('Inbox', () => {
  //Check if an address exists - it means its deployed
  it('It deploys a contract', () => {
    assert.ok(inbox.options.address); // ok method checks if the value exists
  });

  it('Contract has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it('Can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] }); // who is paying for the transaction - accounts[0], returns a transaction hash, if it fails will throw an error
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});

/*
//TESTING WITH MOCHA

class Car {
    park(){
        return 'stopped';
    }
    drive (){
        return 'vroom';
    }
}

To run the test we need to add:
 'scripts': {
    'test': 'mocha'
},
in the package.json file 
and just execute npm run test

let car;

beforeEach(()=>{ // it will be executed before every it function
     car = new Car();
})

describe('Car', ()=>{ // First param is used to know what set of test we are running (Description), Second param is another function that contains the IT test statements
    
    it('can park',()=>{ //test the park function, First param is used to know what set of test we are running (Description)
        assert.equal(car.park(),'stopped'); // first param we call the function we are testing, second param is the expected output
    }); 

    it('can drive',()=>{
        assert.equal(car.drive(),'vroom');

    });
}); 

*/
