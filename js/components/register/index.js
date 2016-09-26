import React, { Component } from 'react';
import { DeviceEventEmitter, Dimensions, Image , Text , Alert  } from 'react-native';
import { connect } from 'react-redux';

import { replaceRoute } from '../../actions/route';
import { loading , loaded } from '../../actions/loading'

import { Container, Content, InputGroup, Input, Button, Icon, View , Footer , Spinner} from 'native-base';
import { Grid , Row , Col } from "react-native-easy-grid";
import myTheme from '../../themes/base-theme';
import styles from './styles';
import * as Config from '../../config'

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            _f :'',
            _e : '',
            _ph : '',
            _p : ''
        }
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    _checkLoading(){
        
        if(this.props.load){
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
                        <InputGroup style={styles.input} borderType="regular">
                            <Icon name='phone' iconSet={'FontAwesome'} style={{color:'#bbb'}} />
                            <Input 
                                placeholder='Phone Number' 
                                value={this.state._ph}
                                onChangeText={(_ph) => this.setState({_ph})}
                            />
                        </InputGroup>
                        <InputGroup style={styles.input} borderType="regular">
                            <Icon name='user' iconSet={'FontAwesome'} style={{color:'#bbb'}} />
                            <Input 
                                placeholder='Full Name' 
                                value={this.state._f}
                                onChangeText={(_f) => this.setState({_f})}
                            />
                        </InputGroup>
                        <InputGroup style={styles.input} borderType="regular"> 
                            <Icon name='envelope' style={{color:'#bbb'}} />
                            <Input 
                                placeholder='Email' 
                                value={this.state._e}
                                onChangeText={(_e) => this.setState({_e})}
                            />
                        </InputGroup>
                        <InputGroup style={styles.input} borderType="regular">
                            <Icon name='lock' style={{color:'#bbb'}}  /> 
                            <Input
                                placeholder='Password'
                                secureTextEntry={true}
                                value={this.state._p}
                                onChangeText={(_p) => this.setState({_p})}
                            />
                        </InputGroup>
                        <Button  bordered style={styles.btn} textStyle={{color: '#fff'}} onPress={() => this._register()} block>
                            Register
                        </Button>
                    </View>
                </Image>
            )
        }
    }

    async _register() {
        this.props.loading()
        let options = {
            method: 'POST',
            headers: {  
                // "Content-type": "application/x-www-form-urlencoded charset=UTF-8" ,
                'Accept'      : 'application/json',
                'Content-Type': 'application/json',
                "x-access-key" : Config.apiKey[Config.api]
            },
            // body: `_u=${this.state.username}&_p=${this.state.password}`
            body: JSON.stringify({
                _f: this.state._f ,
                _ph: this.state._ph,
                _e: this.state._e,
                _p: this.state._p
            })
        }
        let response = await fetch(`http://${Config.apiServer[Config.server]}/api/omc/register`, options)
        let responseJson = await response.json()
        let responseStatus = await response.status
        this.props.loaded()
        Alert.alert(
            '',
            `${responseJson.text}`
        )
        if(responseStatus === 200){
            this.replaceRoute('login')
        }
    }

    render(){
         return (
            <Container theme={myTheme}>
                <View style={styles.container}>
                    <Content>
                        { this._checkLoading() }
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

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        loading:()=>dispatch(loading()),
        loaded:()=>dispatch(loaded())
    }
}

function mapStateToProps(state) {
    return {
        load : state.load.loadingState
    }
}

export default connect(mapStateToProps , bindAction)(Register) 
