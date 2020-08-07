import 'react-native-gesture-handler';
//import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthenticationScreen from './screens/Authentication.js';
import DrawerNavigator from './screens/DrawerNavigator.js';


const SwitchNavigator = createSwitchNavigator(
    {
        AuthenticationScreen: {screen: AuthenticationScreen},
        DrawerNavigator: {screen: DrawerNavigator}
    },   
    {
        initialRouteName: "AuthenticationScreen"
    }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends Component {

    render() {
        return(
            <AppContainer></AppContainer>
        );
    };

}