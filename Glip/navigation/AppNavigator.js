import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';


import HomeTabNavigator from "./HomeTabNavigator";

const Switch = createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html

    Home: HomeTabNavigator,


});



export default createAppContainer(Switch);
