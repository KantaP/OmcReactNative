'use strict'
import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Title, Content, View , Text , Button , Footer , Input , Icon , InputGroup } from 'native-base'
import { Dimensions , TextInput } from 'react-native'
import { Grid, Col, Row } from 'react-native-easy-grid'
import { openDrawer , closeDrawer } from '../../actions/drawer'
import myTheme from '../../themes/base-theme'
import styles from './styles'


class Contact extends Component {
    constructor(props){
        super(props)
    }

    render(){ 
        var width = Dimensions.get('window').width
        var height = Dimensions.get('window').height
        return(
             <Container theme={myTheme} style={{backgroundColor: '#0F2145'}}>
                <Header style={{backgroundColor: '#021535'}}>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name='bars' />
                    </Button>
                    <Title>Contact</Title>
                </Header>
                <Content style={styles.mainContainer}>
                    <View style={styles.symbolBar}>
                        <Grid>
                            <Row>
                                <Col>
                                 <InputGroup style={styles.input} borderType="regular" >
                                    <Input placeholder="Subject"/>
                                </InputGroup> 
                                </Col>
                            </Row>
                            <Row style={styles.textAreaRow}>
                                <Col>
                                    <TextInput
                                        style={styles.textArea}
                                        multiline={true}
                                    />
                                </Col>
                            </Row>
                            <Button block 
                            style={{backgroundColor:'#1BBBCF'}}
                            textStyle={{color: '#fff', fontSize: 20}}>
                                SEND
                            </Button>
                        </Grid>
                    </View>
                </Content>
                <Footer style={{
                    height: 10
                }}>
                    <Grid>
                        <Row style={styles.fullRow}>
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
        closeDrawer: () => dispatch(closeDrawer())
    }
}


export default connect(null, bindAction)(Contact)