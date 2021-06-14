//1. 引入
let {bytecode, interface} = require('./01-compile')
let Web3 = require('web3')
//let HDWalletProvider = require('truffle-hdwallet-provider')

//2. new一个web3实例
let web3 = new Web3();

//3. 设置网络，这里用Ganache本地测试网络环境，自行搜索安装
//助记词
//let terms = 'lottery';
let netIp = 'http://localhost:7545'
//let provider = new HDWalletProvider(terms, netIp)
//const web3 = new Web3();

web3.setProvider(netIp)

let contract = new web3.eth.Contract(JSON.parse(interface))


let deploy = async () => {
    //4. 先获取所有的账户
    let accounts = await web3.eth.getAccounts() //获取账户列表
    console.log('account:', accounts)
    //5. 执行部署
    let instance = await contract.deploy({
        data:bytecode, //合约的bytecode
        //argument : ['HelloWorld']
    }).send({
        from : accounts[0], //部署合约人(管理员地址)，需要从这里扣钱！！！
        gas : '6721975',
        gasPrice : '1'
    })
    console.log('instance address : ', instance.options.address)
}

deploy()