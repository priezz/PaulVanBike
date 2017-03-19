import React, { Component } from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
// import Button from 'react-native-button'

import data from '../assets/data.json'
import CategoriesList from './components/CategoriesList'


interface Props {}
interface State {}

export default class App extends Component<Props, State> {
    render() {
        return <View style={styles.container}>
            <CategoriesList items={data}/>
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


// TODO: Publish 'CachedImage' package
