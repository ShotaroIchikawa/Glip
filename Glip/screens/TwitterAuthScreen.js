import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Linking,Alert,Button,WebView} from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

export default class TwitterAuthScreen extends React.Component {

    static navigationOptions = {

    };

    constructor(props){
        super(props);
        this.state ={
            test:"for linking test",


        }
    }

    render() {
        return (
            //{/*<View style={styles.container}>*/}
                <WebView
                    source={{uri:"https://us-central1-gourmetclip-fishers.cloudfunctions.net/twitter_oauth?scheme=glip://"}}
                    style ={{marginTop:20}}
                />
                // {/*<Text style={styles.welcome}>This is TwitterAuth Screen</Text>*/}
                //
                // {/*<Button*/}
                //
                //     {/*title="Open WebBrowser"*/}
                //     {/*onPress={this._handlePressButtonAsync}*/}
                // {/*/>*/}


            // </View>
        );
    }

    componentDidMount() {
        //Linking.addEventListener('url', this._handleRedirectTwitterAuth);
        Linking.addEventListener('url',this._handleRedirectTwitterAuth);
    }

    componentWillUnmount(){
        Linking.removeEventListener('url',this._handleRedirectTwitterAuth);

    }

    _handleRedirectTwitterAuth = event => {

        //Alert.alert("oauthtoken"+this.getParam("screen_name",event.url));
        //this.signInWithTwitterAsync(this.getParam("oauth_token",event.url),this.getParam("oauth_token_secret",event.url));
        //this.setTwitterAccounts((this.getParam("oauth_token",event.url)),this.getParam("oauth_token_secret",event.url),this.getParam("user_id",event.url),this.getParam("screen_name",event.url));
        this.signInWithTwitterAsync((this.getParam("oauth_token",event.url)),this.getParam("oauth_token_secret",event.url),this.getParam("user_id",event.url),this.getParam("screen_name",event.url));

        console.log(event);
    };




    async signInWithTwitterAsync(token,secret){
        try{
            const credential = firebase.auth.TwitterAuthProvider.credential(token,secret);
            firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then(res=>{
                    //this.setState({test:res})
                })
                .catch(error=>{
                    console.log("firebase cred err:",error);

                });

        }
        catch(e){
            console.log("error");
            return{error:true};}
    }




    async signInWithTwitterAsync(token,secret,user_id,screen_name){
        try{
            const credential = firebase.auth.TwitterAuthProvider.credential(token,secret);
            firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then(data=>{

                    //Alert.alert("finished: "+data.user.uid);
                   this.createTwitterAccounts(data.user.uid,token,secret,user_id,screen_name);

                })
                .catch(error=>{
                    console.log("firebase cred err:",error);

                });

        }
        catch(e){
            console.log("error");
            return{error:true};}
    }


    _handlePressButtonAsync = async () => {

        try {
            //Linking._addEventListener('url',this._handleOpenURL);


            // let myurl = Linking.makeUrl('path/into/app');
            // let myurl_encoded = this.fixedEncodeURIComponent(myurl);

            let oauth_url = "https://us-central1-gourmetclip-fishers.cloudfunctions.net/twitter_oauth?scheme=" +
                "glip://";


            console.log("oauth url is: " + oauth_url + "\n");
            Linking.openURL(oauth_url).catch((err) => console.error('An error occurred', err));
            //let result = await WebBrowser.openBrowserAsync(oauth_url);

        }
        catch(error){
            alert(error);
            console.log(error);
        }
    }

    /**
     * Get the URL parameter value
     *
     * @param  name {string} パラメータのキー文字列
     * @return  url {url} 対象のURL文字列（任意）
     */
    getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    //This will be used when firebase signin with twitter firstly
    createTwitterAccounts=(firebase_uid,token,token_secret,user_id,screen_name)=>{
        const ref = this.userCollection.doc(firebase_uid).collection("twitter_accounts").doc("auth");
        ref.set({
                "oauthToken":token,
                "oauth_Token_secret":token_secret,
                "user_id":user_id,
                "screen_name":screen_name,

            }
        );
        this.props.navigation.navigate('TestHome');
    }

    //This will  be used when user_id of firebase already known
    setTwitterAccounts=(token,token_secret,user_id,screen_name)=>{
        const ref = this.userCollection.doc(this.uid).collection("twitter_accounts").doc("auth");
        ref.set({
                "oauthToken":token,
                "oauth_Token_secret":token_secret,
                "user_id":user_id,
                "screen_name":screen_name,

            }
        );
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});