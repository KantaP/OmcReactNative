
'use strict';

var React = require('react-native');

var { StyleSheet , Dimensions } = React;
var width = Dimensions.get('window').width
var height = Dimensions.get('window').height
module.exports = StyleSheet.create({
    mainContainer: {
        marginTop: 15,
        marginHorizontal:30
    },
    symbolBar:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    row:{
        backgroundColor:'#1A2D4E',
        padding:10
    },
    rowAlternate:{
        padding: 10
    },
    viewDetail:{
        borderWidth : 1,
        borderColor: '#475771',
        marginBottom: 10
    },
    viewButton:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 30
    },
    viewCustomerNote:{
      
    },
    spinner:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: height
    },
    viewMapButton:{
        flex: 1,
        marginTop: 30
    },
    mapConainer:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height
    },
});
