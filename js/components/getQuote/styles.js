
'use strict';

var React = require('react-native');

var { StyleSheet , Dimensions } = React;
var width = Dimensions.get('window').width
var height = Dimensions.get('window').height
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
        backgroundColor: '#fff'
    },
    btn: {
        borderRadius: 0
    },
    findButton:{
        backgroundColor: '#1BBBCF'
    },
    findText:{ color: '#fff' , marginRight: 5},
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
     bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    }
});
