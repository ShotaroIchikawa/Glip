import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'
import firebase from "firebase"


import {
    Text,
    View,
    TouchableOpacity, Linking
} from 'react-native'
const userId = "7lsbD8v8w7SbPQcAQkTqMoEwP5P2";
export default class Share extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isOpen: true,
            type: '',
            value: '',
            uid:''

        }
    }

    componentWillMount(){


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
            this.setUnparsedTweet(value);
        } catch(e) {
            console.log('errrr', e)
        }
    }

    onClose = () => ShareExtension.close();

    closing = () => this.setState({ isOpen: false });

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
                    <View style={{ borderColor: 'green', borderWidth: 1, backgroundColor: 'white', height: 200, width: 300 }}>
                        <TouchableOpacity onPress={this.closing}>

                            <Text>Close</Text>
                            <Text>type: { this.state.type }</Text>
                            <Text>value: { this.state.value }</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }



    setUnparsedTweet(url){
        const unparsedRef = this.getTweetsCollection().doc();
        unparsedRef.set({
            "requestUid":userId,
            "tweetUrl":url,
        });
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