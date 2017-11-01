import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Layout from '../constants/Layout';
import BackgroundImage from '../components/BackgroundImage';
import CardCoach from '../components/CardCoach';

import Video from 'react-native-video'


export default class AboutScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'About',
    });

    render() {

        return (
            <BackgroundImage>
                <ScrollView style={styles.container}>
                    <Image
                        source={require('../assets/images/lg.jpg')}
                        style={{width : 150, height : 75, resizeMode: 'contain',}}
                    />
                    <View style={styles.txtCtn}>
                        <Text style={styles.txtInsideT}>Tornio</Text>
                        <Text style={styles.txtInsideT}>Kemi</Text>
                        <Text style={styles.txtInsideT}>Email</Text>
                    </View>
                    <View style={styles.txtCtn}>
                        <Text style={styles.txtInsideD}>010 396 8001</Text>
                        <Text style={styles.txtInsideD}>010 396 8003</Text>
                        <Text style={styles.txtInsideD}>toimisto@bodycenter.fi</Text>
                    </View>
                    <Video
                        source={require('../assets/videos/BodyCenterTornio.mp4')}
                        rate={1.0}
                        volume={1.0}
                        resizeMode="cover"
                        muted={false}
                        repeat={true}
                        playInBackground={false}
                        playWhenInactive={false} 
                        style={styles.video}
                    />
                    <ScrollView horizontal>
                        <CardCoach
                            url={require('../assets/images/pekkaa.jpeg')}
                            name={'Pekka'}
                            description={'Pekka on Body Centerin perustaja ja Tornion toimipisteen vastuuhenkilö.Sähköposti: pekka.erkinantti@bodycenter.fi'}
                        />
                        <CardCoach
                            url={require('../assets/images/jarii.jpeg')}
                            name={'Jari'}
                            description={'Jari vastaa Kemin toimipisteen toiminnasta toisena osakkaana.Sähköposti: jari.erkinantti@bodycenter.fi'}
                        />
                        <CardCoach
                            url={require('../assets/images/Hannaa.jpg')}
                            name={'Hanna'}
                            description={'Hanna on aloittanut Zumban ohjaamisen vuonna 2010. Hannan vauhdikkailla sheikataan arjen huolet pois mielestä ja nautitaan lattarirytmien tahtiin.'}
                        />
                        <CardCoach
                            url={require('../assets/images/Heljaa.jpg')}
                            name={'Heljä'}
                            description={'Heljä on joogaopettaja, joka on valmistunut Loviisan/Helsingin Villa Mandalasta.Tervetuloa tutustumaan Heljän Lempeään joogaan.'}
                        />
                        </ScrollView>
                </ScrollView>
            </BackgroundImage>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        

    },
    txtCtn: {
        flexDirection: 'row',
        marginHorizontal : 10,
    },
    txtInsideT:{
        flex : 1,
        color : 'grey'
    },
    txtInsideD:{
        flex : 1,
        fontSize: 10
    },
    video: {
        width: Layout.window.width,
        height: 200,
        marginVertical: 20,
    }
});
