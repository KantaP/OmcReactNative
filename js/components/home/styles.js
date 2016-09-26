
'use strict';

var React = require('react-native');

var { StyleSheet , Dimensions } = React;

var width = Dimensions.get('window').width


module.exports = StyleSheet.create({
    row: {
    	flex: 1, 
    	alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 15,
        alignItems: 'center'
    }
});
