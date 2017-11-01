import React from 'react';
import {
    Image,
    View,
    StyleSheet,
    Text,
    Button,
    Modal,
    TextInput,
} from 'react-native';
import Layout from '../constants/Layout';
import Database from '../api/database';
import * as firebase from 'firebase';



export default class RegiterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            modalVisible: false,
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    async register() {
        try{
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            await Database.addUserData(this.state.name);
            console.log('Account created');
        }
        catch (error){
            console.log(error)
        }
        
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={{marginTop: 22, justifyContent: 'center', alignItems: 'center', flex: 1}}>
                        <View>
                            <Text style={{textAlign: 'center'}}>Hello World!</Text>
                            <TextInput
                                placeholder={"Email"}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                style={{ height: 50,  width:Layout.window.width-40 }}
                            />
                            <TextInput
                                placeholder={"Password"}
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                style={{ height: 50,  width:Layout.window.width-40 }}
                                secureTextEntry
                            />
                            <TextInput
                                placeholder={"Name"}
                                onChangeText={(name) => this.setState({ name })}
                                style={{ height: 50,  width:Layout.window.width-40 }}
                                value={this.state.name}
                            />
                            <Button
                                title="Register"
                                onPress={() => this.register()}
                                style={{ width:Layout.window.width-40}}
                            />
                            <Button
                                title='Cancel'
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }}
                                style={{ width:Layout.window.width-40}}>
                                <Text>Hide Modal</Text>
                            </Button>

                        </View>
                    </View>
                </Modal>

                <Button
                    title='Register'
                    onPress={() => {
                        this.setModalVisible(true)
                    }}>
                    <Text>Show Modal</Text>
                </Button>
            </View>
        )
    }
}