import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dimensions , TouchableOpacity , Alert , RefreshControl , ListView } from 'react-native'
import { openDrawer , closeDrawer } from '../../actions/drawer'
import { pushNewRoute } from '../../actions/route'
import { setJobId , fetchMyQuotesRequest , fetchMyQuotesError , fetchMyQuotesSuccess } from '../../actions/job'
import { Container, Header , Content, View, Text, Title ,Button, Icon , Thumbnail , Footer , List, ListItem  , Spinner} from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import myTheme from '../../themes/base-theme'
import styles from './styles'
import moment from 'moment'
import { loading , loaded } from '../../actions/loading'
import * as Config from '../../config'

class MyQuotes extends Component {
    constructor(props){
        super(props)
        this._getMyQuotes()
    }       

    navigateTo(route) {
        this.props.closeDrawer() 
        this.props.pushNewRoute(route)
    }

    _goToStepTwo(jobId){
        this.props.setJobId(jobId)
        this.navigateTo('myQuotesStepTwo')
    }

    _preRenderSuccess(){
        this.setState({preRender:true})
    }

    _onRefresh() {
        this.setState({refreshing:true})
        setTimeout(()=>{
            this.setState({refreshing:false})
        })
    }

    _getMyQuotes(){
        setTimeout(async ()=>{
            
            this.props.fetchMyQuotesRequest() 
            this.props.loading()
            let options = {
                method: 'GET',
                headers: {  
                    "cache-control": "no-cache",
                    "x-access-key" : Config.apiKey[Config.api],
                    "x-access-token": this.props.userState.token
                }
            }
            let response = await fetch(`http://${Config.apiServer[Config.server]}/api/omc/job/getMyQuotes/${this.props.jobState.fetchMyQuotes.page}`, options)
            let responseJson = await response.json()
            let responseStatus = await response.status
            if(responseStatus === 200){
            
                this.props.fetchMyQuotesSuccess(responseJson.results)
            }else if(responseStatus === 404){
                this.props.fetchMyQuotesError(responseJson.text)
            }
            this.props.loaded()
        },1500)
    }

    _renderRow(rowData){
        return (
            <ListItem onPress={()=>this._goToStepTwo(rowData.quote_id)}>
                <View>
                    <Text textStyle={{color:'#fff'}}>{rowData.quote_id}</Text>
                    <Text numberOfLines={1}>{rowData.col_address}</Text>
                    <Text>{moment(rowData.date_out).format('ddd Do MMM YY HH:mm')}</Text>
                    <Text>{moment(rowData.date_back).format('ddd Do MMM YY HH:mm')}</Text>
                    <Text>{`${rowData.pax} PAX`}</Text>
                </View>
            </ListItem> 
        )
    }

    _checkLoading(){
        
        if(this.props.load){
            return (
                <View style={styles.spinner}>
                    <Spinner color={myTheme.defaultSpinnerColor} />
                </View>
            )
        }else{
            return (
                <View
                    style={styles.list}
                >
                    <List 
                        dataArray={this.props.jobState.fetchMyQuotes.data}
                        renderRow={this._renderRow.bind(this)}
                    >
                    </List>
                </View>
            )
        }
    }

    render(){
        return(
             <Container theme={myTheme} style={{backgroundColor: '#0F2145'}}>
                <Header style={{backgroundColor: '#021535'}}>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name='bars' />
                    </Button>
                    <Title>View My Quotes</Title>
                </Header>
                <Content>
                    { this._checkLoading() }
                </Content>
                <Footer style={{
                    height: 10
                }}>
                    <Grid>
                        <Row>
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
        openDrawer: () => dispatch(openDrawer()),
        pushNewRoute: (route) => dispatch(pushNewRoute(route)),
        closeDrawer: () => dispatch(closeDrawer()),
        loading:()=>dispatch(loading()),
        loaded:()=>dispatch(loaded()),
        setJobId:(jobId)=>dispatch(setJobId(jobId)),
        fetchMyQuotesRequest:()=>dispatch(fetchMyQuotesRequest()),
        fetchMyQuotesError: (error) => dispatch(fetchMyQuotesError(error)),
        fetchMyQuotesSuccess: (data) => dispatch(fetchMyQuotesSuccess(data))
    }
}

function mapStateToProps(state){
    return {
        drawer: state.drawer.drawerState,
        load: state.load.loadingState,
        userState: state.user.userState,
        jobState: state.job.jobState
    }
}

export default connect(mapStateToProps, bindAction)(MyQuotes)