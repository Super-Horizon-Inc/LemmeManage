import React, { Component } from 'react';
import {View} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import Home from './Home.js';
import CustomerList from './CustomerList.js';
import Setting from './Setting.js';
import Logout from './Logout.js';


const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {

    constructor (props) {
        super(props);
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
                    <Drawer.Screen name="Logout" component={Logout} initialParams={{ switchNavigation: this.props.navigation.state.params.switchNavigation, drawerNavigation: this.props.navigation}}
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