import React from 'react';
import { KeyboardAvoidingView, StyleSheet, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ButtonGroup, Button } from 'react-native-elements';
import Logo from './Logo.js';
import Confirm from './Confirm.js';
import ValidationComponent from 'react-native-form-validator';
import { LinearGradient } from 'expo-linear-gradient';
import AuthService from '../services/AuthService.js';

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

    lemmeManage = async () => {

        this.validate({
            username: {email: true, required: true},
            password: {minlength:6, maxlength:40, required: true}
        })

        if(!this.isFieldInError("username") && !this.isFieldInError("password")) {

            try {
                this.setState({
                    isConfirmVisible: true,                    
                    confirmText: "\nLogging in ..."
                });

                let authService = new AuthService(this.state.username, this.state.password);
                
                let auth = this.state.selectedIndex == 0
                ? await authService.signin()
                : await authService.signup();
                
                if (auth.accessToken != null) {
                    this.props.navigation.navigate("DrawerNavigator", {customerList: auth.customers, discount: auth.discount, switchNavigation: this.props.navigation})
                }
                else {
                    this.setState({confirmText : "\nSomething went wrong.\n Please try again."});

                    setTimeout(() => {
                        this.setState({
                            isConfirmVisible: false,
                            username: "",
                            password: "",
                        });
                    }, 5000);
                }
            }
            catch(error) {
                this.setState({
                    isConfirmVisible: true,                    
                    confirmText: "Sorry! Something went wrong.",
                    username: "",
                    password: "",
                });
                setTimeout(() => {
                    this.setState({
                        isConfirmVisible: false, 
                        confirmText: "",
                    });
                }, 5000);
            }
        }
            
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
                                        errorMessage={this.isFieldInError('username') ? this.getErrorsInField('username')[0] : ""}
                                        />
                                <Input containerStyle={styles.input} labelStyle={{color: 'white'}} label={"Password"}
                                        placeholder={"*******"} inputStyle={{color:'white'}} secureTextEntry={true}
                                        leftIcon={<Icon name={"lock"} size={26} color='white' />}
                                        onChangeText={ text => this.setState({password: text}) } 
                                        value={this.state.password}
                                        errorMessage={this.isFieldInError('password') ? "The field \"password\" length must be greater than 6" : ""}
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