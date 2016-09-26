
'use strict'

import React, { Component } from 'react'
import { DeviceEventEmitter, Dimensions, Image , Text , TouchableOpacity , Alert , AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import { replaceRoute } from '../../actions/route'
import { setUserToken } from '../../actions/user'
import { loading , loaded } from '../../actions/loading'

import { Container, Content, InputGroup, Input, Button, Icon, View , Footer , Spinner  } from 'native-base'
import { Grid , Row , Col } from "react-native-easy-grid"
import myTheme from '../../themes/base-theme'
import styles from './styles'
import * as Config from '../../config'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            preRender: false
        }
        
    }

    componentDidMount(){
        this.checkToken()
    }

    _preRenderSuccess(){
        this.setState({preRender:true})
    }


    async checkToken () {
        let token = await AsyncStorage.getItem('@user:token')
        let navigator = this.props.navigator;
        if(token !== null){
            let options = {
                method: 'POST',
                headers: {  
                    "cache-control": "no-cache",
                    "x-access-key" : Config.apiKey[Config.api],
                    "x-access-token": token
                }
            }
            let response = await fetch(`http://${Config.apiServer[Config.server]}/api/omc/checkToken`, options)
            console.log(response)
            let responseJson = await response.json()
            if(responseJson.token){
                this.props.setUserToken(token)
                navigator.replace({
                    id: 'home',
                });
            }else{
                setTimeout( () => this._preRenderSuccess() , 1000)
            }
        }else{
            setTimeout( () => this._preRenderSuccess() , 1000)
        }
        
    }

    replaceRoute(route) {
        this.props.replaceRoute(route)
    }

    _checkLoading(){
        
        if(this.props.load || !this.state.preRender){
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: Dimensions.get('window').height
                }}>
                    <Spinner color={myTheme.defaultSpinnerColor} />
                </View>
            )
        }else{
            return (
                <Image source={require('../../../images/shadow.png')} style={styles.shadow}>
                    <View style={styles.bg}>
                        <InputGroup style={styles.input} textColor="#bbb" borderType="regular">
                            <Icon name='user' style={{color:'#bbb'}} />
                            <Input 
                                placeholder='EMAIL' 
                                value={this.state.username}
                                onChangeText={(username) => this.setState({username})}
                            />
                        </InputGroup>
                        <InputGroup style={styles.input} textColor="red" borderType="regular">
                            <Icon name='lock' style={{color:'#bbb'}}  />
                            <Input
                                placeholder='PASSWORD'
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={(password) => this.setState({password})}
                            />
                        </InputGroup>
                        <Button  bordered style={styles.btn} textStyle={{color: '#fff'}} onPress={() => this._signIn()} block>
                            LOGIN
                        </Button>
                        <Row style={{marginVertical: 25}}>
                            <View style={styles.otherRow}>
                                <View style={{alignSelf:'center'}}>
                                    <TouchableOpacity onPress={() => this.replaceRoute('register')}><Text style={styles.otherLink}>Register</Text></TouchableOpacity>
                                </View>
                                <View style={{alignSelf:'center'}}>
                                    <TouchableOpacity><Text style={styles.otherLink}>Forgot Password</Text></TouchableOpacity>
                                </View>
                            </View>
                        </Row>
                    </View>
                </Image>
            )
        }
    }

    async _signIn() {
        this.props.loading()
        let options = {
            method: 'POST',
            headers: {  
                'Accept'      : 'application/json',
                'Content-Type': 'application/json',
                "x-access-key" : Config.apiKey[Config.api]
            },
            body: JSON.stringify({_u: this.state.username , _p: this.state.password })
        }
        let response = await fetch(`http://${Config.apiServer[Config.server]}/api/omc/authenticate`, options)
        let responseJson = await response.json()
        let responseStatus = await response.status
        this.props.loaded()
        if(responseStatus === 200){
            this.props.setUserToken(responseJson.token)
            this.replaceRoute('home')
            await AsyncStorage.setItem('@user:token', responseJson.token)
        }else if(responseStatus === 404){
            Alert.alert(
                '',
                `${responseJson.text}`
            )
        }
    }

    render() {
        return (
            <Container theme={myTheme}>
                <View style={styles.container}>
                    <Content>
                        {
                            this._checkLoading()
                        }
                    </Content>
                    <Footer style={{
                        height: 10
                    }}>
                        <Grid>
                            <Row>
                                <Col style={{backgroundColor:myTheme.footerHilightBarColors[0],height:10}}></Col>
                                <Col style={{backgroundColor:myTheme.footerHilightBarColors[1],height:10}}></Col>
                                <Col style={{backgroundColor:myTheme.footerHilightBarColors[2],height:10}}></Col>
                                <Col style={{backgroundColor:myTheme.footerHilightBarColors[3],height:10}}></Col>
                            </Row>
                        </Grid>
                    </Footer>
                </View>
                
            </Container>
        )
    }
}

function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        setUserToken:(token)=>dispatch(setUserToken(token)),
        loading:()=>dispatch(loading()),
        loaded:()=>dispatch(loaded())
    }
}

function mapStateToProps(state) {
    return {
        load : state.load.loadingState
    }
}

export default connect(mapStateToProps, bindActions)(Login)
