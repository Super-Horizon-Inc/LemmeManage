import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home.js';
import CustomerList from './CustomerList.js';
import Setting from './Setting.js';

const Drawer = createDrawerNavigator();

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
                    <Drawer.Screen name="Setting" component={Setting} />
                    <Drawer.Screen name="Logout"  />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}