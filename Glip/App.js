/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Linking, AppRegistry} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import firebase from 'firebase';
import HomeTabNavigator from './navigation/HomeTabNavigator';
import Share from "./Share";


AppRegistry.registerComponent('MyShareEx',()=>Share);

//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
export default class App extends React.Component {



  constructor(props){
    super(props);
  }

  // componentDidMount () {
  //   if (Platform.OS === 'android') {
  //     // androidはこのタイミングで起動されたURLを取得できる
  //     Linking.getInitialURL()
  //         .then(url => {
  //           if (url) {
  //             this.openFromUrlScheme(url)
  //           }
  //         })
  //         .catch(e => {
  //           console.log(e)
  //         })
  //   } else if (Platform.OS === 'ios') {
  //     // iosの場合はハンドラを経由する必要があるので追加
  //     Linking.addEventListener('url', this.handleOpenURL)
  //   }
  // }

  componentWillMount(){

    Linking.removeEventListener('url', this.handleOpenURL);
    firebase.initializeApp({
      apiKey: "AIzaSyB2Owpp6Wc8ZZT_z3AcWnglFG7-H8Clbyo",
      authDomain: "gourmetclip-fishers.firebaseapp.com",
      databaseURL: "https://gourmetclip-fishers.firebaseio.com",
      projectId: "gourmetclip-fishers",
      storageBucket: "gourmetclip-fishers.appspot.com",
      messagingSenderId: "828347226659"

    })
  }

  // handleOpenURL = event => {
  //   if (event.url) {
  //     this.openFromUrlScheme(event.url)
  //   }
  // }

  //
  // openFromUrlScheme = url => {
  //   console.log(url)
  //   const parsedUrl = parse(url, true)
  //   if (parsedUrl.protocol === 'myapp:') {
  //     // 任意の画面を開く処理
  //     // この例はreact-native-router-fluxでdebugMenuシーンを開くためのコード
  //     this.props.navigation.navigate('TestHome');
  //   }
  // }



  render() {
    return (
      <AppNavigator/>

    );
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
