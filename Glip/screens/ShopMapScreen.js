import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions,Alert,YellowBox} from 'react-native';
import {
    Header,
    SearchBar,
    Button
} from 'react-native-elements';
import MapView,{PROVIDER_GOOGLE,PROVIDER_DEFAULT} from 'react-native-maps';
import firebase from 'firebase'
import "firebase/firestore";

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.1000
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


export default class ShopMapScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);

        this.state = {
            messages: [],
            region: {
                latitude: 38.261304,
                longitude: 140.880196,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            shopName:"",
            locationResult:null,
            currentLocation:{longitude:"",latitude:""}
        };

    }

    componentDidMount(){
/////ユーザの現在地を取得してstate,regionへ
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = parseFloat(position.coords.latitude)
                let long = parseFloat(position.coords.longitude)

                let currentRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
                this.setState({region:currentRegion})
            },
            (error)    => { console.log(error) },
            {
                enableHighAccuracy: true,
                timeout:            20000,
                maximumAge:         10000
            }

        )
        this.getUserShopGroup()



    }

    //state.messageの中にある緯度経度情報をMapviewMakerの塊として返す
    renderLibraryMarkers(){
        return this.state.messages.map((message,index)=>{
            const coords = {
                latitude: message.geopoint._lat,
                longitude: message.geopoint._long,
            };
            const name = message.name;
            const url = message.website_url;

            return(
                <MapView.Marker
                    key = {index}
                    coordinate = {coords}
                    title={`title: ${name} `}
                    description={`URL: ${url}`}
                    onPress={() => { this.onPressMaker(name) }}
                />
            );
        });
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
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={this.state.region}
                />

            </View>

        );
    }

    getShops=()=>{
        const shopRef = this.shops;
        var array = {};

        shopRef.
        onSnapshot(this.getData);

        for( var i=0; i<this.state.messages.length; i++) {

            const str =  `name: ${this.state.messages[i].name}  URL: ${this.state.messages[i].website_url} _lat: ${this.state.messages[i].geopoint._lat}, _long: ${this.state.messages[i].geopoint._long}`;

            console.log( str );

        }

    };

    getUserShopGroup=async()=>{
        if(this.uid!==""){
            var userRef = firebase.firestore().collection('users').doc(this.uid);
            var getDoc = await userRef.collection('shops').get()
                .then(snapshot=>{

                    const messages = snapshot.docs.map((doc) => {
                        Alert.alert(doc.id)
                        //console.warn(JSON.stringify(doc.data()));
                        //let ref = doc.data().shop_ref.split("/");
                        //var shopRef = firebase.firestore().collection('shops').doc(ref[1]);
                        //doc(doc.data().shop_ref);
                        // shopRef.get()
                        //     .then(doc=>{
                        //         Alert.alert(doc.data().name)
                        //         return doc.data();
                        //         //Alert.alert(doc.data().name);
                        //     })
                        //return doc.data();
                    });
                    // messagesをstateに渡す

                    this.setState({ messages: messages });

                });


        }




        var array = {};




        // const observer = shopRef.
        // onSnapshot(this.getData);
        //
        // for( var i=0; i<this.state.messages.length; i++) {
        //
        //     let documentRef = firestore.document(this.state.messages[i].shop_ref);
        //     documentRef.onSnapshot((querySnapshot)=>{
        //         const name = querySnapshot.docs.map((doc)=>{
        //             return doc.data().name;
        //         })
        //     });
        //     Alert.alert(name);
        //     //const str =  `name: ${this.state.messages[i].name}  URL: ${this.state.messages[i].website_url} _lat: ${this.state.messages[i].geopoint._lat}, _long: ${this.state.messages[i].geopoint._long}`;
        //
        //     //console.log( str );
        //
        // }


    };

    //firestoreのデータを取得してきてdoc内のgeopointだけ返す（デバック出力用)
    getData = (querySnapshot) => {
        // docsのdataをmessagesとして取得
        const messages = querySnapshot.docs.map((doc) => {
            return doc.data();
        });
        // messagesをstateに渡す
        this.setState({ messages: messages });
    }




    get shops(){
        return firebase.firestore().collection("shops");
    }

    //ショートカット用の変数
    get userCollection(){
        return firebase.firestore().collection("users");
    }

    get uid(){
        return (firebase.auth().currentUser||{}).uid;
    }

    get name(){
        return (firebase.auth().currentUser||{}).displayName;
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
