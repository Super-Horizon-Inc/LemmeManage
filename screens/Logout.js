import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import AuthService from '../services/AuthService.js';


export default class Logout extends Component {

    constructor (props) {
        
        super(props); 
        
        this.state = {
            text : "",
            message: ""
        }
    
    }
  
    done = async () => {
        
        const authService = new AuthService();
        const username = await authService.getCurrentUsername();
        let message = await authService.logout({username: username, password: this.state.text});
        if (message.indexOf('Logout successfully.') >= 0) {
            this.props.route.params.switchNavigation.navigate("AuthenticationScreen");
        }
        else {
            this.setState({
                message: message
            })
        }
    }

    cancel = () => {
        this.props.navigation.openDrawer();
    }

    
    render() {
        return (
            <LinearGradient colors={['#043030FF', '#6f6d6dFF', '#6f6d6dFF', '#043030FF']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}} >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:16, marginBottom:30}}>Please enter password to logout:</Text>
                    <Input containerStyle={{width: 200, color: 'white'}} labelStyle={{color: 'white'}}
                                            inputStyle={{color:'white'}} secureTextEntry={true}
                                            onChangeText={ text => { this.setState({text:text})} } 
                                            value={this.state.text}
                    />
                    <Text style = {{color: 'red'}}>{ this.state.message }</Text>
                    <View style={{flexDirection:'row', marginTop: 30}}>
                        <Button buttonStyle={{backgroundColor:'#376363FF'}} containerStyle={{width:'30%', marginHorizontal:10}} title='Done' onPress={() => this.done()} />
                        <Button buttonStyle={{backgroundColor:'#376363FF'}} containerStyle={{width:'30%', marginHorizontal:10}} title='Cancel' onPress={() => this.cancel()} />                    
                    </View>
                </View>
            </LinearGradient>
        );
    }
    
}
