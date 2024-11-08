// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "./Allowance.sol";

contract SharedWallet is Allowance{

    event MoneySent(address indexed _receiver, address _sentBy, uint _amount);
    event MoneyReceived(address indexed _sender, uint _amount);

    function withdrawMoney(address payable _to, uint _amount) public ownerOrAllowed(_amount){
        require(_amount <= address(this).balance, "Not enough funds");
        require(address(this).balance != 0, "No funds.");

        if(msg.sender != owner()){
            reduceAllowance(msg.sender, _amount);
        }
        emit MoneySent(_to, msg.sender, _amount);
        _to.transfer(_amount);
    }

    function renounceOwnership() override public pure{
        revert("Cant renount ownership in this smart contract");
    }

    fallback() external payable{
    }
    receive() external payable{
        emit MoneyReceived(msg.sender, msg.value);
    }
}
