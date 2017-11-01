/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import RootNavigation from './navigation/RootNavigation';
import Firebase from './api/firebase'
import Database from './api/database'

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  setCustomText,
} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto',
    color: 'black'
  }
};

setCustomText(customTextProps);

export default class App extends Component {
  constructor(props){
    super(props);
    Firebase.initialise();
  }
  render() {
    console.log('App.js')
    return (
      <RootNavigation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
