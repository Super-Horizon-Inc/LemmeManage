import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import UserService from '../services/UserService.js';
import ConfirmSetting from './ConfirmSetting.js';


export default class Setting extends Component {

    constructor (props) {

        super(props);    

        const currentDiscount = this.props.route.params.discount;

        this.state = {
            isVisitingTime: true,
            discount: {by:currentDiscount.by, type:currentDiscount.type, amount:currentDiscount.amount, visitTimes:currentDiscount.visitTimes},
            isSettingVisible: false,
            settingText:"",
        }
    }

    setChecked = (value) => {
        this.setState({checked: value});
    }

    byPlaceholder = () => {
        switch(parseInt(this.state.discount.by)) {
            case 0: return 'Visiting Times'; break;
            case 1: return 'Date of Birth'; break;
            case 2: return 'Both'; break;
        }
    }

    showConfirmSetting = () =>  {
        this.setState({isSettingVisible: true});
    }

    hideConfirmSetting = () =>  {
        this.setState({
            isSettingVisible: false,
            settingText: ""
        });
    }

    saveSetting = async (password) => {
        //this.hideConfirmSetting();
        const message = await new UserService().storeSetting(this.state.discount, password);
        
        this.setState({
            isSettingVisible: true,
            settingText: message
        })

        if (message.indexOf('Setting saved successfully.') >= 0) {
        
            setTimeout(() => {
                this.setState({
                    isSettingVisible: false,
                    settingText: ""
                });
            }, 3000);
        }

    }


    render () {

        return (
            <LinearGradient colors={['#043030FF', '#6f6d6dFF', '#6f6d6dFF', '#043030FF']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}} >
                
                <View style={{ height: '80%', top:150}}>
                    
                    <View style={{flexDirection:'row', marginLeft:10, width: '95%', height:'40%'}}>

                        <View style={{ height:0 }}>
                            <ConfirmSetting isVisible={this.state.isSettingVisible} text={this.state.settingText} done={this.saveSetting} cancel={this.hideConfirmSetting} />
                        </View>

                        <Text style={{top: 35, marginLeft:30, marginRight:30, color:'white'}}>Discount by:</Text>
                        <DropDownPicker
                            items={[
                                {label: 'Visiting Times', value: 0},
                                {label: 'Date of Birth', value: 1},
                                {label: 'Both', value: 2}
                            ]}
                            defaultIndex={parseInt(this.state.discount.by)}
                            placeholder={this.byPlaceholder()}
                            
                            dropDownMaxHeight={150}
                            style={{marginTop:20}}
                            dropDownStyle={{marginTop:20}}                   
                            containerStyle={{width: '50%', height: '25%'}}
                            itemStyle={{justifyContent: 'flex-start', color:'#043030FF'}}
                            labelStyle={{fontSize: 14, textAlign: 'left', color: '#043030FF'}}
                            placeholderStyle={{justifyContent: 'flex-start'}}                   
                            arrowStyle={{marginRight: 10}}
                            arrowSize={22}
                            arrowColor={'#043030FF'}
                            onChangeItem={item => {
                                if (item.value !== 1) {
                                    this.setState({
                                        isVisitingTime: true,
                                    })
                                }
                                else {
                                    this.setState({
                                        isVisitingTime: false,
                                    })
                                }
                                this.setState({
                                    discount: {by: item.value, type: this.state.discount.type, amount: this.state.discount.amount, visitTimes: this.state.discount.visitTimes}
                                })
                            }}
                        />

                    </View>
                    <View  style={{ flexDirection:'row', width:'95%', height: 100, marginLeft:10, top:-70}}>
                        <Text style={{width: 80, marginLeft:30, marginRight:30, color:'white'}}>After:</Text>
                        <TextInput style={{backgroundColor:'white', height:'50%', width:'30%',
                                            top:-15, borderTopLeftRadius:5, borderBottomLeftRadius:5,  
                                            borderTopRightRadius: 5, borderBottomRightRadius:5,
                                            color:'#043030FF', textAlign:'center'}}
                                    value={this.state.discount.visitTimes.toString()}
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    editable={this.state.isVisitingTime}
                                    onChangeText={
                                        (value) => {
                                            this.setState({
                                                discount: {by: this.state.discount.by, type: this.state.discount.type, amount: this.state.discount.amount, visitTimes: value}
                                            })
                                        }
                                    }
                        ></TextInput>
                        <Text style={{width: 80, marginLeft:30, marginRight:30, color:'white'}}>Times</Text>
                    </View>
                    <View style={{ flexDirection:'row', width:'95%', height: 100, marginLeft:10, top:-30}}>
                        <Text numberOfLines={2} style={{width: 80, marginLeft:30, marginRight:30, color:'white'}}>Discount Amount:</Text>
                        <DropDownPicker
                            items={[
                                {label: '$', value: 0},
                                {label: '%', value: 1},
                            ]}
                            defaultIndex={this.state.discount.type}
                            placeholder={this.state.discount.type == 0 ? "$" : "%"}
                            dropDownMaxHeight={150}
                            style={{borderTopRightRadius: 0, borderBottomRightRadius: 0, marginRight:2,
                                    marginTop:-10}}
                            dropDownStyle={{borderTopRightRadius: 0, borderBottomRightRadius: 0,
                                                marginTop:-10, marginRight:2, width:'96%'}}
                            containerStyle={{width: '13%', height: '40%'}}
                            itemStyle={{justifyContent: 'flex-start', color:'#043030FF'}}
                            labelStyle={{fontSize: 14, textAlign: 'left', color: '#043030FF'}}
                            placeholderStyle={{justifyContent: 'flex-start'}}                  
                            showArrow={false}
                            onChangeItem={item => 
                                this.setState({
                                    discount: {by: this.state.discount.by, type: item.value, amount: this.state.discount.amount, visitTimes: this.state.discount.visitTimes}
                                })
                            }
                        />
                        <TextInput style={{backgroundColor:'white', height:'50%', width:'37%',
                                            top:-10, borderTopRightRadius: 5, borderBottomRightRadius:5,
                                            color:'#043030FF',
                                            textAlign:"center"}}
                                    value={this.state.discount.amount.toString()}
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    onChangeText={
                                        (value) => {
                                            this.setState({
                                                discount: {by: this.state.discount.by, type: this.state.discount.type, amount: value, visitTimes: this.state.discount.visitTimes}
                                            })
                                        }
                                    }
                        ></TextInput>
                    </View> 

                    <View >
                        <Button buttonStyle={{backgroundColor:'#376363FF'}} containerStyle={{width:'60%', alignSelf: 'center'}} title='Save' onPress={() => this.showConfirmSetting()} />
                    </View>
                    
                </View> 
     
            </LinearGradient>
        )
    }
}
