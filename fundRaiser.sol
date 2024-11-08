// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract OtherContract{
    address public immutable owner;
    uint public totalMoney;

    constructor(address _owner){
        owner = _owner;
        totalMoney = 0;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "You aint no owner bro, get a life.");
        _;      // it shows the solidity to continue with other code inside the function in which this modifier was called
    }

    function donate() public payable{
        uint _received = msg.value;
        (bool callSuccess, ) = owner.call{value: msg.value}("");
        require(callSuccess, "Failed to recieve the money");
        totalMoney += _received;
    }

    function withdraw() public onlyOwner{   //onlyOwner is modifier
        // we can use following approaches to check sender/who is invoking this function is owner or not. 
        // if/else, require, or modifier.
        // require(msg.sender == owner, "you are not owner bro!");
        (bool callSuccess,) = payable(owner).call{value: address(this).balance}("");
        require(callSuccess, "failed to send money");
        totalMoney =0;
    }
}