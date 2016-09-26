
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View , AsyncStorage } from 'react-native'
import { closeDrawer } from '../../actions/drawer'
import { replaceOrPushRoute , replaceRoute } from '../../actions/route'

import {Content, Text, List, ListItem , Thumbnail } from 'native-base'

import styles from './style'

class SideBar extends Component {

    navigateTo(route) {
        this.props.closeDrawer() 
        this.props.replaceOrPushRoute(route)
    }

    replaceRoute(route) {
        this.props.closeDrawer() 
        this.props.replaceRoute(route)
    }

    render(){ 
        return (
            <Content style={styles.sidebar} >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                    <Thumbnail square size={120} contain source={require('../../../images/logo.png')} />
                </View>
                <List foregroundColor={'white'}>
                    <ListItem onPress={() => this.navigateTo('getQuote')} >
                        <Text>Get Quote</Text>
                    </ListItem>
                    <ListItem onPress={() => this.navigateTo('myBooking')} >
                        <Text>View My Booking</Text>
                    </ListItem>
                    <ListItem onPress={() => this.navigateTo('myQuotes')} >
                        <Text>View My Quotes</Text>
                    </ListItem>
                    <ListItem onPress={() => this.navigateTo('blankPage')} >
                        <Text>My Profile</Text>
                    </ListItem>
                    <ListItem onPress={() => this.navigateTo('contact')} >
                        <Text>Contact</Text>
                    </ListItem>
                    <ListItem onPress={async () => {
                        await AsyncStorage.clear()
                        this.replaceRoute('login')
                    }} >
                        <Text>Log Out</Text>
                    </ListItem>
                </List>
            </Content>
        )
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(SideBar)
