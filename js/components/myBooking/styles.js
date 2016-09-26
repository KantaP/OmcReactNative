
'use strict';

var React = require('react-native');

var { StyleSheet , Dimensions } = React;
var width = Dimensions.get('window').width
module.exports = StyleSheet.create({
    spinner:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height
    },
    list:{
        flex: 1,
        paddingLeft: 0,
        paddingRight:20
    }
});
