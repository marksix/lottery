pragma solidity ^0.4.24;

contract Lottery{
    // ---整体逻辑
    //1. 管理员：负责开奖和退奖，添加modifier函数限定两个函数
    //2. 彩民池：address[] players，开奖退奖都要清空
    //3. 当前期数：每次开奖退奖后都要加1
    //4. 开奖：
    //       (1)求随机数，确定中奖地址 --这里需要注意
    //       (2)分配奖金池，分为奖金和管理费
    //       (3)给中奖地址和管理员地址转钱
    //       (4)期号+1，清空彩民池
    //5. 退奖：
    //       (1)根据数组长度，for循环地址转钱
    //       (2)期号+1，清空彩民池
    //6. 投注play：
    //       (1)限制条件：require(要求投注金额必须是1个以太币)
    //       (2)将投注地址添加到彩民池子
	
	//变量，这里public，下面也用getXXX形式返回了。
	//管理员地址
    address public manager;
    //中奖彩民
    address public winner;
    //第round期
    uint256 public round = 1;
    //所有参与的彩民(管理员也可以参与游戏)
    address[] public players;

	//构造函数，部署合约的人就是管理员
    constructor() public{
        manager = msg.sender;
    }

    //---彩民投注函数
    //1. 合约⾥⾯的单位默认为 wei ，需要进⾏ ether 修饰，也可以使⽤ 1 * 10 ** 18 进⾏转换。
    //2. payable关键字必须添加，否则⽆法购买 
    //3. msg.value全局变量能够接收到交易中的 value 字段 
    //4. 数组添加使⽤ push
    function play() payable public{
    	//require限定投注金额为1ETH
        require(msg.value == 1 ether);
        //将投注者添加到彩民池
        players.push(msg.sender);
    }
	
	//---管理员开奖函数，用onlyManager限定权限
	//1. 随机中奖需要⼀个随机的索引值，我们使⽤难度值，当前时间，参与⼈数作为种⼦⽣成⼀个⼤的 数字⽣成索引。
	//2. 开奖前要注意校验有效性，如果⽆⼈参与可以不开奖。 
	//3. 本轮结束后 round++ ，进⼊下⼀轮。 
	//4. 删除所欲的参与⼈，注意delete只是删除内部元素，不会删除 players 。
    function KaiJiang() onlyManager public{
		//随机一个下标值，表示获奖者
        bytes memory tmp1 = abi.encodePacked(block.timestamp, block.difficulty, players.length);
        bytes32 tmp2 = keccak256(tmp1);
        uint256 tmp3 = uint256(tmp2);
        
		//确定获奖者地址
        uint256 index = tmp3 % players.length;
        winner = players[index];
        
		//根据9-1分成规则转钱
        uint256 contractMoney = address(this).balance;
        uint256 winnerMoney = contractMoney / 100 * 90;
        uint256 managerMoney = contractMoney - winnerMoney;
        winner.transfer(winnerMoney);
        manager.transfer(managerMoney);
		
		//本期结束后期数+1，并清空彩民池
        round++;
        delete players;
    }
    
	//---管理员退奖
    function TuiJiang() onlyManager public{
    	//遍历数组，逐一转账
        for(uint i = 0; i < players.length; i++){
            players[i].transfer(1 ether);
        }
        //期数+1
        round++;
        //清空彩民池
        delete players;
    }
	
	//---修饰器
    modifier onlyManager{
    	//限定作用，非管理员不允许调用开奖和退奖函数
        require(msg.sender == manager);
        _;
    }

    //返回奖池金额
    function getBalance() view public returns(uint){
        return address(this).balance;
    }

    //返回奖池人数
    function getPlayersLength() view public returns(uint){
        return players.length;
    }

    //以数组形式返回奖池人地址
    function getPlayers() view public returns(address []){
        return players;
    }
	
	//返回管理员
    function getManager() view public returns(address){
        return manager;
    }
	
	//返回管理员
    function getWinner() view public returns(address){
        return winner;
    }
	
	//返回当前期号
    function getRound() view public returns(uint256){
        return round;
    }
}