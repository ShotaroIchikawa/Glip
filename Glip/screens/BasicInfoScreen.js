import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity,
    View,
    ListView,
    FlatList,
    Dimensions,
    Linking, WebView,
} from 'react-native';
import MapView,{PROVIDER_GOOGLE,PROVIDER_DEFAULT,Marker} from 'react-native-maps';
import {
    Header,
    SearchBar,
    Button,
    List,
    ListItem, Card,
} from 'react-native-elements';
import firebase from 'firebase'
import "firebase/firestore";
import {NavigationActions} from 'react-navigation';

const {windowWidth,height} = Dimensions.get('window')


const LATITUDE_DELTA = 0.1000
const LONGITUDE_DELTA = 0.1000;

export default class BasicInfoScreen extends React.Component {
     static navigationOptions = {
         //header:null,
         headerTransparent:true,
         headerTintColor:'white',
     }


    constructor(props){
        super(props);
        this.state = {
            shops: [],
            shopRef:this.props.navigation.state.params.shop_ref,

            imageWidth: 375,
            imageHeight: 281,
            shopName:"",
            shopMapUrl:"",
            shopSiteUrl:"",
            phone:"",
            address:"",
            photo:"",
            shopMapGeopoint:{
                lat:"",
                long:""
            },
            shopPhoneNumber:"",
            tweetUrl:"https://twitter.com",
            region: {
                latitude: 38.261304,
                longitude: 140.880196,
                latitudeDelta:LATITUDE_DELTA,
                longitudeDelta: 0.10000,
            },

        };
    }

    async componentDidMount() {
       await this.getShopInfo(this.state.shopRef)
    }



    render() {
        //Image.getSize(require('./img/sampleimg.jpg'),(width,height)=>{Alert.alert(width)})
        return (
            <View style={styles.container}>
                {/*<Header*/}
                    {/*leftComponent={{icon: 'menu', type: 'Feather', color: '#000'}}*/}
                    {/*centerComponent={{text: 'Glip', style: { fontFamily: 'Arial Rounded MT Bold', color: '#000', fontSize: 24}}}*/}
                    {/*rightComponent={{icon: 'notifications-none', type: 'MaterialIcons', color: '#000'}}*/}
                    {/*backgroundColor="#FFEB3B"*/}
                {/*/>*/}
                <ScrollView style={styles.container}>
                    <View style>
                        <Image
                            style ={{width:this.state.imageWidth,height:this.state.imageHeight,}}
                            source ={{uri:this.state.photo}}/>
                    </View>
                    <View style = {{marginBottom:10}}>
                        <Text style={styles.shopTitleTextStyle}>{this.state.shopName}</Text>

                        <Text style ={styles.shopDetailContainer}>
                            <Text style={styles.shopDetailTextStyle}>{(this.state.address==="")? null:" Address: "+this.state.address }
                            </Text>
                        </Text>
                        <Text style ={styles.shopDetailContainer}>
                            <Text style={styles.shopDetailTextStyle} > {(this.state.shopMapUrl==="")? null:"MapUrl: "}
                            </Text>
                            <Text style={styles.shopDetailURLStyle} onPress={() => (this.state.shopMapUrl==="")? null: Linking.openURL(this.state.shopMapUrl)}>
                            {(this.state.shopMapUrl==="")? null:this.state.shopMapUrl}
                            </Text>
                        </Text>
                        <Text style ={styles.shopDetailContainer}>
                            <Text style={styles.shopDetailTextStyle}>{(this.state.shopPhoneNumber==="")? null:" Phone: "+this.state.shopPhoneNumber }
                            </Text>
                        </Text>
                        <Text style ={styles.shopDetailContainer}>
                            <Text style={styles.shopDetailTextStyle}>{(this.state.shopSiteUrl==="")? null:" Website: "}
                            </Text>
                           <Text style={styles.shopDetailURLStyle}>{(this.state.shopSiteUrl==="")? null:this.state.shopSiteUrl}
                           </Text>
                        </Text>

                    </View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{flex:1,position:'relative',height:350}}
                        region={{
                            latitude:this.state.region.latitude,
                            longitude:this.state.region.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}

                    >
                        <Marker
                        //key = {index}
                        coordinate = {{latitude:this.state.region.latitude,longitude:this.state.region.longitude}}
                        title={this.state.shopName}
                        description={(this.state.shopMapUrl==="")? null: this.state.shopMapUrl}
                        onPress={() => (this.state.shopMapUrl==="")? null: Linking.openURL(this.state.shopMapUrl)}
                        />

                    </MapView>

                    <WebView
                        source={{uri:(this.state.tweetUrl==="")?'https://twitter.com':this.state.tweetUrl}}
                        style ={{flex:1,height:height}}
                    />




                </ScrollView>




            </View>
        );
    }

    getShopInfo(shopRef){

                let ref = shopRef
                let tweetRef =""

                ref.get().then((doc)=>{

                    this.setState({
                        shopName:doc.data().name,
                        shopMapUrl:doc.data().map_url,
                        address:doc.data().address,
                        phone:doc.data().phone,
                        photo:doc.data().photos,
                        region:{
                            latitude:doc.data().geopoint._lat,
                            longitude:doc.data().geopoint._long,
                            //  latitude: 38.261304,
                            //                 longitude: 140.880196,
                        },
                        shopPhoneNumber:doc.data().phone,
                        shopSiteUrl:doc.data().website_url,

                    });
                    tweetRef=doc.data().refferred_posts;
                    tweetRef.get().then((doc)=>{
                        this.setState({
                            tweetUrl:doc.data().url,
                        })
                    });
                });


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
        backgroundColor: '#F4EDE0',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        // paddingTop: 30,
        backgroundColor:'#F4EDE0'
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
    shopTextStyle:{
        fontSize:24,
    },
    shopTitleTextStyle:{
        paddingLeft:20,
        paddingTop:20,
        width:340,
        height:50,
        textAlign:'left',
        fontSize:24,
        fontFamily: 'Helvetica'
    },
    shopDetailTextStyle:{

        //paddingLeft:20,
        fontSize:16,
        paddingTop:3,
        fontFamily:'Helvetica',
        color: '#8E8E93'
    },
    shopDetailURLStyle:{


        fontSize:16,
        paddingTop:3,
        fontFamily:'Helvetica',
        color: '#007AFF'
    },
    shopDetailContainer:{

        paddingLeft:20,
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
