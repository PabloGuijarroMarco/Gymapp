import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  PermissionsAndroid,
} from 'react-native';


import Database from '../api/database';

import CardImage from '../components/CardImage';
import BackgroundImage from '../components/BackgroundImage';

async function _getLocation() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location Permission',
        'message': 'GymApp needs access to your location ' +
                   'so you can find machine near of you.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
    } else {
      console.log("location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

_getLocation()

export default class ExercisesScreen extends React.Component {
  static navigationOptions = {
     title: 'Exercises',
  };

  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
      user: { uid: '' },
      initialMessage: '',
      details: '',
      uid: '',
      filter: '',
      locationPermission: '',
    };
  } 

  logOut() {
    Database.logOut();
  }

  filterExercises(name) {
    let newExercises = this.state.exercises.slice().filter((item) => {
      return item.value.machine == name;
    })
    this.setState({
      exercises: newExercises
    })
    console.log('listFiltre', newExercises)
  }

  render() {
    console.log('Exo')
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <FlatList
            data={this.state.exercises}
            renderItem={({ item }) =>
              <CardImage
                titre={item.value.name}
                description={String(item.value.description).substr(0,100)+'...'}
                url={item.value.url}
                exoId={item.key}
                handlePress={this.handlePress.bind(this, item)}
                machine={false}
                locationPress={this.locationPress.bind(this, item)}
              />}
          />
        </View>
      </BackgroundImage>
    );
  }

  handlePress(item) {
    this.props.navigation.navigate('Detail', { exercise: item, machine : false })
  }

  locationPress(item){
    console.log('Location Pressed ')
    this.props.navigation.navigate('Plan', { exercise : item })
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    if(params != undefined){
      console.log('on filter')
      console.log('filter:', params.filter)
      this.setState({filter : params.filter}, () =>{
        console.log('state:', this.state.filter)
        if(this.state.filter != ''){
          this.filterExercises(this.state.filter)
        }
      })
    }

     console.log('error message :',this.state.locationPermission)

    Database.authState((user) => {
      if (user !== null) {
        this.setState({ uid: user.uid }, () => {
          Database.getUserData(this.state.uid, (details) => {
            this.setState({ details: details })
          })
        })
      }
    });
    Database.getExercises((items) => {
      this.setState({
        exercises: items
      })
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
