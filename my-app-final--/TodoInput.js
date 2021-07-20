import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import db from './config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
export default class TodoInput extends React.Component {
  constructor() {
    super();
    this.state = {
      task: '',
      userId: firebase.auth().currentUser.email,
      activeTodo: false,
    };
  }

  addRequest = async () => {
    var userId = this.state.userId;
    var task = this.state.task;

    db.collection('todo').add({
      user_id: userId,
      task: task,
      activeTodo: true,
    });

    this.setState({
      task: '',
    });
  };

  // Render
  render() {
    return (
      <View>
        <Text style={styles.textInputText}>WRITE A TASK</Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              this.setState({
                task: text,
              })
            }
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.addRequest()}>
            <Text style={{ color: '#fafafa' }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '75%',
    borderBottomWidth: 2,
    borderRadius: 3,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#1ABC9C',
    borderTopWidth: 2,
    fontSize: 25,
    color: '#800000',
  },

  button: {
    width: '18%',
    height: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#1ABC9C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    marginLeft: RFValue(270),
    marginTop: '-12%',
  },

  textInputText: {
    color: '#EC275F',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 35,

  },
});
