import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Home from './Home.js';
import CustomerList from './CustomerList.js';
import Setting from './Setting.js';
import { LinearGradient } from 'expo-linear-gradient';
import AuthService from '../services/AuthService.js';


const Drawer = createDrawerNavigator();

let switchNavigation = null;

export default class DrawerNavigator extends Component {

    constructor (props) {

        switchNavigation = props.navigation.state.params.switchNavigation;
        
        super(props);

        this.state = {
            isLogout: false
        }
    }

    render() {        
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home" 
                                drawerContentOptions={{
                                    inactiveTintColor: '#043030FF'
                                }}
                >
                    <Drawer.Screen name="Home" component={Home} 
                                    options={{
                                        title: 'Home',
                                        drawerIcon: ( { focused, size }) => (<Icon name={"home"} size={20} color='#043030FF'/> )
                                    }}
                    />
                    <Drawer.Screen name="CustomerList" component={CustomerList} initialParams={{ customerList: this.props.navigation.state.params.customerList }}
                                    options={{
                                        title: 'CustomerList',
                                        drawerIcon: ( { focused, size }) => (<Icon name={"list"} size={20} color='#043030FF'/> )
                                    }} 
                    />
                    <Drawer.Screen name="Setting" component={Setting} initialParams={{ discount: this.props.navigation.state.params.discount }}
                                    options={{
                                        title: 'Setting',
                                        drawerIcon: ( { focused, size }) => (<Icon name={"gear"} size={20} color='#043030FF'/> )
                                    }} 
                    />
                    <Drawer.Screen name="Logout" component={Logout}
                                    options={{
                                        title: 'Logout',
                                        drawerIcon: ( { focused, size }) => (<Icon name={"sign-out"} size={20} color='#043030FF'/> )
                                    }}
                    />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

class Logout extends Component {

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
            switchNavigation.navigate("AuthenticationScreen");
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
