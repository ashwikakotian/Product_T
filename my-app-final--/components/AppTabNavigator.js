import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator';
import WelcomeScreen from '../screens/WelcomeScreen';
import ToDoListScreen from '../screens/ToDoList';

import WriteDiaryScreen from '../screens/WriteDiary';

export const AppTabNavigator = createBottomTabNavigator({
  ToDoList: {
    screen: ToDoListScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('../New folder/todo.png')}
          style={{ width: 40, height: 40 }}
        />
      ),
      tabBarLabel: 'To Do List ',
    },
  },
  ReadDiary: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('../New folder/diary.png')}
          style={{ width: 40, height: 40 }}
        />
      ),
      tabBarLabel: ' Read Diary',
    },
  },
  WriteDiary: {
    screen: WriteDiaryScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('../New folder/writediary.png')}
          style={{ width: 40, height: 40 }}
        />
      ),
      tabBarLabel: 'Write Diary ',
    },
  },
});
