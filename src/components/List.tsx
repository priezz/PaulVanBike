import React, { Component } from 'react'
import RN, {
    Text,
    Image,
    View,
    ScrollView,
    Dimensions,
} from 'react-native'
// import Text from 'react-native-text'
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
    // onRotate = () => this.forceUpdate()
    // onRotate = () => {
    //     console.debug("List/onRotate()", Dimensions.get('window').width)
    //     setTimeout(() => this.forceUpdate(), 1000)
    // }

    render() {
        const {contentType, desc, descStyle, image} = this.props
        const styles = StyleSheet.create(_styles)
        // console.debug("List/render()", this.props.title, contentType, styles._image.height)

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
    // $imageHeight: () => Math.min(Dimensions.get('window').width, Dimensions.get('window').height) / 5,
    $imageHeight: () => Dimensions.get('window').height / 5.5,
    scrollContainer: {
        flex: 1,
        // paddingBottom: 40,
        paddingBottom: '40rem',
    } as RN.ViewStyle,
    image: {
        width: () => '$width',
        height: () => '$imageHeight',
        overflow: 'hidden',
        // marginTop: 10,
        marginTop: '8rem',
        // marginBottom: 25,
        marginBottom: '18rem',
        // paddingHorizontal: 5,
        // paddingHorizontal: '5rem',
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
        // fontSize: 17,
        fontSize: '16rem',
        fontFamily: 'UbuntuCondensed-Regular',
        color: '#778',
        textAlign: 'center',
        // paddingHorizontal: 30,
        paddingHorizontal: '22rem',
        // paddingVertical: 10,
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
