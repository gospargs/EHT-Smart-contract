pragma solidity ^0.4.17; // specifies the version of solidity that our code is written in

contract Inbox {
    // Defines a new contract that will have some methods and variables

    string public message; // Declares all of the instance variables (and their types) that will exist in this contract

    // If a variable is public i automaticly generates a getMessage.

    // Defines different functions that will be members of this contract
    function Inbox(string initialMessage) public {
        // constructor
        message = initialMessage;adm
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
    /*
    // Gas Costs from Yellow paper
    // To check the gas price for all operation that are in the function

        function doMath(int a, int b){
            a+b;  // 3 gas
            a-b;  // 3 gas
            a*b;  // 5 gas 
            a==0; // 3 gas
        // total of 14 gas
        }

    // GasPrice - Amount of Wei the sender is willing to pay per unit gas to get this transaction processes
    // startGas/gasLimit - units of gas that this transaction can consume
    
    // if the gassLimit i smaller then the operations the function stop
*/
}
