import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
const Tasks = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.squareThingi}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
      </View>
      <View style={styles.textC}>
        <Text style={styles.textS}>{props.text}</Text>
      </View>

      <View style={styles.circularThingi}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 1600,
    flex: 1,
    // justifyContent: 'space-between',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 20,
    padding: 15,
    marginRight: 10,
    backgroundColor: '#FFD2CF',
    
    // width: 200,
  },
  squareThingi: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: RFValue(10),
  },
  square: {
    width: 15,
    height: 15,
    backgroundColor: 'black',
    borderRadius: 5,
    marginRight: 15,
  },
  textS: { maxWidth: '80%', fontsize: 100 },
  textC: { marginRight: 400 },
  circularThingi: {
    width: 12,
    height: 12,
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 2,
    marginLeft: RFValue(-400),
  },
});
export default Tasks;
// maxWidth: '80%', text S RFValue(-10)
