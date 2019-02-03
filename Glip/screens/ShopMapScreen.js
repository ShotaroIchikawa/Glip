import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
    Header,
    SearchBar,
    Button
} from 'react-native-elements';
import MapView,{PROVIDER_GOOGLE,PROVIDER_DEFAULT} from 'react-native-maps';



export default class ShopMapScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{icon: 'menu', type: 'Feather', color: '#fff'}}
                    centerComponent={{text: 'Gourmet Clip', style: { color: '#fff'}}}
                    ri  ghtComponent={{icon: 'notifications-none', type: 'MaterialIcons', color: '#fff'}}
                    backgroundColor="#fea031"
                />
                <SearchBar
                    lightTheme
                    round
                    placeholder='お店を検索'
                />

                <MapView
                    provider={PROVIDER_DEFAULT}
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />

            </View>

        );
    }
}

const styles = StyleSheet.create({
    map:{
      flex:1,
    },
    header:{
        color: '#fea031',
    },
    buttons:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 10,
        paddingTop: 40
    },
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff'
    },
    button:{
        height:50,
    }
});