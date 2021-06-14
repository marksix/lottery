import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {List, Container, Card, Icon, Image, Statistic, Button, Label} from 'semantic-ui-react'



const ContainerExampleContainer = (props) =>(
<Container>

        <Image src='images/logo.jpg' wrapped ui={false}/>
        <Card.Content>

        <Card.Description>
            每晚八点半准时开奖，不见不散！！！
        </Card.Description>
<ul/>
            <Card.Header><h3>区块链彩票</h3></Card.Header>

            <Card.Meta>
		<List divided selection>
    		<List.Item>
      		<Label color='orange' horizontal>
       		 管理地址:
      		</Label>
                		<Label color='olive' horizontal>
      		{props.manager}
                		</Label>
    		</List.Item>
    		<List.Item>
      		<Label color='purple' horizontal>
        		账户地址:
      		</Label>
                          	<Label color='violet' horizontal>
     		{props.account}
                        		</Label>
    		</List.Item>
  		</List>
            </Card.Meta>


        </Card.Content>


        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Label>奖金池</Statistic.Label>
                <Statistic.Value>{props.balance}ETH</Statistic.Value>
            </Statistic>
        </Card.Content>
<ul/>
        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
            </Statistic>
        </Card.Content>
<ul/>
        <Card.Content extra>
            <a>
                <Icon name='user' />
                {props.playerCounts}人参与
            </a>
        </Card.Content>
<ul/>
        <Button animated='fade' color='orange' onClick={props.play} loading={props.isPlaying}>
            <Button.Content visible>投注产生希望</Button.Content>

        </Button>
<ul/>
        <Button inverted color='red' style={{display:props.isShowButton}} onClick={props.Kaijiang} loading={props.isDrawing}>
            开奖
        </Button>

        <Button inverted color='green' style={{display:props.isShowButton}} onClick={props.Tuijiang} loading={props.isDrawBacking}>
            退奖
        </Button>

</Container>
)

export default ContainerExampleContainer
