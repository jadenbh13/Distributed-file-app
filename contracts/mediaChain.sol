pragma solidity ^0.4.0;
contract mediaChain {
    struct User {
      string fileContent1;
      address sharedPeer;
      string email;
    }
    mapping (address => User) users;
    address[] public userAccts;
    uint userNumbers = userAccts.length;
    function setUserFile(address _user, address _sharedPeer, string _fileContent1, string _email) public {
        var User = users[_user];

        User.fileContent1 = _fileContent1;
        User.sharedPeer = _sharedPeer;
        User.email = _email;

        userAccts.push(_user) -1;
    }
    function countUsers() view public returns (uint) {
        return userAccts.length;
    }
    function getFile() view public returns(address[]) {
        return userAccts;
    }
    address userA;
    function setA(address _address) public {
        userA = _address;
    }
    function getUserFile() view public returns (string, address, string) {
        var User = users[userA];
        return(users[userA].fileContent1, users[userA].sharedPeer, users[userA].email);
    }
    function getSharedUserFile() view public returns(string, address, string) {
        var userB = users[userA].sharedPeer;
        return(users[userB].fileContent1, users[userA].sharedPeer, users[userB].email);
    }

}
