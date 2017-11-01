import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Button
} from 'react-native';
import Layout from '../constants/Layout';

export default class CardImage extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <Image
                style={styles.img}
                source={{uri: this.props.url}}
                />
                <Text style={styles.header} >{this.props.titre}</Text>
                <Text style={styles.description} >{this.props.description}</Text>
                <View style={styles.btnContainer}>
                    <Button 
                        title='Detail'
                        onPress={this.props.handlePress }
                    />
                    <View style={{width : 16}}/>
                    {this.props.machine ? <Button title='Exercises' onPress={this.props.exercisesPress}/> : <View/>}
                    {this.props.machine ? <View style={{width : 16}}/> : <View/>}
                    <Button 
                        title='Location'
                        onPress={this.props.locationPress }
                        />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flexDirection: 'column',
        width: Layout.window.width - 40,
        height: 400,
        marginVertical : 10,
        marginHorizontal : 20,
        justifyContent: 'center',
        borderColor : 'black',
        elevation: 4,
        backgroundColor : '#fff'
    }, 
    img : {
        flex : 3,
        resizeMode: 'contain',
        marginHorizontal : 2,
        marginTop : 10
    },
    header : {
        flex : 0.5,
        fontSize : 30,
        marginHorizontal : 10,
    },
    description : {
        flex : 1,
        marginHorizontal : 10,
    },
    btnContainer : {
        flex: 0.5,
        flexDirection : 'row',
        marginHorizontal : 10,
        marginBottom : 10,
        paddingBottom : 10
    },
})