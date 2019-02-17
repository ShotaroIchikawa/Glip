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
    FlatList, Dimensions,
} from 'react-native';
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

const {windowWidth} = Dimensions.get('window')
/************************************/
export default class BasicInfoScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


    constructor(props){
        super(props);
        this.state = {
            shops: [],
            shopRef:this.props.navigation.state.params.shop_ref,

            imageWidth: 375,
            imageHeight: 175,
            shopName:"",
            shopMapUrl:"",
            shopSiteUrl:"",
            shopMapGeopoint:{
                lat:"",
                long:""
            },
            shopPhoneNumber:"",


        };
    }

    componentDidMount() {
        this.getShopInfo(this.state.shopRef)
    }



    render() {
        //Image.getSize(require('./img/sampleimg.jpg'),(width,height)=>{Alert.alert(width)})
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{icon: 'menu', type: 'Feather', color: '#000'}}
                    centerComponent={{text: 'Glip', style: { fontFamily: 'Arial Rounded MT Bold', color: '#000', fontSize: 24}}}
                    rightComponent={{icon: 'notifications-none', type: 'MaterialIcons', color: '#000'}}
                    backgroundColor="#FFEB3B"
                />
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View>
                        <Image
                            style ={{width:this.state.imageWidth,height:this.state.imageHeight}}
                            source ={require('./img/sampleimg.jpg')}/>
                    </View>
                    <View style = {{height:170}}>
                        <Text style={styles.shopTitleTextStyle}>{this.state.shopName}</Text>
                        <Text style={styles.shopDetailTextStyle}>
                            Map URL:{this.state.shopMapUrl}</Text>
                        <Text style={styles.shopDetailTextStyle}>Phone: {this.state.shopPhoneNumber}</Text>
                        <Text style={styles.shopDetailTextStyle}>website: {this.state.shopSiteUrl}</Text>

                    </View>




                </ScrollView>




            </View>
        );
    }

    getShopInfo(shopRef){

                let ref = shopRef
                ref.get().then((doc)=>{

                    this.setState({
                        shopName:doc.data().name,
                        shopMapUrl:doc.data().map_url,
                        shopMapGeopoint:{
                            lat:doc.data().geopoint._lat,
                            long:doc.data().geopoint._long,
                        },
                        shopPhoneNumber:doc.data().phone,
                        shopSiteUrl:doc.data().website_url,
                    })

                })
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
        fontSize:36,
    },
    shopDetailTextStyle:{
        fontSize:18,
        color: '#8E8E93'
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
