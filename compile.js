const path = require('path');
const fs =require('fs');
const solc =require('solc'); // solidity compiler

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol'); // read in the content of our inbox contract and fed it directly into out compiler (line 8)
const source = fs.readFileSync(inboxPath,'utf8');

const input = {
    language: 'Solidity',
    sources: {
      'Inbox.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };
   
  module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
  ].Inbox;
