import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';


export default class Setting extends Component {

    constructor (props) {

        super(props);    

        this.state = {
            isVisitingTime: true,
        }
    }

    setChecked = (value) => {
        this.setState({checked: value});
    }

    render () {

        return (
            <LinearGradient colors={['#043030FF', '#6f6d6dFF', '#6f6d6dFF', '#043030FF']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}} >
                
                <View style={{ height: '80%', top:150}}>
                    
                    <View style={{flexDirection:'row', marginLeft:10, width: '95%', height:'40%'}}>

                        <Text style={{top: 35, marginLeft:30, marginRight:30, color:'white'}}>Discount by:</Text>
                        <DropDownPicker
                            items={[
                                {label: 'Visiting Times', value: 'vt'},
                                {label: 'Date of Birth', value: 'db'},
                                {label: 'Both', value: 'both'},
                            ]}
                            defaultIndex={0}
                            placeholder="Visting Times"
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
                                if (item.value !== "db") {
                                    this.setState({
                                        isVisitingTime: true,
                                    })
                                }
                                else {
                                    this.setState({
                                        isVisitingTime: false,
                                    })
                                }
                                console.log("aaa")
                            }}
                        />

                    </View>
                    <View  style={{ flexDirection:'row', width:'95%', height: 100, marginLeft:10, top:-70}}>
                        <Text style={{width: 80, marginLeft:30, marginRight:30, color:'white'}}>After:</Text>
                        <TextInput style={{backgroundColor:'white', height:'50%', width:'30%',
                                            top:-15, borderTopLeftRadius:5, borderBottomLeftRadius:5,  
                                            borderTopRightRadius: 5, borderBottomRightRadius:5,
                                            color:'#043030FF', textAlign:'center'}}
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    editable={this.state.isVisitingTime}>0</TextInput>
                        <Text style={{width: 80, marginLeft:30, marginRight:30, color:'white'}}>Times</Text>
                    </View>
                    <View style={{ flexDirection:'row', width:'95%', height: 100, marginLeft:10, top:-30}}>
                        <Text numberOfLines={2} style={{width: 80, marginLeft:30, marginRight:30, color:'white'}}>Discount Amount:</Text>
                        <DropDownPicker
                            items={[
                                {label: '$', value: 'item1'},
                                {label: '%', value: 'item2'},
                            ]}
                            defaultIndex={0}
                            placeholder="$"
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
                                console.log(item.label, item.value)
                            }
                        />
                        <TextInput style={{backgroundColor:'white', height:'50%', width:'37%',
                                            top:-10, borderTopRightRadius: 5, borderBottomRightRadius:5,
                                            color:'#043030FF',
                                            textAlign:"center"}}
                                    keyboardType="numeric"
                                    returnKeyType="done">0</TextInput>
                    </View> 

                    <View >
                        <Button buttonStyle={{backgroundColor:'#376363FF'}} title='Save' onPress={() => {console.log("Setting is clicked.")}} />
                    </View>
                    
                </View> 
     
            </LinearGradient>
        )
    }
}
