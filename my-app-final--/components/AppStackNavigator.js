import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import DiaryListScreen from '../screens/DiaryList'
import ReadDiaryScreen from '../screens/ReadDiaryMain';

export const AppStackNavigator = createStackNavigator(
  {
    ReadDiary: {
      screen: ReadDiaryScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    DiaryList: {
      screen: DiaryListScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ReadDiary',
  }
);
