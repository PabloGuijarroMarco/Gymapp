import React from 'react';
import { View, FlatList } from 'react-native';

import Database from '../api/database';

import ProgramCard from '../components/ProgramCard';
import BackgroundImage from '../components/BackgroundImage';
import CardImage from '../components/CardImage';

export default class ProgramsScreen extends React.Component {
  static navigationOptions = {
    title: 'Programs',
  };

  constructor(props) {
    super(props)
    this.state = {
      programs: [],
    }
  }

  componentWillMount(){
    Database.getPrograms((items) => {
      this.setState({
        programs: items
      })
    });
  }

  handlePress(item) {
    // this.props.navigation.navigate('Detail', { exercise: item })
    console.log('Program pressed')
  }

  render() {
    return(
      <BackgroundImage>
        {<FlatList
            data={this.state.programs}
            renderItem={({ item }) =>
              <ProgramCard
                title={item.value.name}
                exercises={item.value.exercises}
                handlePress={this.handlePress.bind(this, item)}
              />}
          /> }
      </BackgroundImage>
    );
  }
}
