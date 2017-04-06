import React, { Component } from 'react'
import {
    // Text,
    Image,
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native'
import Text from 'react-native-text'

import getImage from '../lib/getImage'
import Categories from './Categories'
import Items from './Items'


interface Props {
    items: any,
    title?: string,
    desc?: string,
    image?: string,
    descStyle?: any,
    contentType: string,
}
interface State {}

export default class List extends Component<Props, State> {
    render() {
        const {contentType, desc, descStyle, image} = this.props
        console.debug("List/render()", this.props.title, contentType, image)
        const Desc = image ? Image : View
        // return <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        return <ScrollView style={styles.scrollContainer}>
            {/*{desc ? <Text style={[styles.desc, descStyle]}>{desc}</Text> : null}*/}
            {desc ? <Desc source={getImage(image)} style={image && styles.image} resizeMode='contain'>
                {image && <View style={styles.imageMask}/>}
                <Text style={[styles.desc, descStyle, image && styles.imageText]} ellipsizeMode='tail'>{desc}</Text>
            </Desc> : null}
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
    // scrollContent: {
    //     // paddingBottom: 30,
    // } as React.ViewStyle,
    image: {
        width: '100%',
        height: Dimensions.get('window').width / 3,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 25,
        paddingHorizontal: 5,
    },
    imageMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.3,
        backgroundColor: '#000',
    },
    desc: {
        width: '100%',
        fontSize: 16,
        fontWeight: '300',
        color: '#778',
        // textAlign: 'justify',
        textAlign: 'left',
        paddingHorizontal: 30,
        paddingVertical: 10,
    } as React.TextStyle,
    imageText: {
        color: '#fff',
        maxHeight: Dimensions.get('window').width / 3,
    } as React.TextStyle,,
})
