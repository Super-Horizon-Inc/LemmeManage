import React, { Component } from 'react';
import {View} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home.js';
import CustomerList from './CustomerList.js';
import Setting from './Setting.js';
import AuthService from '../services/AuthService.js';
import ConfirmLogout from './ConfirmLogout.js';
import { LinearGradient } from 'expo-linear-gradient';

const Drawer = createDrawerNavigator();

class Logout extends Component {

    constructor (props) {
        super(props);
        new AuthService().logout();

        this.state = {
            isConfirmVisible: true,
        };
           
    }

    hideModal = () => {
        this.setState({ isConfirmVisible: false });
        //this.props.route.params.drawerNavigation.navigate("Home");
    }

    done = () => {
        this.props.route.params.switchNavigation.navigate("AuthenticationScreen");
    }
    
    render() {
        return (
            <LinearGradient colors={['#043030FF', '#6f6d6dFF', '#6f6d6dFF', '#043030FF']} style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%'}} >
                <View style={{ height:0 }}>
                    <ConfirmLogout isVisible={this.state.isConfirmVisible} hideModal={this.hideModal} 
                                done={this.done} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Button buttonStyle={{backgroundColor:'#376363FF'}} title='Home' onPress={() => {console.log("Home is clicked.")}} />
                </View>
            </LinearGradient>
        );
    }
    
}

export default class DrawerNavigator extends Component {

    constructor (props) {
        super(props);
    }

    render() {
        
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">                   
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="CustomerList" component={CustomerList} initialParams={{ customerList: this.props.navigation.state.params.customerList }} />
                    <Drawer.Screen name="Setting" component={Setting} initialParams={{ discount: this.props.navigation.state.params.discount }}/>
                    <Drawer.Screen name="Logout" component={Logout} initialParams={{ switchNavigation: this.props.navigation.state.params.switchNavigation, drawerNavigation: this.props.navigation}}/>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}