/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Share from './Share';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('MyShareEx',()=>Share);
