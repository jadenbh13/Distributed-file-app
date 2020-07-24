if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];
var mediachainContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userAccts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundsWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_sharedPeer","type":"address"},{"name":"_fileContent1","type":"string"},{"name":"_email","type":"string"}],"name":"setUserFile","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getFile","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"returnMsg","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUserFile","outputs":[{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unitsOneEthCanBuy","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalEthInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getUserBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"returnMsgBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSharedUserFile","outputs":[{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countUsers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setA","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]);

var mediachain = mediachainContract.at('0xd8900e15debd821cdf41ca078c72930432399de1')
console.log(mediachain);
$("#shareF1").click(function() {
  const $account = web3.eth.defaultAccount
  const $shareF = ($("#shareF").val()).toString()
  const $shareNewF = ($("#shareNewF").val()).toString()
  const $hashValue = ($("#hashValue").val()).toString()
  const $mailValue = ($("#mailA").val()).toString()
  mediachain.setA($shareF)
  mediachain.setUserFile($shareF, $shareNewF, $hashValue, $mailValue)
})
mediachain.countUsers(function(err, res) {
  if(err) {
    console.log(err)
  } else {
    if(res.c == 1) {
      $("#userCount").html(res.c + ' user')
    } else {
      $("#userCount").html(res.c + ' users')
    }
  }
})
mediachain.getFile(function(err, res) {
  if(err) {
    console.log(err)
  } else {
    console.log(res)
  }
})
mediachain.getSharedUserFile(function(err, res) {
  if(err) {
    $("#addressVal2").html(err)
  } else {
    $("#addressVal2").html(res[0] + ' from ' + res[1] + ' with email ' + res[2])
  }
})
mediachain.getUserFile(function(err, res) {
  if(err) {
    $("#addressVal").html(err)
  } else {
    $("#addressVal").html(res[0] + ' ' + res[1] + ' ' + res[2])
    $("#textVal").html(res[0])
  }
})
mediachain.returnMsgBalance(function(err, res) {
  if(err) {
    $("#DCNTotal").html("Fetch error occurred")
  } else {
    console.log(res.c[1])
    $("#DCNTotal").html(res.c[1])
  }
})
mediachain.getUserBalance(function(err, res) {
  if(err) {
    alert(err)
  } else {
    console.log(res)
    $("#urTotal").html(res.c[0])
  }
})
