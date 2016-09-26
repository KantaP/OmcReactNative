
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dimensions , AsyncStorage , Alert } from 'react-native'
import { replaceOrPushRoute } from '../../actions/route'
import { closeDrawer , openDrawer } from '../../actions/drawer'
import MenuBox from '../menuBox'
import { Container, Header , Content, View, Text, Button, Icon , Thumbnail , Footer , Title} from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import myTheme from '../../themes/base-theme'
import styles from './styles'

class Home extends Component {

    navigateTo(route) {
        this.props.closeDrawer()
        this.props.replaceOrPushRoute(route)
    }

    render() {
        var width = Dimensions.get('window').width
        var height = Dimensions.get('window').height
        return (
            <Container theme={myTheme} style={{backgroundColor: '#0F2145'}}>
                <Header style={{backgroundColor: '#021535'}}>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name='bars' />
                    </Button>
                    <Title style={{alignSelf:'center'}}></Title>
                </Header>         
                <Content>
                    <Grid style={{marginTop: 5}}>
                        <Row size={30}>
                            <MenuBox 
                                width={width/2.5}
                                height={height/4}
                                boxColor={'#EC1F26'}
                                text={'GET QUOTE'}
                                icon={'bus'}
                                iconColor={'#fff'}
                                onPress={()=>{
                                    this.navigateTo('getQuote')
                                }}
                            />
                        </Row>
                        <Row size={30}>
                            <MenuBox 
                                width={width/2.5}
                                height={height/4}
                                boxColor={'#F9D622'}
                                text={'VIEW MY BOOKING'}
                                icon={'calendar-check-o'}
                                iconColor={'#fff'}
                                onPress={()=>{
                                    this.navigateTo('myBooking')
                                }}
                            />
                            <MenuBox 
                                width={width/2.5}
                                height={height/4}
                                boxColor={'#FFFFFF'} 
                                text={'VIEW MY QUOTES'}
                                icon={'search'}
                                textColor={'#000'}
                                iconColor={'#000'}
                                onPress={()=>{
                                    this.navigateTo('myQuotes')
                                }}
                            />
                        </Row>
                        <Row size={30}>
                            <MenuBox 
                                width={width/2.5}
                                height={height/4}
                                boxColor={'#1BBDCC'}
                                text={'MY PROFILE'}
                                icon={'user'}
                                iconColor={'#fff'}
                            />
                        </Row>
                    </Grid>
                </Content>
                <Footer style={{
                    height: 10
                }}>
                    <Grid>
                        <Row style={{width:width}}>
                            <Col style={{backgroundColor:myTheme.footerHilightBarColors[0],height:10}}></Col>
                            <Col style={{backgroundColor:myTheme.footerHilightBarColors[1],height:10}}></Col>
                            <Col style={{backgroundColor:myTheme.footerHilightBarColors[2],height:10}}></Col>
                            <Col style={{backgroundColor:myTheme.footerHilightBarColors[3],height:10}}></Col>
                        </Row>
                    </Grid>
                </Footer>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute: (route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(Home)
