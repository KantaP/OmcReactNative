
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions , PixelRatio} = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
   symbolBar:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
   },
   mainContainer: {
        marginTop: 15,
        marginHorizontal:30
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    textAreaRow:{
        marginTop: 10,
        backgroundColor: '#FFF',
        height: 200,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#c8c7cc',
        alignItems: 'flex-end',
        marginBottom: 10
    },
    textArea:{
        fontSize: 15,
        flex: 1,
        height:200,
        color: '#bbb'
    }   
});
