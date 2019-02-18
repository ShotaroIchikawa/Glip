import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Alert,
    YellowBox,
    Animated,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import {
    Header,
    SearchBar,
    Button,
    Card,
} from 'react-native-elements';
import MapView,{PROVIDER_GOOGLE,PROVIDER_DEFAULT,Marker} from 'react-native-maps';
import firebase from 'firebase';
import "firebase/firestore";
import Carousel from 'react-native-snap-carousel';
import {NavigationActions} from "react-navigation";


const {width, height} = Dimensions.get('window')

const CARD_HEIGHT =height/5;
const CARD_WIDTH = 250;

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.1000
const LONGITUDE_DELTA = 0.1000


export default class ShopMapScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);

        this.state = {
            messages: [],
            markers:[],
            shopRef:[],
            region: {
                latitude: 38.261304,
                longitude: 140.880196,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            shopName:"",
            locationResult:null,
            currentLocation:{longitude:"",latitude:""},
            scrolledx:0,

        };

    }

    componentWillMount(){
         this.index =0;
         this.animation = new Animated.Value(0);
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
                //console.warn(lat,long)
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


/*********************/
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if(index >= this.state.markers.length) {
                index = this.state.markers.length - 1;
            }
            if(index <= 0) {
                index = 0;
            }
            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if(this.index !== index) {
                    this.index = index;

                   // this.state.markers[index]

                    this.map.animateToRegion({
                        latitude:this.state.markers[index].geopoint.lat,
                        longitude:this.state.markers[index].geopoint.long,
                        latitudeDelta: this.state.region.latitudeDelta,
                        longitudeDelta: this.state.region.longitudeDelta,
                    }, 350);

                }
            }, 10);
        });

        //console.warn(this.state.messages)
    }

    onUserPinGragEnd=(LatLng)=>{
        this.setState({region:LatLng});
    }

    render() {
        //この変数はあまり使わない
        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });
        return (
            <SafeAreaView style={{flex:1,backgroundColor:'#FFEB3B'}}>
            <View style={styles.container}>
                <Header
                    leftComponent={{icon: 'menu', type: 'Feather', color: '#000'}}
                    centerComponent={{text: 'Glip', style: { fontFamily: 'Arial Rounded MT Bold', color: '#000', fontSize: 24}}}
                    rightComponent={{icon: 'notifications-none', type: 'MaterialIcons', color: '#000'}}
                    backgroundColor="#FFEB3B"
                />


                <SearchBar
                    //lightTheme
                    round
                    containerStyle={{
                        backgroundColor:'transparent',
                        borderBottomColor:'transparent',
                        borderTopColor:'transparent',
                    }}
                    style={{position:'absolute'}}
                    inputStyle={{backgroundColor:'white'}}
                    //clearIcon ={{color:'#999',name:'search'}}
                    placeholder='お店を検索'
                />
                <MapView
                    ref={map => this.map = map}
                    provider ={PROVIDER_GOOGLE}
                    region={this.state.region}
                    style={styles.map}
                    showsUserLocation={true}
                >
                    <Marker
                        draggable
                        coordinate={{
                            latitude:this.state.region.latitude,
                            longitude:this.state.region.longitude,
                        }}
                        onDragEnd={e=>{
                            this.setState({region:{
                                latitude:e.nativeEvent.coordinate.latitude,
                                longitude:e.nativeEvent.coordinate.longitude,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA
                                }});
                        }}
                    >
                        <Image
                            source = {require('./img/BlueIcon.svg')}
                            style = {{width:20,height:20,top:20}}
                        />
                    </Marker>
                    {this.state.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        const coords = {
                            latitude: marker.geopoint.lat,
                            longitude: marker.geopoint.long,
                        }
                        return (
                            <Marker.Animated
                                key={index}
                                coordinate={coords}
                                title={marker.name}
                               // description={"description"}
                                onPress={()=>this._carousel.snapToItem(index)}
                            />
                               /* <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]} />
                                    <View style={styles.marker} />
                                </Animated.View>*/
                           // </Marker.Animated>
                        );
                    })}
                </MapView>


                <Animated.View
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >

                    <Carousel
                        style={styles.carouselStyle}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.markers}
                        renderItem={this._renderItem.bind(this)}
                        sliderWidth={width}
                        itemWidth={250}
                        navigation ={this.props.navigation}
                        onScroll={(event)=>{
                            this.animation.setValue(event.nativeEvent.contentOffset.x);
                        }}
                        useScrollView={true}

                    />
                </Animated.View>
                </View>

            </SafeAreaView>
        );

    }


    _renderItem({ item, index }) {
        const {navigation} = this.props;
        return(

           /* <View

        style={styles.card} key={index}>
            <Image
        source={require('./img/sampleimg.jpg')}
        style={styles.cardImage}
        resizeMode="cover"
            />
            <View style={styles.textContent}>
            <Text numberOfLines={1} style={styles.cardtitle}>{item.name}</Text>

    </View>
    </View>*/

        <View key={index}>
            <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(NavigationActions.navigate({routeName:'BasicInfo',params:{shop_ref:item.shop_ref}}))}}>

              <Card
                   //image = {require('./img/sampleimg.jpg')}
                   //imageWrapperStyle ={{margin:10}}
                  // key={l.name}
                  //title={l.name}
                   containerStyle={{margin:5,marginBottom:10, borderRadius: 5}}
                 >
                  <View>
                      <Image
                          style ={{width:200,height:105}}
                          source ={require('./img/sampleimg.jpg')}/>
                  </View>
                  <View style={styles.textContent}>
                      <Text style={styles.cardtitle}>{item.name}</Text>
                  </View>
              </Card>
          </TouchableOpacity>
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

    renderLibraryMarkers(){
        return this.state.messages.map((message)=>{
            const coords = {
                latitude: message.lat,
                longitude: message.long,
            };


            return(
                <Marker
                    //key = {index}
                    coordinate = {coords}
                    title={"marker"}
                    description={"description"}
                   // onPress={() => { this.onPressMaker(name) }}
                />
            );
        });
    }


    getUserShopGroup(){

            const userRef = firebase.firestore().collection('users').doc(this.uid);
            //const getDoc =
                userRef.collection('shops').onSnapshot((querySnapshot)=>{
                    const data=[];
                    querySnapshot.forEach((doc)=>{
                        data.push({
                            ref: doc.data().shop_ref
                        });
                    });

                    let shopData =[];
                    for(let i=0;i<data.length;i++) {


                        let ref = data[i].ref;
                         ref.get().then((doc)=>{
                             //console.warn(doc.data().geopoint._lat);
                             //console.warn(doc.data().geopoint._long);
                            //let data = this.state.messages;
                             shopData.push({
                                 name:doc.data().name,
                                 shop_ref:ref,
                                 geopoint:{
                                     lat:doc.data().geopoint._lat,
                                     long:doc.data().geopoint._long
                                 }
                             })

                             this.setState({markers:shopData})
                            // console.warn(this.state.messages)
                        })
                    }
                    this.setState({markers:shopData})


                });


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
      backgroundColor: '#fff',
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
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 0,
    },
    carouselStyle: {
        padding: 5,
        paddingBottom:0,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "rgba(244,255,244, 1)",
        marginHorizontal: 10,
        margin: 30,
        shadowColor: "rgba(0,72,51, 0.9)",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 0, y: 0 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 16,
        marginTop: 5,
        fontFamily: "Helvetica",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(0,153,102, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(0,153,102, 0.5)",
        position: "absolute",
        borderWidth: 0.5,
        borderColor: "rgba(0,153,102, 0.5)",
    },
});
