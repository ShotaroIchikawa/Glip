/**
 * Sample React Native Share Extension
 * @flow
 */

import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'

import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'

export default class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            type: '',
            value: ''
        }
    }

    async componentDidMount() {
        try {
            const { type, value } = await ShareExtension.data();
            ShareExtension.openURL('glip://');
            this.setState({
                type:type,
                value:value
            });
            Alert.alert("aaa");
        } catch(e) {
            Alert.alert('errrr', e)
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
}