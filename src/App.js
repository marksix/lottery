import React,{Component} from 'react';
import CardExampleCard from './display/ui'
let web3 = require('./utils/initWeb3')
let lottery = require('./eth/lottery')

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            manager : '',
            round:'',
            winner:'',
            playerCounts:0,
            balance:0,
            players:[],
            account : '',
        };
    }

    async componentWillMount(){
        let accounts = await web3.eth.getAccounts()
        let manager = await lottery.methods.manager().call();
        let round = await lottery.methods.getRound().call();
        let winner = await lottery.methods.getWinner().call();
        let playerCounts = await lottery.methods.getPlayersLength().call();
        let balanceWei = await lottery.methods.getBalance().call();
        let balance = web3.utils.fromWei(balanceWei, 'ether')
        let players = await lottery.methods.getPlayers().call();
        this.setState({
            manager,
            round,
            winner,
            playerCounts,
            balance,
            players,
            account:accounts[0],
            isPlaying:false,
            isDrawing:false,
            isDrawBacking:false,
            isShowButton:accounts[0] === manager ? 'inline' : 'none',
        });
    }

    play = async() =>{
        console.log("点击投注按钮!!!");
        this.setState({isPlaying:true})
        try{
            let accouts = await web3.eth.getAccounts();
            await lottery.methods.play().send({
                from:accouts[0],
                value:1*10**18
            })
            alert(`成功: 投注成功!`);
            this.setState({isPlaying:false});
            window.location.reload(true);
        }catch (e) {
           alert(`Error: 投注失败! ${e}`);
           this.setState({isPlaying:false});
        }
    }

    Kaijiang = async() =>{
        console.log("点击开奖按钮!!!");
        this.setState({isDrawing:true})
        try{
            let accouts = await web3.eth.getAccounts();
            await lottery.methods.KaiJiang().send({
                from:accouts[0],
            })
            let winner_ = await lottery.methods.getWinner().call();
            alert(`本期中奖者为${winner_}`);
            this.setState({isDrawing:false});
            window.location.reload(true);
        }catch (e) {
            alert(`错误: 开奖失败! ${e}`);
            this.setState({isDrawing:false});
        }
    }
    Tuijiang = async() =>{
        console.log("点击退奖按钮!!!");
        this.setState({isDrawBacking:true})
        try{
            let accouts = await web3.eth.getAccounts();
            await lottery.methods.TuiJiang().send({
                from:accouts[0],
            })
            alert(`退奖成功！！！`);
            this.setState({isDrawBacking:false});
            window.location.reload(true);
        }catch (e) {
            alert(`Error: 退奖失败 failed! ${e}`);
            this.setState({isDrawBacking:false});
        }
    }


    render() {
        return (
            <div>
                <CardExampleCard
                    manager={this.state.manager}
                    round={this.state.round}
                    winner={this.state.winner}
                    balance={this.state.balance}
                    players={this.state.players}
                    playerCounts={this.state.playerCounts}
                    account={this.state.account}
                    play={this.play}
                    Tuijiang={this.Tuijiang}
                    Kaijiang={this.Kaijiang}
                    isPlaying={this.state.isPlaying}
                    isDrawing={this.state.isDrawing}
                    isDrawBacking={this.state.isDrawBacking}
                    isShowButton={this.state.isShowButton}
                />
            </div>
        );
    }
}

export default App;