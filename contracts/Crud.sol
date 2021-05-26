//SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Crud {
    
    struct User{
        uint256 id;
        string name;
    }
    User[] public users;
    
    using SafeMath for uint256;

    uint256 nextId = 1;

    function findUser(uint256 _id) view internal returns(uint){
        for(uint i =0; i< users.length; i++){
            if(users[i].id == _id){
                return i;
            }
            revert("User doesn't exist");
        }
    }
    
    function readUser(uint256 _id) public view returns(uint256, string memory){
        return(users[findUser(_id)].id, users[findUser(_id)].name);
    }

    function createUser(string memory _name) public{
        users.push(User(nextId, _name));
        nextId = nextId.add(1);
    }

    function deleteUser(uint256 _id) public{
        delete users[findUser(_id)];
    }

    function updateUser(uint256 _id, string memory _newName) public{
        uint256 id = findUser(_id);
        users[id].name = _newName;
    }

}