import React , { Component } from 'react'
import { TouchableOpacity , View , Text } from 'react-native'
import { Content } from 'native-base'
import { Grid , Row , Col } from "react-native-easy-grid"
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MenuBox extends Component {
    
    propTypes: {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        boxColor: React.PropTypes.string,
        icon: React.PropTypes.string,
        text: React.PropTypes.string,
        iconColor: React.PropTypes.string,
        textColor: React.PropTypes.string,
        onPress: React.PropTypes.func
    }

    constructor(props){
        super(props)
    }

    render(){

        return(
            
            <View 
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10
            }}
            >
            <TouchableOpacity onPress = {this.props.onPress}>
                    <Content style={{
                        width: this.props.width,
                        height: this.props.height,
                        backgroundColor: this.props.boxColor
                    }}>
                        <Grid style={{
                                flex:1,
                                justifyContent: 'center',
                                alignItems: 'center'
                        }}>
                            <Row size={75} style={{
                                marginVertical:10
                            }} >
                            <Icon name={this.props.icon} style={{fontSize:72,color:this.props.iconColor}} />
                            </Row>
                            <Row size={25}>
                                <Col style={{
                                    alignSelf: 'center',
                                    padding:10
                                }}>
                                    <View
                                        style={{
                                            paddingRight: 10,
                                            paddingLeft: 10
                                        }}
                                    >
                                        <Text style={{
                                            fontSize:16,
                                            color:this.props.textColor||'#fff',
                                            textAlign:'center'
                                            
                                        }}>
                                            {this.props.text}
                                        </Text>
                                    </View>
                                </Col>
                            </Row>
                        </Grid>
                    </Content>
                </TouchableOpacity>
            </View>
        )
    }
}


