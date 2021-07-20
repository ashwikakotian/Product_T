import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import ReadDiaryScreen from '../screens/ReadDiaryMain';
import ToDoListScreen from '../screens/ToDoList';
import SettingScreen from '../screens/SettingScreen';
import WriteDiaryScreen from '../screens/WriteDiary';

import { Icon } from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    ReadDiary: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="book" />,
        drawerLabel: 'Read Diary',
      },
    },
    ToDoList: {
      screen: ToDoListScreen,
      navigationOptions: {
        drawerIcon: <Icon name="check" />,
        drawerLabel: 'To Do List',
      },
    },
    WriteDiary: {
      screen: WriteDiaryScreen,
      navigationOptions: {
        drawerIcon: <Icon name="book" />,
        drawerLabel: ' Write Diary',
      },
    },

    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        drawerIcon: <Icon name="settings" type="fontawesome5" />,
        drawerLabel: 'Settings',
      },
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: 'ToDoList',
  }
);
