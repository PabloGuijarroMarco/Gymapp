import React from 'react';
import { Platform, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import ExercisesScreen from '../screens/ExercisesScreen';
import LinksScreen from '../screens/MachinesScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import LoginScreen from '../screens/LoginScreen';
import AboutScreen from '../screens/AboutScreen'

export default TabNavigator(
  {
    Exercices: {
      screen: ExercisesScreen,
    },
    Machines: {
      screen: LinksScreen,
    },
    Programs: {
      screen: ProgramsScreen,
    },
    About: {
      screen : AboutScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
            case 'Exercices':
              iconName = Platform.OS === 'ios'
                ? `ios-body${focused ? '' : '-outline'}`
                : 'md-body';
              break;
            case 'Machines':
              iconName = Platform.OS === 'ios'
                ? `ios-cog${focused ? '' : '-outline'}`
                : 'md-cog';
              break;
            case 'Programs':
              iconName = Platform.OS === 'ios'
                ? `ios-list${focused ? '' : '-outline'}`
                : 'md-list';
                break;
            case 'About':
              iconName = Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
                break;
          }
          return (           
            <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
