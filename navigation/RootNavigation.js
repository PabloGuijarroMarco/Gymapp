import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';

import MainTabNavigator from './MainTabNavigator';
import DetailExercise from '../screens/DetailExercise';
import LoginScreen from '../screens/LoginScreen';
import LocateScreen from '../screens/LocateScreen';
import ExercisesScreen from '../screens/ExercisesScreen';


const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    Detail: {
      screen : DetailExercise
    },
    Plan : {
      screen : LocateScreen
    },
    Exercises:{
      screen : ExercisesScreen
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      headerStyle: { marginTop: 24 },
    }),
  },
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  }
);

export default class RootNavigator extends React.Component {
    
  render() {    
  return (<RootStackNavigator />);
  }

}
