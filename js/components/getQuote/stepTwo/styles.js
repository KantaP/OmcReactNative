
'use strict';

var React = require('react-native');

var { StyleSheet , Dimensions } = React;
var width = Dimensions.get('window').width
module.exports = StyleSheet.create({
    symbolBar:{
        flex:1,
        flexDirection: 'row',
        marginTop: 15,
        marginHorizontal:30
    },
    fullRow:{
        width: width
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    btn: {
        borderRadius: 0
    },
    findButton:{
        backgroundColor: '#1BBBCF'
    },
    findText:{ color: '#fff' , marginRight: 5},
    errorInput:{
        marginBottom: 20,
        backgroundColor: '#fff',
        borderColor: 'red',
        borderWidth: 1
    }
});
