import React, {Component} from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ButtonGroup, Button } from 'react-native-elements';
import Logo from './Logo.js';
import Confirm from './Confirm.js';
//import ValidationComponent from 'react-native-form-validator';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        top: -110,
    },
    input: {
        width: '85%',
        left: '7%',
        color: 'white'
    },
    buttonContainer:{
        marginTop: '20%',
        width: '85%',
        position: 'absolute',
    }
});

export default class Home extends //ValidationComponent 
Component{

    constructor(props) {

        super(props);

        this.state = {
            isConfirmVisible: false,
            confirmText: "",
            userName: "",
            password: "",

        };

    };

    render () {
        return (
            <LinearGradient colors={['#043030FF', '#6f6d6dFF', '#6f6d6dFF', '#043030FF']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}} >
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} 
                    // keyboardVerticalOffset={
                    //     Platform.select({
                    //         ios: () => (150)
                    //     })()
                    // } 
                    style={styles.container}>           
                        <View style={styles.inner}>
                            <View style={{ height:0 }}>
                                <Confirm isVisible={this.state.isConfirmVisible} text={this.state.confirmText} />
                            </View>

                            <Logo />

                            <View>
                                <Input ref="user" containerStyle={styles.input} labelStyle={{color: 'white'}} label={"User Name"}
                                                placeholder={"Jon Doe"} inputStyle={{color:'white'}}
                                                leftIcon={<Icon name={"user"} size={24} color='white' />}
                                                onChangeText={ text => this.setState({userName: text}) } 
                                                value={this.state.userName}
                                                //errorMessage={this.isFieldInError('email') ? this.getErrorMessages() : ""} 
                                                />
                                <Input ref="password" containerStyle={styles.input} labelStyle={{color: 'white'}} label={"Password"}
                                                placeholder={"*******"} inputStyle={{color:'white'}} secureTextEntry={true}
                                                leftIcon={<Icon name={"lock"} size={26} color='white' />}
                                                onChangeText={ text => this.setState({password: text}) } 
                                                value={this.state.password}
                                                //errorMessage={this.isFieldInError('email') ? this.getErrorMessages() : ""} 
                                                />
                            </View>
                                
                            <View style={{alignItems:'center'}}>
                                <Button containerStyle={styles.buttonContainer} buttonStyle={{backgroundColor:'#376363FF'}} title="Lemme Manage" onPress={console.log("Lemme Manage")} />
                            </View>
                            
                        </View>                    
                </KeyboardAvoidingView>
            </LinearGradient>
        );
    }
}