import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import Button from 'react-native-button'

// import data from '../assets/data.json'
import data from '../assets/data.json'


interface Props {}
interface State {}

export default class App extends Component<Props, State> {
    onPress = () => {
        alert("It's working fine")
    }

    render() {
        return <View style={styles.container}>
            {data.map((item: any, i: number) =>
                <View key={i}>
                    <Button onPress={this.onPress}>{item.title}</Button>
                </View>
            )}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    } as React.ViewStyle,

    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    } as React.TextStyle,
})
