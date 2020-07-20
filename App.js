//import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/Home.js';


const SwitchNavigator = createSwitchNavigator(
    {
        HomeScreen: {
            screen: HomeScreen
        }
    },
    {
        initialRouteName: "HomeScreen"
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