import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import ShopMapScreen from "../screens/ShopMapScreen";
import ShopListScreen from "../screens/ShopListScreen";
import TestHomeScreen from "../screens/TestHomeScreen";
import TwitterAuthScreen from "../screens/TwitterAuthScreen";

const ListStack = createStackNavigator({
    List: {screen: ShopListScreen},
});

const MapStack = createStackNavigator({
    Map: {screen: ShopMapScreen},
});

const DebugStack = createStackNavigator(
    {
        TestHome: {
            screen: TestHomeScreen,
        },
        TwitterAuth:{
            screen: TwitterAuthScreen,
        },
    },
    {
        initialRouteName: 'TestHome',
    });

const TabNavigator = createBottomTabNavigator(
    {
        List:{
            screen: ListStack,
            navigationOptions:{
                tabBarLabel: 'List',
                TabBarIcon: ()=> (
                    <Feather name={"list"} size={20}/>
                )
            }
        },
        Map:{
            screen: MapStack,
            navigationOptions:{
                TabBarIcon: ()=> (
                    <Feather name={"map-pin"} size={20}/>
                )
            }
        },
        Debug:{
            screen: DebugStack,
            navigationOptions:{
                TabBarIcon: ()=> (
                    <Feather name={"user"} size={20}/>
                )
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: '#fea031',
            inactiveTintColor: 'gray',
            activeBackgroundColor: '#fff',
            inactiveBackgroundColor: '#fff',
        }
    }
);


export default createAppContainer(TabNavigator);
