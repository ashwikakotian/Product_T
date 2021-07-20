import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';

import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      firstName: '',
      lastName: '',
    };
  }

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('users')
      .where('email_id', '==', email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.email_id,
            firstName: data.first_name,
            lastName: data.last_name,
          });
        });
      });
  };

  updateUserDetails = () => {
    db.collection('users').doc(this.state.docId).update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
    });

    Alert.alert('Profile Updated Successfully');
  };

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFD2CF' }}>
        <View style={{ flex: 0.12 }}>
          <Header
            backgroundColor={'#1ABC9C'}
            centerComponent={{
              text: 'Read Diary',
              style: { color: '#edf6f9', fontSize: 30, fontWeight: 'bold' },
            }}
            leftComponent={
              <Icon
                name="bars"
                type="font-awesome"
                color="#ffffff"
                onPress={() => this.props.navigation.toggleDrawer()}
              />
            }
          />
        </View>
        <Text style={styles.textInputText}>First Name </Text>
        <TextInput
          style={styles.formInput}
          maxLength={12}
          onChangeText={(text) => {
            this.setState({
              firstName: text,
            });
          }}
          value={this.state.firstName}
        />

        <Text style={styles.textInputText}>Last Name </Text>

        <TextInput
          style={styles.formInput}
          maxLength={12}
          onChangeText={(text) => {
            this.setState({
              lastName: text,
            });
          }}
          value={this.state.lastName}
        />

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateUserDetails();
            }}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '55%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#1ABC9C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    //gradient:
    marginLeft: RFValue(20),
    marginTop: RFValue(-10),
  },

  buttonView: {
    flex: 0.22,
    alignItems: 'center',
    marginTop: RFValue(100),
  },
  buttonText: {
    fontSize: RFValue(23),
    fontWeight: 'bold',
    color: '#fff',
  },
  textInputText: {
    color: '#F25477',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 45,
    marginTop: 50,
    marginBottom: -10,
  },
  formInput: {
    width: '80%',
    height: RFValue(45),
    padding: RFValue(10),
    borderBottomWidth: 1,
    borderRadius: 2,
    borderColor: '#1ABC9C',
    paddingBottom: RFValue(10),
    marginLeft: RFValue(35),
    marginBottom: RFValue(14),
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});
