pragma solidity ^0.5;

contract MappingStruct{

    struct Payment{
        uint amount;
        uint timestamps;
    }

    struct Balance{
        uint totalBalance;
        uint numPaymnets;
        mapping (uint => Payment) AllPayments ;
    }
    mapping(address => Balance) public balanceReceived;

    function balance ()public view returns(uint) {
        return address(this).balance;
    }

    function deposit () public payable {
        balanceReceived[msg.sender].totalBalance += msg.value;
        Payment memory payment = Payment(msg.value, now);
        balanceReceived[msg.sender].AllPayments[balanceReceived[msg.sender].numPaymnets] = payment;
        balanceReceived[msg.sender].numPaymnets++;
    }

    function transfer (address payable _to, uint _amount) public {
        require(balanceReceived[msg.sender].totalBalance >= _amount, "not enough funcds you poor b*tch");
        balanceReceived[msg.sender].totalBalance -= _amount;
        _to.transfer(_amount);
    }

    function withdrawAll (address payable _to) public{
        uint balanceToSend = balanceReceived[msg.sender].totalBalance;
        balanceReceived[msg.sender].totalBalance = 0;
        _to.transfer(balanceToSend);
    }
}
