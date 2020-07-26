import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: '#6f6d6dFF',
    },
    modalView: {
      backgroundColor:'#043030FF',
      margin: 20,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
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
      color: 'white',
    }
  });
  

export default class Confirm extends Component {

    constructor(props) {

        super(props);

    }

    render () {

        return (
            <View style={styles.centeredView}>
                <Modal transparent = {true} visible = { this.props.isVisible } supportedOrientations={["portrait", "landscape"]}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style = {styles.modalText}>Do you want to logout?</Text>
                            <Button title="No" buttonStyle={{backgroundColor:'#376363FF', color:'white', width:'60%'}} onPress={this.props.hideModal} style={{alignItems: 'center'}}/>
                            <Button title="Yes" buttonStyle={{backgroundColor:'#376363FF', color:'white', width:'60%'}} onPress={this.props.done} style={{alignItems: 'center'}}/>
                        </View>

                            

                    </View>
                </Modal>
            </View>           
        )           
    }
}