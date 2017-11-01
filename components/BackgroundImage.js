import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';

export default class BackgroundImage extends Component {

    render() {
        return (
            <Image source={require('../assets/images/bg.png')}
                  style={styles.backgroundImage}
                  >
                  {this.props.children}
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
});
