import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config.js';

export default class DairyListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,

      date: this.props.navigation.getParam('details')['date'],

      diaryText: this.props.navigation.getParam('details')['diaryText'],
    };
  }



  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFD2CF' }}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: 'Read Diary',
              style: {
                color: '#edf6f9',
                fontSize: 30,
                fontWeight: 'bold',
              },
            }}
            backgroundColor="#1ABC9C"
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <View
            style={{
              flex: 0.6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: RFValue(25),
                textAlign: 'center',
                color: '#800000',
                textDecorationLine: 'underline',
                fontFamily: 'sans-serif',
              }}>
              {this.state.date}
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: RFValue(15),
                textAlign: 'center',
                marginTop: RFValue(15),
                color: '#800000',
                marginLeft: 50,
                marginRight: 50,
                fontFamily: 'sans-serif',
              }}>
              {this.state.diaryText}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '75%',
    height: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(60),
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
  },
});
