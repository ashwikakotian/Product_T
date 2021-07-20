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
import TodoInput from '../TodoInput';
import TodoItem from '../TodoItem';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { Card, Header, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

export default class TodoListScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      todo: [],
      docId: '',
    };
    this.requestRef = null;
  }

  gettodo = () => {
    var userId = this.state.userId;
    this.requestRef = db
      .collection('todo')
      .where('user_id', '==', userId)
      .where('activeTodo', '==', true)
      .onSnapshot((snapshot) => {
        var task = snapshot.docs.map((doc) => doc.data());
        this.setState({
          todo: task,
        });
      });
  };

  removeToDo = (task) => {
    var userId = this.state.userId;
    var todo = this.state.todo;
    console.log(todo);
    db.collection('todo')
      .where('user_id', '==', this.state.userId)
      .where('task', '==', task)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('todo').doc(doc.id).update({ activeTodo: false });
        });
      });
  };

  componentDidMount() {
    this.gettodo();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.task}
        titleStyle={{
          color: 'EB687B',
          fontWeight: 'bold',
          fontSize: 20,
        }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.removeToDo(item.task);
            }}>
            <Text style={{ color: 'white' }}>X</Text>
          </TouchableOpacity>
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
            text: 'To Do List',
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
          <TodoInput />
        </View>
        <View style={{ flex: 5 }}>
          {this.state.todo.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>No Task To Do</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.todo}
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
  },

  button: {
    width: '15%',
    height: '90%',
  
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
});
