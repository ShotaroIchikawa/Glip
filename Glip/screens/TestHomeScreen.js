import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';

export default class TestHomeScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>This is TestHome Screen</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Button
                    title ="Go Twitter Auth"
                    onPress={()=>this.props.navigation.navigate('TwitterAuth')}
                //
                //     {/*title="Open WebBrowser"*/}
                //     {/*onPress={this._handlePressButtonAsync}*/}
                />
            </View>
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