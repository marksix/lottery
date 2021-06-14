import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {List,Grid, Rail, Segment, Card, Icon, Image, Statistic, Button, Label} from 'semantic-ui-react'



const CardExampleCard = (props) =>(
   <Card centered>
        <Image src='images/logo.jpg' wrapped ui={false} />
        <Card.Content>
            <Card.Header>区块链彩票</Card.Header>
            <Card.Meta>

  <List divided selection>
    <List.Item>
      <Label color='red' horizontal>
        管理地址:
      </Label>
      {props.manager}
    </List.Item>
    <List.Item>
      <Label color='purple' horizontal>
        账户地址:
      </Label>
     {props.account}
    </List.Item>
  </List>
            </Card.Meta>
            <Card.Description>
                每晚八点半准时开奖，不见不散！！！
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user' />
                {props.playerCounts}人参与
            </a>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Value>{props.balance}ETH</Statistic.Value>
                <Statistic.Label>奖金池</Statistic.Label>
            </Statistic>
        </Card.Content>

        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
            </Statistic>
        </Card.Content>

        <Button animated='fade' color='orange' onClick={props.play} loading={props.isPlaying}>
            <Button.Content visible>投注产生希望</Button.Content>
            <Button.Content visible>购买放飞梦想</Button.Content>
        </Button>

        <Button inverted color='red' style={{display:props.isShowButton}} onClick={props.Kaijiang} loading={props.isDrawing}>
            开奖
        </Button>
        <Button inverted color='green' style={{display:props.isShowButton}} onClick={props.Tuijiang} loading={props.isDrawBacking}>
            退奖
        </Button>
    </Card>
)

export default CardExampleCard