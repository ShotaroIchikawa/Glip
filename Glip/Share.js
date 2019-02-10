import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'
import firebase from "firebase"
import {AsyncStorage,StyleSheet,Alert} from "react-native"
import {Card,Button} from 'react-native-elements'


import {
    Text,
    View,
    TouchableOpacity, Linking
} from 'react-native'
let userId = "";
export default class Share extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            isOpen: true,
            type: '',
            value: "https://bagelee.com/programming/react-native/react-native-layout/",
            uid:"aaa",

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

        this.getUserId();


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

    onShare = () => {
        //ここにURLを投げる処理周りを
        this.setUnparsedTweet(this.state.value);


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
                        <Text>userId:{this.state.uid}</Text>
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
                   {/*<View style={{ borderColor: 'green', borderWidth: 1, backgroundColor: 'white', height: 200, width: 300 }}>*/}
                        {/*<TouchableOpacity onPress={this.closing}>*/}

                            {/*<Text>Close</Text>*/}
                            {/*<Text>type: { this.state.type }</Text>*/}
                            {/*<Text>value: { this.state.value }</Text>*/}

                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                </View>
            </Modal>
        );
    }



     setUnparsedTweet(url){
        const userId = this.state.uid;
        const unparsedRef = this.getTweetsCollection().doc();
        unparsedRef.set({
            "requestUid":userId,
            "tweetUrl":url,
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