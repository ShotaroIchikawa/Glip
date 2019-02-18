import React, {Fragment} from 'react';
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
    SafeAreaView,

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


/************************************/
export default class ShopListScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


    constructor(props){
        super(props);
        this.state = {
            shops: [],
            shopRef:[],


        };
    }

    componentDidMount(){

        this.getUserShopGroup();
    }



    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor:'#FFEB3B'}}>
            <View style={styles.container}>
                <Header
                    leftComponent={{icon: 'menu', type: 'Feather', color: '#000'}}
                    centerComponent={{text: 'Glip', style: { fontFamily: 'Arial Rounded MT Bold', color: '#000', fontSize: 24}}}
                    rightComponent={{icon: 'notifications-none', type: 'MaterialIcons', color: '#000'}}
                    backgroundColor="#FFEB3B"
                />




                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <SearchBar
                        //lightTheme
                        round
                        containerStyle={{backgroundColor:'#F4EDE0',borderBottomColor:'transparent',
                            borderTopColor:'transparent',
                        }}
                        inputStyle={{backgroundColor:'white'}}

                        placeholder='お店を検索'
                    />
                    {/*<View style={styles.buttons}>*/}
                        {/*<Text>aaaaas</Text>*/}

                    {/*</View>*/}
                    {this.ShowShopList()}


                </ScrollView>


            </View>
            </SafeAreaView>

        );
    }

    ShowShopList(){
        const list = this.state.shops;
        return(
            <List containerStyle ={{backgroundColor:'#F4EDE0'}}>{

                 list.map((l) => (
                    // <ListItem
                    //     key={l.name}
                    //     title={l.name}
                    //    onPress={()=>Alert.alert("pushed")}
                    // />
                    <TouchableOpacity onPress={()=>
                        this.props.navigation.dispatch(NavigationActions.navigate({routeName:'BasicInfo',params:{shop_ref:l.shop_ref}}))}>
                     <Card
                         image = {require('./img/sampleimg.jpg')}
                         imageWrapperStyle ={{margin:10}}

                         key={l.name}
                         //title={l.name}
                         containerStyle={{margin:5,marginBottom:10, borderRadius: 5}}
                         //下を帰る必要あり

                        // onPress={()=>this.props.navigation.dispatch(NavigationActions.navigate({routeName:'BasicInfo',params:{shop_ref:l.shop_ref}}))}
                     >
                         <Text style={styles.shopTextStyle}>{l.name}</Text>
                     </Card>
                    </TouchableOpacity>
                 ))

            }
            </List>

        )
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

            let shopName=[];
            for(let i=0;i<data.length;i++) {


                let ref = data[i].ref;
                ref.get().then((doc)=>{
                   // console.warn(doc.data().name);
                    //console.warn(doc.data().geopoint._long);
                    //let data = this.state.messages;

                    shopName.push({
                        name:doc.data().name,
                        shop_ref:ref

                    })
                    this.setState({shops:shopName})
                    // console.warn(this.state.messages)
                })
            }

            this.setState({shops:shopName})

            // for(let i=0;i<geopoint.length;i++) {
            //     console.warn(geopoint[i]._lat)
            // }

        });


    };

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
