import React from 'react';
import {
    Image,
    View,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Layout from '../constants/Layout';
import Database from '../api/database';


export default class ProgramCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exercisesList: []
        }
    }

    componentWillMount() {
        Database.filterExercises(this.props.exercises, (filterExercises) => {
            console.log("on filter")
            this.setState({ exercisesList: filterExercises }, () => { })

        })
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { this.props.handlePress(this.props.title, this.props.description) }}>
                    <Text style={styles.header} >{this.props.title}</Text>
                    <FlatList
                        style={styles.list}
                        data={this.state.exercisesList}
                        renderItem={({ item }) => <Text>- {item.value.name}</Text>}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Layout.window.width - 40,
        // height: 400,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: 'black',
        elevation: 4,
        backgroundColor: '#fff'
    },
    list: {
        margin: 10
    },
    header: {
        flex: 0.5,
        fontSize: 30,
        marginHorizontal: 10,
        justifyContent: 'center',
        
    },
    description: {
        flex: 1,
        marginHorizontal: 10,
    },
    btnContainer: {
        flex: 0.5,
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10,
        paddingBottom: 10
    },
})