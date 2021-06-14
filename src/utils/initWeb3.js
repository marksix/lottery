let Web3 = require('web3')
let web3 = new Web3();

//重要更新：为了保护隐私，默认关闭，需要手动开启，才能获取用户当前地址
//information : https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
window.ethereum.enable();

//说明：
//实例化web3需要一个provider(服务商)，管理员部署的时候用自己的账号
//但是彩民参与这个活动，投注要用自己账号的钱
//实现
//1.用Ganache的某个账户地址的私钥，在MetaMask中创建一个账户
//2.在浏览器启动后，MetaMask会向浏览器注入一个web3实例
//3.利用window.web3.currentProvider获得实例
web3.setProvider(window.web3.currentProvider)
console.log("Injected web3 found!")

module.exports = web3