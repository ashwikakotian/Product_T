import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Platform,StatusBar,SafeAreaView
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config';
import firebase from 'firebase';
import Animation from '../ani';
export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      firstName: '',
      lastName: '',

      confirmPassword: '',
      isModalVisible: 'false',
    };
  }
  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection('users').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,

            email_id: this.state.emailId,
          });
          return Alert.alert('User Added Successfully', '', [
            {
              text: 'OK',
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };

  login = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('WriteDiary');
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };
  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.signupView}>
            <Text style={styles.signupText}> SIGN UP </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <Text style={styles.textInputText}>First Name </Text>
            <TextInput
              style={styles.formInput}
              // placeholder={'First Name'}
              // placeholderTextColor={'#1ABC9C'}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
            />

            <Text style={styles.textInputText}>Last Name </Text>
            <TextInput
              style={styles.formInput}
              //  placeholder={'Last Name'}
              maxLength={12}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
            />

            <Text style={styles.textInputText}>Email </Text>
            <TextInput
              style={styles.formInput}
              //placeholder={'Email'}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />

            <Text style={styles.textInputText}> Password </Text>
            <TextInput
              style={styles.formInput}
              /// placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />

            <Text style={styles.textInputText}>Confirm Password</Text>
            <TextInput
              style={styles.formInput}
              //placeholder={'Confrim Password'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
                });
              }}
            />
          </View>

          <View style={{ flex: 0.2, alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() =>
                this.userSignUp(
                  this.state.emailId,
                  this.state.password,
                  this.state.confirmPassword
                )
              }>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <Text
              style={styles.cancelButtonText}
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}>
              Cancel
            </Text>
          </View>
        </ScrollView>
      </Modal>
    );
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      
        {this.showModal()}
        <View>
          <Animation />
        </View>
        <Text style={styles.title}> Product-T</Text>
        <Text style={styles.textInputText}>USERNAME</Text>
        <TextInput
          style={[styles.loginBox, { marginTop: RFValue(15) }]}
          placeholder="abc@gmail.com"
          placeholderTextColor="#edf6f9"
          onChangeText={(text) => {
            this.setState({
              emailId: text,
            });
          }}
        />
        <Text style={styles.textInputText}>PASSWORD</Text>
        <TextInput
          style={[styles.loginBox, { marginTop: RFValue(15) }]}
          secureTextEntry={true}
          placeholder="Enter Password"
          placeholderTextColor="#edf6f9"
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        />
        <TouchableOpacity
          style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
          onPress={() => {
            this.login(this.state.emailId, this.state.password);
          }}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginBottom: 20, marginTop: 10 }]}
          onPress={() => this.setState({ isModalVisible: true })}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#98F0E8',
    padding: 8,
  },
  title: {
    color: '#1ABC9C',
    fontSize: RFValue(40),
    fontWeight: 20,
    paddingLeft: RFValue(65),
    fontFamily: 'bold',
  },
  textInputText: {
    color: '#F25477',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 45,
    marginTop: 20,
    marginBottom: -10,
  },
  loginBox: {
    width: '75%',
    height: RFValue(50),
    borderBottomWidth: 1.5,
    borderColor: '#ffffff',
    fontSize: RFValue(20),
    paddingLeft: RFValue(20),
    marginLeft: RFValue(40),
    marginBottom: RFValue(-15),
    marginTop: 150,
  },
  button: {
    width: '45%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#FF98A9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    //gradient:
    marginLeft: RFValue(90),
    marginTop: RFValue(200),
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },

  scrollview: {
    flex: 1,
    backgroundColor: '#fff',
  },
  signupView: {
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#32867d',
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

  registerButton: {
    width: '65%',
    height: RFValue(50),
    marginTop: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 25,
    backgroundColor: '#FF98A9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    //gradient:
    marginLeft: RFValue(10),
  },
  registerButtonText: {
    fontSize: RFValue(23),
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButtonText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: '#1ABC9C',
    marginTop: RFValue(10),
  },
  droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});
// #5570FF
// #FF98A9
// #FFD2CF
// #060101
// #89A0FF
