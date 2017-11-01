import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
} from 'react-native';
import Layout from '../constants/Layout';
import BackgroundImage from '../components/BackgroundImage';
import Database from '../api/database'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'


export default class LocateScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Plan`,
    });

    constructor(props) {
        super(props)
        this.state = {
            machineInfo: { key: "", value: { name: "" } },
            machineDistance: 0.00,
            machineId: 'id00',
            exerciseName: '',
            zoneImg: require("../assets/images/map.png"),
        }

    }

    getMachineId(id) {
        Database.getMachinesById(id, (machine) => {
            this.setState({ machineInfo: machine })
        });
    }

    componentWillMount() {
        Beacons.checkTransmissionSupported()
            .then(() => {
                console.log('Can use bluetooth')
                console.log(this.state.machineInfo.value.beacon.uid)
                Beacons.detectIBeacons();

                console.log(this.state.machineInfo.value.beacon)
                Beacons
                    .startRangingBeaconsInRegion('REGION1', this.state.machineInfo.value.beacon.uid)
                    .then(() => console.log('Beacons ranging started succesfully'))
                    .catch(error => console.log(`Beacons ranging not started, error: ${error}`));
            })
            .catch(
            console.log('Cannot use')
            )

    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        if (params.machine != undefined) {
            this.getMachineId(params.machine)
            this.setState({ machineId: params.machine })
        }
        if (params.exercise != undefined) {
            this.getMachineId(params.exercise.value.machine);
            this.setState({ machineId: params.exercise.key, exerciseName: params.exercise.value.name })
        }

        this.beaconsDidRange = DeviceEventEmitter.addListener(
            'beaconsDidRange',
            (data) => {
                console.log('find', data)
                if (data.beacons.length > 0) {
                    console.log(data.beacons)
                    if (this.state.machineInfo.value.beacon.minor === data.beacons[0].minor && this.state.machineInfo.value.beacon.major === data.beacons[0].major) {
                        console.log('Beacon distance : ', data.beacons[0].distance);
                        console.log('Beacon uid : ', data.beacons[0].uuid);
                        this.setState({ machineDistance: data.beacons[0].distance })
                        if(this.state.machineDistance.toFixed(2) < 0.2){
                            this.beaconsDidRange.remove();
                            this.props.navigation.navigate('Detail', { exercise: this.state.machineInfo, machine : true })
                        }
                    }

                }

            }
        );
    }

    componentWillUnmount() {
        console.log('unmount')
        this.beaconsDidRange.remove();
        this.beaconsDidRange = null;
    }

    render() {
        const { params } = this.props.navigation.state;

        return (
            <BackgroundImage>
                <ScrollView style={styles.container}>
                    <Text>Machine number {this.state.machineId.substring(2, this.state.machineId.length)} Distance : {this.state.machineDistance.toFixed(2)} m</Text>
                    <Image style={styles.img} source={this.state.zoneImg} />
                    {this.state.exerciseName != '' ? <Text>Machine for {this.state.exerciseName} : {this.state.machineInfo.value.name} </Text> : <View />}

                    {this.state.machineInfo.value.zone === 'blue' ? 
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
                        size={28}
                        color={'blue'}
                        style={{
                            position: "absolute",
                            backgroundColor: 'transparent',
                            top: 180,
                            left: 75
                        }}
                    /> : <View/>
                    }

                    {this.state.machineInfo.value.zone === 'red' ? 
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
                        size={28}
                        color={'green'}
                        style={{
                            position: "absolute",
                            backgroundColor: 'transparent',
                            left: 230,
                            top: 70
                        }}
                    /> : <View/>}

                    {this.state.machineInfo.value.zone === 'grey' ? 
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
                        size={28}
                        color={'purple'}
                        style={{
                            position: "absolute",
                            backgroundColor: 'transparent',
                            top: 300,
                            left: 75
                        }}
                    /> : <View/>}
                    
                </ScrollView>
            </BackgroundImage>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',

    },
    img: {
        flex: 1,
        width: Layout.window.width - 40,
        height: 400,
        resizeMode: 'stretch',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 25,
    },
    txt: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
});
