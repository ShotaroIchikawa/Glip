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
    ImageBackground,
} from 'react-native';
import{
    Button,
    FormLabel,
    FormInput,
} from 'react-native-elements';

import firebase from "firebase";
import {NavigationActions, StackActions} from 'react-navigation';

const goHome = StackActions.reset({
    index:0,
    actions:[NavigationActions.navigate({routeName:'Home'})],
});

/************************************/
export default class SignUpScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


    constructor(props){
        super(props);
        this.state = {email: '', pass: ''};


    }

    componentDidMount(){


    }

    render() {
        const {email, pass} = this.state;

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.ImageBackground} source={require('./img/titleImg3.png')}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Glip</Text>
                    </View>
                    <View style={styles.inputArea}>
                        <FormLabel>E-mail address</FormLabel>
                        <FormInput
                            onChangeText={email => this.setState({email})}
                            value={email}/>

                        <FormLabel>Password</FormLabel>
                        <FormInput
                            onChangeText={pass => this.setState({pass})}
                            value={pass}/>
                    </View>
                    <View style={styles.buttonArea}>
                        <Button
                            rounded
                            buttonStyle={styles.signUpButton}
                            onPress={()=>this.props.navigation.dispatch(goHome)}
                            title='Sign up'
                            backgroundColor="#fea031"
                            containerViewStyle={{ marginBottom: 20}}
                            textStyle={{fontSize: 20}}
                        />
                        <Button
                            rounded
                            buttonStyle={styles.signUpButton}
                            onPress={()=>Alert.alert("Google Sign in")}
                            rightIcon={{name: 'google', type: 'font-awesome'}}
                            title='Sign up with Google'
                            backgroundColor="#db4437"
                            containerViewStyle={{ marginBottom: 20}}
                            textStyle={{fontSize: 20}}
                        />
                        <Button
                            rounded
                            buttonStyle={styles.signUpButton}
                            onPress={()=>this.props.navigation.navigate('TwitterSignUp')}
                            rightIcon={{name: 'twitter', type: 'font-awesome'}}
                            title='Sign up with Twitter'
                            backgroundColor="#1da1f2"
                            containerViewStyle={{ marginBottom: 20}}
                            textStyle={{fontSize: 20}}
                        />

                    </View>
                </ImageBackground>
            </View>




        )
    }

    get uid(){
        return (firebase.auth().currentUser||{}).uid;
    }

    get name(){
        return (firebase.auth().currentUser||{}).displayName;
    }


}


const styles = StyleSheet.create({
    ImageBackground:{
        flex: 1,
        width: '100%',
        height: '100%',
    },
    title:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText:{
        top: 130,
        fontSize: 60,
        fontFamily: 'Arial Rounded MT Bold',
        color: '#000',
    },
    inputArea:{
        flex: 2,
        justifyContent: 'flex-end',
    },
    buttonArea:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '5%',
    },
    signUpButton:{
        width: 250,
        //height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 10,
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
