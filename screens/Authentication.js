import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ButtonGroup, Button } from 'react-native-elements';
import Logo from './Logo.js';
import Confirm from './Confirm.js';
import ValidationComponent from 'react-native-form-validator';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        marginTop: 50,
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

export default class Authentication extends ValidationComponent {

    constructor(props) {

        super(props);

        this.state = {
            selectedIndex: 0,
            isConfirmVisible: false,
            confirmText: "",
            username: "",
            password: "",
            buttonText: "Sign In",
        };

    };

    updateIndex = (selectedIndex) =>  {

        this.setState({selectedIndex});

        if(selectedIndex == 0) {

            this.setState({ 
                buttonText: "Sign In"
            });

        }
        else 
        {

            this.setState({ 
                buttonText: "Sign Up"
            });

        }

    };

    lemmeManage = () => {

        const url = this.state.selectedIndex == 0 ? "https://b50ef533728c.ngrok.io/lemme/user/signin" : "https://b50ef533728c.ngrok.io/lemme/user/signup";

        fetch(url, {
                method: 'POST',
                headers: {
                    Accept : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({username:this.state.username, password:this.state.password})
                })
                .then(response => 
                    response.json()            
                )
                .then(json => {
                    
                    this.props.navigation.navigate("DrawerNavigator", {customerList: json.customers});

                })
                .catch(error => {                   
                    console.error(error);
                });

    }


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
                            <View>
                                <ButtonGroup onPress={this.updateIndex} selectedIndex={this.state.selectedIndex} selectedButtonStyle={{backgroundColor:'#376363FF', color: 'white'}}  buttons={["Sign In", "Sign Up"]} containerStyle={{height: 100, borderColor: '#6f6d6dFF'}} />
                            
                                <Input containerStyle={[styles.input, {marginTop:20}]} labelStyle={{color: 'white'}} label={"Username"}
                                        placeholder={"John Doe"} inputStyle={{color:'white'}}
                                        leftIcon={<Icon name={"user"} size={24} color='white' />}
                                        onChangeText={ text => this.setState({username: text}) } 
                                        value={this.state.username}
                                        //errorMessage={this.isFieldInError('email') ? this.getErrorMessages() : ""} 
                                        />
                                <Input containerStyle={styles.input} labelStyle={{color: 'white'}} label={"Password"}
                                        placeholder={"*******"} inputStyle={{color:'white'}} secureTextEntry={true}
                                        leftIcon={<Icon name={"lock"} size={26} color='white' />}
                                        onChangeText={ text => this.setState({password: text}) } 
                                        value={this.state.password}
                                        //errorMessage={this.isFieldInError('email') ? this.getErrorMessages() : ""} 
                                        />
                            </View>
                                
                            <View style={{alignItems:'center'}}>
                                <Button containerStyle={styles.buttonContainer} buttonStyle={{backgroundColor:'#376363FF'}} title={this.state.buttonText} onPress={this.lemmeManage} />
                            </View>
                        </View>
                        
                    </View>                    
                </KeyboardAvoidingView>
            </LinearGradient>
        );
    }
}