// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";


contract Allowance is Ownable{

    using SafeMath for uint;

    event AllowanceChanged(address _forWho, address indexed _byWhom, uint _oldLimit, uint _newLimit);

    mapping(address => uint) public allowance;

    function setAllowances(address _who, uint _amount)public onlyOwner{
        emit AllowanceChanged(_who, msg.sender, allowance[_who],allowance[_who] + _amount);
        allowance[_who] = _amount;
    }
    
    modifier ownerOrAllowed(uint _amount){
        require(msg.sender == owner() || allowance[msg.sender] >= _amount, "you are not allowed");
        _;
    }

    function reduceAllowance(address _who, uint _amount) internal {
        emit AllowanceChanged(_who, msg.sender, allowance[_who],allowance[_who].sub(_amount));
        allowance[_who] = allowance[_who].sub(_amount);
    }
}
