import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const portraitStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#6f6d6dFF',
    },
    modalView: {
      backgroundColor:'#043030FF',
      borderRadius: 20,
      marginHorizontal: 10,
      padding: 40,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'white'
    },
    labelText: {
      marginTop: 15,
      fontWeight:'bold',
      color: 'white'
    }
  });

const landscapeStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#6f6d6dFF',
    },
    modalView: {
      backgroundColor:'#043030FF',
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 40,
      marginHorizontal: 120,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    modalText: {
      marginBottom: 8,
      textAlign: 'center',
      color: 'white'
    },
    labelText: {
      marginTop: 8,
      fontWeight:'bold',
      color: 'white'
    }
  });
  

export default class CustomerInformation extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isConfirmVisible: false,           
            confirmText: "",
            orientation: this.isPortrait() ? "portrait" : "landscape", 
        }

    }

    isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    getStyle = () => (
        this.state.orientation == "portrait" ? portraitStyles : landscapeStyles 
    )

    onOrientationChange = () => {
        this.setState({orientation: this.isPortrait() ? "portrait" : "landscape"});
    }

    render () {

        return (          
            <View style={this.getStyle().centeredView}>
                <Modal transparent = {true} visible = { this.props.isVisible } 
                        supportedOrientations={["portrait", "landscape"]} onOrientationChange={this.onOrientationChange}>
                    <View style={this.getStyle().centeredView}>
                        <View style={this.getStyle().modalView}>
                            <View style = {this.getStyle().modalText}>
                                <Text style={[this.getStyle().labelText, {textAlign:'center'}]}>Customer information:</Text>                               
                                <View>    
                                    <Text style={this.getStyle().labelText}>First Name: </Text>               
                                    <Text style={{color:'white'}}>{this.props.customer.firstName}</Text>
                                    <Text style={this.getStyle().labelText}>Last Name: </Text>
                                    <Text style={{color:'white'}}>{this.props.customer.lastName}</Text>
                                    <Text style={this.getStyle().labelText}>Phone Number: </Text>
                                    <Text style={{color:'white'}}>{this.props.customer.phoneNumber}</Text>
                                    <Text style={this.getStyle().labelText}>Email: </Text>
                                    <Text style={{color:'white'}}>{this.props.customer.email}</Text>
                                    <Text style={this.getStyle().labelText}>Date of Birth: </Text>
                                    <Text style={{color:'white'}}>{this.props.customer.dob}</Text>
                                    <Text style={this.getStyle().labelText}>Visiting Times: </Text>
                                    <Text style={{color:'white'}}>{this.props.customer.visitCounter}</Text>
                                </View>
                            </View>
                            <View >
                                <Button title="Back" buttonStyle={{backgroundColor:'#376363FF', color:'white', width:'60%'}} onPress={this.props.hideModal} style={{alignItems: 'center'}}/>
                            </View>     
                        </View>
                    </View>
                </Modal>
            </View>        
        )           
    }
}