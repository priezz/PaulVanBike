import React, { Component } from 'react'
import {
    // Text,
    StyleSheet,
    ScrollView,
} from 'react-native'
import Text from 'react-native-text'

import Categories from './Categories'
import Items from './Items'


interface Props {
    items: any,
    title?: string,
    desc?: string,
    descStyle?: any,
    contentType: string,
}
interface State {}

export default class List extends Component<Props, State> {
    render() {
        const {contentType, desc, descStyle} = this.props
        console.debug("List/render()", contentType)
        return <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
            {desc ? <Text style={[styles.desc, descStyle]}>{desc}</Text> : null}
            {contentType === 'categories' && <Categories {...this.props}/>}
            {contentType === 'items' && <Items {...this.props}/>}
        </ScrollView>
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        paddingBottom: 40,
    } as React.ViewStyle,
    scrollContent: {
        paddingBottom: 30,
    } as React.ViewStyle,
    desc: {
        fontSize: 16,
        fontWeight: '300',
        color: '#778',
        // textAlign: 'justify',
        textAlign: 'left',
        margin: 10,
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 30,
    } as React.TextStyle,
})
