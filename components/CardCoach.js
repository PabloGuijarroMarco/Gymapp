import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Button
} from 'react-native';
import Layout from '../constants/Layout';

export default class CardCoach extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <Image
                style={styles.img}
                source={this.props.url}
                />
                <Text style={styles.name} >{this.props.name}</Text>
                
                <Text style={styles.description} >{this.props.description}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'column',
        width: Layout.window.width / 2.5,
        marginVertical : 10,
        marginLeft : 10,
        elevation: 4,
        backgroundColor : '#fff'
    }, 
    img : {
        resizeMode: 'contain',
        width : Layout.window.width / 2.5,
        height: 135,
        top: 0,
    },
    description : {
        marginHorizontal : 10,
    },
    name : {
        marginHorizontal: 10,
        fontSize : 18,
        fontWeight : 'bold'
    }
})