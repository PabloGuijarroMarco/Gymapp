import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import Layout from '../constants/Layout';
import BackgroundImage from '../components/BackgroundImage';


export default class DetailExercise extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            machine : true,
            machineKey : ''
        }
    }
    static navigationOptions = ({ navigation }) => ({
         title: `${navigation.state.params.exercise.value.name}`,
      });
    
      showPress(){
        this.props.navigation.navigate('Exercises', {filter : this.state.machineKey})
      }

    componentDidMount(){
        this.setState({machineKey : this.props.navigation.state.params.exercise.key, machine : this.props.navigation.state.params.machine})
    }

    render() {
        const { params } = this.props.navigation.state;
        console.log(params.exercise.value)
        
        return (
            <BackgroundImage>
            <ScrollView style={styles.container}>
                    <Image style={styles.img} source={{uri : params.exercise.value.url}}/>
                <Text style={styles.txt}>{params.exercise.value.description}</Text>
                {this.state.machine ? <Button title='Show exercises' onPress={this.showPress.bind(this)}/> : <View/>}
            </ScrollView>
            </BackgroundImage>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flexDirection : 'column',

    },
    img : {
        flex : 1,
        width: Layout.window.width - 40,
        height : 300,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal : 20,
        marginTop : 20,
    },
    txt : {
        marginHorizontal : 20,
        marginBottom : 20,
    },
  });
  