import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import AuthService from '../services/AuthService.js';


export default class Logout extends Component {

    constructor (props) {
        super(props);
        new AuthService().logout();
           
    }

    yesLogout = () => {
        this.props.route.params.switchNavigation.navigate("AuthenticationScreen");
    }

    noLogout = () => {
        this.props.navigation.openDrawer();
    }

    
    render() {
        return (
            <LinearGradient colors={['#043030FF', '#6f6d6dFF', '#6f6d6dFF', '#043030FF']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}} >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:18}}>Do you want to logout?</Text>
                    <View style={{flexDirection:'row', marginTop: 30}}>
                        <Button buttonStyle={{backgroundColor:'#376363FF'}} containerStyle={{width:'30%', marginHorizontal:10}} title='Yes' onPress={() => this.yesLogout()} />
                        <Button buttonStyle={{backgroundColor:'#376363FF'}} containerStyle={{width:'30%', marginHorizontal:10}} title='No' onPress={() => this.noLogout()} />                    
                    </View>
                </View>
            </LinearGradient>
        );
    }
    
}
