
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#0F2145'
    },
    shadow: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'transparent'
    },
    bg: {
        flex: 1,
        marginTop: deviceHeight/2.65,
        backgroundColor: '#0F2145',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30,
        bottom: 0
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    btn: { 
        marginTop: 20,
        borderColor: '#fff'
    },
    footer: {
        position: 'absolute',
        bottom: 0
    },
    otherRow:{
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-around'
    },
    otherLink:{
        color: '#19498B'
    }
});
