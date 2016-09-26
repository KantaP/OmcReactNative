'use strict'
import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Title, Content, View , Text , Button , Footer , Input , Icon , InputGroup } from 'native-base'
import { Dimensions , Modal , TouchableHighlight , Alert , DatePickerAndroid , TimePickerAndroid } from 'react-native'
import MapView from 'react-native-maps';
import { Grid, Col, Row } from 'react-native-easy-grid'
import { pushNewRoute } from '../../actions/route'
import { openDrawer , closeDrawer } from '../../actions/drawer'
import { setQuoteFormPartOne } from '../../actions/job'
import { openModal , closeModal , categoryModal } from '../../actions/modal'
import myTheme from '../../themes/base-theme'
import styles from './styles'
import * as Config from '../../config'
import * as Services from '../../services'
import moment from 'moment'


class GetQuote extends Component {
    constructor(props){
        super(props)
        this.state = {
            region : {...Config.region},
            placeName: '',
            refTarget: null,
            id: 0 ,
            reference: null,
            collection: {
                value: null,
                region: {}
            },
            extra: [],
            destination: {
                value: null,
                region: {}
            },
            pickup: '',
            return: ''
        }
    }

    _setMapRegion(region){
        let newState = {}
        this.setState({ region })
    }

    async geolocationService(){
        try{
            let response = await Services._geolocationService(this.state.region)
            this.setState({ placeName : response.results[0].formatted_address})
            let newState = {}
            newState[this.state.refTarget] = {
                value:response.results[0].formatted_address,
                region: this.state.region
            }
            this.setState(newState)
        }catch(error){
            this.setState({ placeName : 'not found'})
        }
    }

    _setModalVisible(visible,ref){
        if(!visible){
            this.props.closeModal()
        }else{
            this.props.openModal()
            this.props.categoryModal('googlemap')
            this.setState({refTarget:ref})
        }
    }

    navigateTo(route) {
        this.props.closeDrawer() 
        this.props.pushNewRoute(route)
    }

    _setQuoteFormPartOne(){
        this.props.setQuoteFormPartOne(this.state)
        this.navigateTo('getQuoteStepTwo')
    }

    async showPicker(key,options){
        try {
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dateSetAction) {
                let date = new Date(year, month, day);
                let newState = {}
                newState[key] = moment(date.toLocaleDateString(),'MM/DD/YYYY').format('DD-MM-YYYY')
                this.setState(newState)
                this.showTimePicker(key,{is24Hour:true})
            }
        } catch ({code, message}) {
            console.warn(`Error in '${key}': `, message);
        }
    }

    async showTimePicker(key,options){
        try {
            const {action, minute, hour} = await TimePickerAndroid.open(options);
            var newState = {};
            if (action === TimePickerAndroid.timeSetAction) {
                newState[key] = `${this.state[key]} ${this._formatTime(hour, minute)}`
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in '${key}': `, message);
        }
    }

    _formatTime(hour, minute) {
        return hour + ':' + (minute < 10 ? '0' + minute : minute);
    }

    render(){ 
        return(
             <Container theme={myTheme} style={{backgroundColor: '#0F2145'}}>
                <Header style={{backgroundColor: '#021535'}}>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name='bars' />
                    </Button>
                    <Title>Quote Form</Title>
                </Header>
                <Content>
                    <View style={styles.symbolBar}>
                        <Grid>
                            <Row>
                                <Col>
                                    <InputGroup style={styles.input} borderType="regular" >
                                        <Input 
                                        placeholder="Your Reference"
                                        onChangeText={(value) => {
                                            this.state.reference = value
                                        }}
                                        />
                                    </InputGroup> 
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <InputGroup style={styles.input} borderType="regular" >
                                        <Input 
                                        placeholder="Pickup Date" 
                                        value={this.state.pickup}
                                        onFocus={()=>{
                                            this.showPicker('pickup',{
                                                minDate: new Date()
                                            })
                                        }}
                                        />
                                    </InputGroup> 
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <InputGroup style={styles.input} borderType="regular" >
                                        <Input placeholder="Return Date"
                                        value={this.state.return}
                                        onFocus={()=>{
                                            this.showPicker('return',{
                                                minDate: new Date()
                                            })
                                        }}/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col size={3}>
                                    <InputGroup style={styles.input} borderType="regular" >
                                        <Input placeholder="collection Address" value={this.state.collection.value} />
                                    </InputGroup>
                                </Col>
                                <Col size={1} style={{marginLeft: 20}}>
                                    <Button block style={styles.findButton} textStyle={{color: '#fff'}} onPress={()=>this._setModalVisible(true,'collection')}>
                                        <Icon name="map-marker"  style={{
                                            color: '#FFF'
                                        }} />
                                        <Text>Find</Text>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col size={4}>
                                    <Button block textStyle={{color: '#fff'}} style={styles.findButton} onPress={()=>this._setModalVisible(true,'extra')} >
                                        <Icon name="map-marker"  style={{
                                            color: '#FFF'
                                        }} />
                                        <Text>Extra Drop</Text>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col size={3}>
                                    <InputGroup style={styles.input} borderType="regular" >
                                        <Input placeholder="Destination Address" value={this.state.destination.value} />
                                    </InputGroup>
                                </Col>
                                <Col size={1} style={{marginLeft: 20}}>
                                    <Button block style={styles.findButton} textStyle={{color: '#fff'}} onPress={()=>this._setModalVisible(true,'destination')} >
                                        <Icon name="map-marker"  style={{
                                            color: '#FFF'
                                        }} />
                                        <Text>Find</Text>
                                    </Button>
                                </Col>
                            </Row>
                            <Button block 
                            style={{backgroundColor:'#1BBBCF'}}
                            textStyle={{color: '#fff', fontSize: 20}}
                            onPress={()=>this._setQuoteFormPartOne()}>
                                NEXT
                            </Button>
                        </Grid>
                    </View>
                    <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={(this.props.modalState.category === 'googlemap')?this.props.modalState.status:false}
                        onRequestClose={() => {this._setModalVisible(false)}}
                    >
                        <View>
                            <View style={styles.mapContainer}>
                                <MapView 
                                    style={styles.map} 
                                    initialRegion={this.state.region} 
                                    onRegionChange={(region)=>this._setMapRegion(region)}
                                    onRegionChangeComplete={()=>this.geolocationService()}
                                    >
                                    <MapView.Marker 
                                        coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}
                                    />
                                    
                                </MapView>
                            </View>
                            <Button block onPress={()=>this._setModalVisible(false)}>DONE</Button>
                            <View style={{
                                backgroundColor:'#fff',
                                padding:10
                            }}>
                                <Text style={{ textAlign: 'center', fontWeight:'bold', color:'#000' }}>
                                    {`${this.state.placeName}`}
                                </Text>
                            </View>
                        </View>
                    </Modal>
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
        pushNewRoute: (route)=> dispatch(pushNewRoute(route)),
        closeDrawer: () => dispatch(closeDrawer()),
        openModal: () => dispatch(openModal()),
        closeModal: () => dispatch(closeModal()),
        categoryModal: (category) => dispatch(categoryModal(category)),
        setQuoteFormPartOne: (data) => dispatch(setQuoteFormPartOne(data))
    }
}

function mapStateToProps(state) {
    return {
        modalState : state.modal.modalState,
        userState: state.user.userState
    }
}

export default connect(mapStateToProps, bindAction)(GetQuote)