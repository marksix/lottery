//1.导入相关包
let solc = require('solc')
let fs = require('fs')
//2.读取合约
let sourceCode = fs.readFileSync('./contracts/Lottery.sol', 'utf-8')
//3.编译合约
//将1设置为第二个参数将激活优化器
let  output = solc.compile(sourceCode, 1)
//4.导出合约
//console.log(output)
module.exports = output[ 'contracts'][':Lottery']