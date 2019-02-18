import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Feather } from 'react-native-vector-icons/Feather';
import { Icon } from 'react-native-elements';

import ShopMapScreen from "../screens/ShopMapScreen";
import ShopListScreen from "../screens/ShopListScreen";
import TestHomeScreen from "../screens/TestHomeScreen";
import TwitterAuthScreen from "../screens/TwitterAuthScreen";
import SignUpScreen from "../screens/SignUpScreen";
import BasicInfoScreen from "../screens/BasicInfoScreen";
import OriginalTweetScreen from "../screens/OriginalTweetScreen";

const SignUpStack = createStackNavigator(
    {
        SignUp: {screen: SignUpScreen},
        TwitterSignUp:{screen:TwitterAuthScreen},
        BasicInfo:{screen:BasicInfoScreen},
        Home: {
            screen: createBottomTabNavigator(
                {
                    List:{
                        screen: createStackNavigator(
                            {
                                List: {screen: ShopListScreen},
                            },
                        ),
                        navigationOptions: ({ }) => ({
                            tabBarLabel: 'リスト',
                            tabBarIcon:({tintColor}) => (<Icon name='list' type='feather' size={30} color={tintColor}/>)

                        })
                    },
                    Map:{
                        screen: createStackNavigator({
                            Map: {screen: ShopMapScreen},
                        }),
                        navigationOptions: ({ }) => ({
                            tabBarLabel: 'マップ',

                            tabBarIcon:({tintColor}) => (<Icon name='map-pin' type='feather' size={30} color={tintColor}/>)
                        })
                    },

                },
                {
                    tabBarOptions: {
                        activeTintColor: '#03A9F4',
                        inactiveTintColor: 'gray',
                        activeBackgroundColor: '#FFEB3B',
                        inactiveBackgroundColor: '#FFEB3B',
                        showIcon: true,
                        safeAreaInset:{bottom:'never'},
                        style:{height:80},
                        //tabStyle:{height:100},
                        labelStyle:{height:30}
                        // labelStyle:{justifyContent:'flex-start'},
                        // tabStyle:{justifyContent:'flex-start'}



                    }
                }
            ),
            navigationOptions: ({ navigation }) => ({
                header: null,

            }),
        },
        Detail: {
            screen: createBottomTabNavigator(
                {
                    Info:{
                        screen: createStackNavigator({
                            BasicInfo: {screen: BasicInfoScreen},
                        }),
                        navigationOptions: ({ }) => ({
                            tabBarLabel: '基本情報',
                            tabBarIcon:({tintColor}) => (<Icon name='file-text' type='feather' size={30} color={tintColor}/>)
                        })
                    },
                    Picture:{
                        screen: createStackNavigator({
                            Picture: {screen: BasicInfoScreen},
                        }),
                        navigationOptions: ({ }) => ({
                            tabBarLabel: '写真',
                            tabBarIcon:({tintColor}) => (<Icon name='image' type='feather' size={30} color={tintColor}/>)
                        })
                    },
                    Twitter:{
                        screen: createStackNavigator({
                            OriginalTweet: {screen: OriginalTweetScreen},
                        }),
                        navigationOptions: ({ }) => ({
                            tabBarLabel: 'ツイート',
                            tabBarIcon:({tintColor}) => (<Icon name='twitter' type='feather' size={30} color={tintColor}/>)
                        })
                    },
                },
                {
                    tabBarOptions: {
                        activeTintColor: '#03A9F4',
                        inactiveTintColor: 'gray',
                        activeBackgroundColor: '#FFEB3B',
                        inactiveBackgroundColor: '#FFEB3B',
                        showIcon: true,
                        safeAreaInset:{bottom:'never'},
                        style:{height:80},
                        //tabStyle:{height:100},
                        labelStyle:{height:30}
                        // labelStyle:{justifyContent:'flex-start'},
                        // tabStyle:{justifyContent:'flex-start'}
                    }
                }
            ),
            navigationOptions: ({ navigation }) => ({
                header: null,


            }),
        },
},
    {
        initialRouteName: 'SignUp',
    },
    // {
    //     headerMode: 'none',
    //     header: null,
    //     navigationOptions:{
    //         headerVisible: false,
    //      }
    // }
);






export default createAppContainer(SignUpStack);


// const ListStack = createStackNavigator({
//     List: {screen: ShopListScreen},
// });
//
// const MapStack = createStackNavigator({
//     Map: {screen: ShopMapScreen},
// });
//
// const DebugStack = createStackNavigator(
//     {
//         TestHome: {
//             screen: TestHomeScreen,
//         },
//         TwitterAuth:{
//             screen: TwitterAuthScreen,
//         },
//     },
//     {
//         initialRouteName: 'TestHome',
//     });
//
// const TabNavigator = createBottomTabNavigator(
//     {
//         List:{
//             screen: ListStack,
//             navigationOptions:{
//                 tabBarLabel: 'List',
//                 TabBarIcon: ()=> (
//                     <Feather name={"list"} size={20}/>
//                 )
//             }
//         },
//         Map:{
//             screen: MapStack,
//             navigationOptions:{
//                 TabBarIcon: ()=> (
//                     <Feather name={"map-pin"} size={20}/>
//                 )
//             }
//         },
//         Debug:{
//             screen: DebugStack,
//             navigationOptions:{
//                 TabBarIcon: ()=> (
//                     <Feather name={"user"} size={20}/>
//                 )
//             }
//         },
//     },
//     {
//         tabBarOptions: {
//             activeTintColor: '#fea031',
//             inactiveTintColor: 'gray',
//             activeBackgroundColor: '#fff',
//             inactiveBackgroundColor: '#fff',
//         }
//     }
// );
//
//
// export default createAppContainer(TabNavigator);
