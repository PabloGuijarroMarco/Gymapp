import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import Database from '../api/database';

import CardImage from '../components/CardImage';
import BackgroundImage from '../components/BackgroundImage';

export default class MachinesScreen extends React.Component {
  static navigationOptions = {
    title: 'Machines',
  };

  constructor(props){
    super(props)
    this.state = {machines : []};
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <BackgroundImage>
        <View style={styles.container}>
          <FlatList
            data={this.state.machines}
            renderItem={({item}) => 
            <CardImage 
              titre={item.value.name} 
              description={String(item.value.description).substr(0,100)+'...'}
              url={item.value.url} 
              exoId={item.key}
              handlePress={this.handlePress.bind(this, item)}
              machine={true}
              exercisesPress={this.exercisesPress.bind(this, item)}
              locationPress={this.locationPress.bind(this, item)}
            />}
          />
        </View>
      </BackgroundImage>
    );
  }
  handlePress(item){
    this.props.navigation.navigate('Detail', {exercise : item, machine : true})
  }

  exercisesPress(item){
    this.props.navigation.navigate('Exercises', {filter : item.key})
  }

  locationPress(item){
    console.log('Location Pressed ')
    this.props.navigation.navigate('Plan', { machine : item.key })
  }

  componentWillMount(){
    Database.getMachines((items) =>{
      this.setState({
        machines : items
      })
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
