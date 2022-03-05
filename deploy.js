const HDWallerProvider = require("@truffle/hdwallet-provider");
const { interfaces } = require("mocha");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const INITIAL_STRING = "Hi there!";

const provider = new HDWallerProvider( // connect to a target netword and unlock an account
  "title twist giraffe virus seek debris dutch inherit enjoy weasel embody auction",
  "https://rinkeby.infura.io/v3/3d25ac5f70134fd9b88eea167b74c3e1"
);

// instance of web3
const web3 = new Web3(provider);

// Only making a function so we can use async/await
const deploy = async () => {
  //Get a list of account that have been unlocked by account provider
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account ", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface)) // The inteface is the abi
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to ", result.options.address);
  provider.engine.stop(); // prevent a hanging deployment
};
deploy();
