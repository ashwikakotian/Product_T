import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import ToDoListScreen from './screens/ToDoList';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import WriteDiaryScreen from './screens/WriteDiary';
import WelcomeScreen from './screens/WelcomeScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppTabNavigator } from './components/AppTabNavigator';

export default function App() {
  return <AppContainer />;
}
const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  Drawer: { screen: AppDrawerNavigator },
  BootomNavigator: { screen: AppTabNavigator },
});

const AppContainer = createAppContainer(SwitchNavigator);
