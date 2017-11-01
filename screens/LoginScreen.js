import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Modal,
    TouchableHighlight,
} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';


export default class LoginScreen extends React.Component {

    logId() {
        let timeout = setTimeout(() => {
            Database.getUserId((uid) => {
                this.setState({
                    uid: uid
                })
                console.log(this.state.uid)
            });
        }, 500)
    }
    render() {
        return (
            <BackgroundImage style={styles.container} >
                <View style={{top:50}}>
                    <LoginForm />
                    <RegisterForm/>
                </View>
            </BackgroundImage>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

    },
})