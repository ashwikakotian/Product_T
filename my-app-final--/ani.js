import React from 'react';
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
export default class Animation extends React.Component {
  render() {
    return (
      <LottieView source={require('./assets/64627-time-management-lottie-animation.json')}
        style={{ width: '80%', marginLeft: RFValue(11) ,marginTop:RFValue(-1),}}
        autoPlay
        loop
      />
    )
    }
}