import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { Card, Header, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

export default class ReadDiaryScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      diaryList: [],
    };
    this.requestRef = null;
  }

  getDiaryList = () => {
    var userId = this.state.userId;
    this.requestRef = db
      .collection('diary')
      .where('user_Id', '==', userId)
      .onSnapshot((snapshot) => {
        var diaryList = snapshot.docs.map((doc) => doc.data());
        this.setState({
          diaryList: diaryList,
        });
      });
  };

  componentDidMount() {
    this.getDiaryList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.date}
        titleStyle={{ color: 'EB687B', fontWeight: 'bold', fontSize: 20 }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('DiaryList', {
                details: item,
              });
            }}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        }
        leftElement={
          <Image
            source={require('../New folder/diary.png')}
            style={{ width: 40, height: 40 }}
          />
        }
      />
    );
  };
  //renderseprator
  render() {
    return (
      <View style={styles.view}>
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
        <View style={{ flex: 1 }}>
          {this.state.diaryList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>No Memory Captured</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.diaryList}
              renderItem={this.renderItem}
              style={{
                backgroundColor: '#FFD2CF',
                borderBottomColor: '#EC275F',
               
              }}
              bottomDivider
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginBottom: 10,
    marginTop: 30,
  },

  button: {
    width: '20%',
    height: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: 20,
    backgroundColor: '#1ABC9C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    //gradient:
    marginLeft: RFValue(20),
  },
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 8,
    fontSize: RFValue(15),
  },
});
