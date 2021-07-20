import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native-gesture-handler';
import { Header,Icon } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class WriteDiaryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      userId: firebase.auth().currentUser.email,
      diaryText: '',
    };
  }

  submitDiary = () => {
    db.collection('diary').add({
      date: this.state.date,
      user_Id: this.state.userId,
      diaryText: this.state.diaryText,
    });
    ToastAndroid.show('Memory Captured', ToastAndroid.LONG);
    this.setState({
      date: '',
      diaryText: '',
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Header
          backgroundColor={'#1ABC9C'}
          centerComponent={{
            text: 'Write Diary',
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
        <Text style={styles.textInputText}>DATE</Text>
        <TextInput
          // placeholder="Date"
          placeholderTextColor="black"
          onChangeText={(text) => {
            this.setState({
              date: text,
            });
          }}
          style={styles.date}
          value={this.state.date}
        />
        <Text style={styles.textInputText}>HOW WAS YOUR DAY ?</Text>
        <TextInput
          //placeholder="How Was Your Day ?"
          placeholderTextColor="black"
          onChangeText={(text) => {
            this.setState({
              diaryText: text,
            });
          }}
          value={this.state.diaryText}
          style={styles.diary}
          multiline={true}
        />

        <TouchableOpacity style={styles.button} onPress={this.submitDiary}>
          <Text style={styles.buttonText}>Capture Memory</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD2CF',
  },

  date: {
    height: 50,
    borderBottomWidth: 1,
    borderRadius: 3,
    margin: 10,
    padding: 6,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#D3B78E',
    borderTopWidth: 0.5,
     fontSize: 25,
    color:"#800000"
  },
  diary: {
    height: 250,
    borderBottomWidth: 1,
    borderRadius: 3,
    margin: 10,
    padding: 6,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#D3B78E',
    borderTopWidth: 0.5,
    fontSize: 25,
    color:"#800000"
  },
  button: {
    width: '55%',
    height: '7%',
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
    marginLeft: RFValue(80),
    marginTop: RFValue(20),
  },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(20),
  },
  textInputText: {
    color: '#EC275F',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 45,
    marginTop: 20,
    marginBottom: -20,
    fontFamily: 'comic',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});