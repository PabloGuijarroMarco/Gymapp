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



export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            modalVisible: false,
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    logIn() {
        Database.logIn(this.state.email, this.state.password)
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={{ marginTop: 22, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <View>
                            <Text>Please, log in</Text>
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
                            <Button
                                title="Log in"
                                onPress={() => this.logIn()}
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
                title='LogIn'
                onPress={() => {
                    this.setModalVisible(true)
                }}>
                <Text>Show Modal</Text>
            </Button>
            </View >
        )
    }
}