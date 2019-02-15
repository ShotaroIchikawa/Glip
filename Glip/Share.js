import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'
import firebase from "firebase"
import {AsyncStorage,StyleSheet,Alert} from "react-native"
import {Card,Button} from 'react-native-elements'
import SharedGroupPreferences from 'react-native-shared-group-preferences'
import {
    Text,
    View,
    TouchableOpacity, Linking
} from 'react-native'
let userId = "";

const appGroupIdentifier = "group.com.glip";

export default class Share extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isOpen: true,
            type: '',
            value: "aa",
            uid:'7lsbD8v8w7SbPQcAQkTqMoEwP5P2',

        }

    }




    async loadUsernameFromSharedStorage() {
        try {
            const loadedData = await SharedGroupPreferences.getItem("userId", appGroupIdentifier)
           this.setState({uid:loadedData})
        } catch(errorCode) {
            // errorCode 0 = no group name exists. You probably need to setup your Xcode Project properly.
            // errorCode 1 = there is no value for that key
            return errorCode;
        }
    }

    getUserId = async () => {

        try{
            const value = await AsyncStorage.getItem('userId');
            if(value !== null){
                this.setState({uid:value});

            }else{
                this.setState({uid:"ValueIsNull"});
            }
        }catch(error){
            console.log(error);
            this.setState({uid:"CatchError"});
    }

    }


    componentWillMount(){

        //this.getUserId();


        firebase.initializeApp({
            apiKey: "AIzaSyB2Owpp6Wc8ZZT_z3AcWnglFG7-H8Clbyo",
            authDomain: "gourmetclip-fishers.firebaseapp.com",
            databaseURL: "https://gourmetclip-fishers.firebaseio.com",
            projectId: "gourmetclip-fishers",
            storageBucket: "gourmetclip-fishers.appspot.com",
            messagingSenderId: "828347226659"

        })
    }



    async componentDidMount() {
        try {

            const { type, value } = await ShareExtension.data()
            this.setState({
                type,
                value
            })

        } catch(e) {
            console.log('errrr', e)
        }
    }

    onClose = () => ShareExtension.close();

    closing = () => this.setState({ isOpen: false });

    onShare = async () => {
        //ここにURLを投げる処理周りを
       // const loadedData =await SharedGroupPreferences.getItem("userId", appGroupIdentifier)

        this.setUnparsedTweet(this.state.uid,this.state.value);


    }

    render() {
        return (
           <Modal
                backdrop={false}
                style={{ backgroundColor: 'transparent' }}
                position="center"
                isOpen={this.state.isOpen}
                onClosed={this.onClose}
            >
                <View style={{ alignItems: 'center', justifyContent:'center', flex: 1 }}>
                    <Card
                        title={'Share with Glip'}
                        containerStyle={{width:300,borderRadius: 10,borderColor:'#007AFF'}}
                    >
                        <Text>Share Link For Glip</Text>
                        <Text>Share URL: {this.state.value}</Text>

                        <View style ={{flexDirection:'row', justifyContent: 'space-between',}}>
                            <Button
                                color = '#007AFF'
                                backgroundColor="white"
                                title='Cancel'
                                style={styles.button}
                                onPress ={this.closing}
                            />

                            <Button
                                color = '#007AFF'
                                backgroundColor="white"
                                title='Share'
                                style={styles.button}
                                onPress={this.onShare}
                            />

                        </View>

                    </Card>

                </View>
            </Modal>
        );
    }



     setUnparsedTweet(uid,url){
        const userId = uid;
        const unparsedRef = this.getTweetsCollection().doc();
        unparsedRef.set({
            "post_url":userId,
            "request_uid":url,
        });
        this.closing();
        //Alert.alert("successfully seneded", {text: 'OK', onPress: this.closing},);
        //  Alert.alert(
        //      'Success!',
        //      'your url is correctly shared',
        //      [
        //
        //          {text: 'OK', onPress: this.closing},
        //      ],
        //      { cancelable: false }
        //  )
    }

    getUnparsedDoc(){
        return this.getTweetsCollection().doc("unparsed");
    }

    getTweetsCollection(){
        return firebase.firestore().collection("parse_requests");
    }

    //ショートカット用の変数
    get userCollection(){
        return firebase.firestore().collection("users");
    }

    get uid(){
        return (firebase.auth().currentUser||{}).uid;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width:100,


    }
});