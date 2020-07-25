import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';


export default class Home extends Component {
 
    constructor (props) {
        super(props);    
    }

    render () {

        return (
            <LinearGradient colors={['#043030FF', '#6f6d6dFF', '#6f6d6dFF', '#043030FF']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}} >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Button buttonStyle={{backgroundColor:'#376363FF'}} title='Home' onPress={() => {console.log("Home is clicked.")}} />
                </View>
            </LinearGradient>
        )
    }
}