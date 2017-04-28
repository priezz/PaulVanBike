import React, { Component } from 'react'
import RN, {
    Text,
    Image,
    View,
    ScrollView,
    Dimensions,
} from 'react-native'
import StyleSheet from 'react-native-extended-stylesheet'

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
        const styles = StyleSheet.create(_styles)
        console.debug("List/render()", this.props.title, contentType)

        const Desc: React.ReactNode = image ? Image : View
        return <ScrollView style={styles.scrollContainer} onLayout={() => this.forceUpdate()}>
            {/*{desc ? <Text style={[styles.desc, descStyle]}>{desc}</Text> : null}*/}
            {desc ? <Desc source={getImage(image)} style={image && styles.image} resizeMode='cover'>
                {image && <View style={styles.imageMask}/>}
                <Text style={[styles.desc, descStyle, image && styles.imageText]} ellipsizeMode='tail'>{desc}</Text>
            </Desc> : null}
            {contentType === 'categories' && <Categories {...this.props}/>}
            {contentType === 'items' && <Items {...this.props}/>}
        </ScrollView>
    }
}

let _styles = {
    $outline: '$debug',
    $width: () => Dimensions.get('window').width,
    $imageHeight: () => Dimensions.get('window').height / 5.5,
    scrollContainer: {
        flex: 1,
        paddingBottom: '40rem',
    } as RN.ViewStyle,
    image: {
        width: () => '$width',
        height: () => '$imageHeight',
        overflow: 'hidden',
        marginTop: '8rem',
        marginBottom: '18rem',
        justifyContent: 'center',
        alignItems: 'center',
    },// as RN.ImageStyle,
    imageMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: () => '$width',
        height: () => '$imageHeight',
        opacity: 0.3,
        backgroundColor: '#000',
    },// as RN.ViewStyle,
    desc: {
        fontSize: '16rem',
        fontFamily: 'UbuntuCondensed-Regular',
        color: '#778',
        textAlign: 'center',
        paddingHorizontal: '22rem',
        paddingTop: '30rem',
        paddingBottom: '15rem',
    },// as RN.TextStyle,
    imageText: {
        color: '#fff',
        maxHeight: () => '$imageHeight',
        paddingVertical: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },// as RN.TextStyle,
}
