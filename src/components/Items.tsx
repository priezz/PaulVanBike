import React, { Component } from 'react'
import RN, {
    Text,
    View,
    Image,
    Dimensions,
    Platform,
} from 'react-native'
import StyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    Grid,
    Col,
} from 'react-native-easy-grid'

import getImage from '../lib/getImage'
import Link from '../components/Link'
import LightBox from './LightBox'


interface Props {
    items: any,
    title?: string,
    desc?: string,
}

interface State {}

export default class Items extends Component<Props, State> {
    onRotate = () => this.forceUpdate()

    render() {
        const {items = []} = this.props
        // console.debug("CategoriesList/render()", haveIcons)

        const activeImageWidth = Math.min(Dimensions.get('window').width, Dimensions.get('window').height)
        return <View onLayout={this.onRotate}>
            {items.map((item: any, i: number) =>
                <View key={i} style={styles.item}>
                    <Text style={styles.itemTitle}>{item.title.toUpperCase()}</Text>
                    <View style={styles.itemContent}>
                        {item.image ? <View style={styles.lightBoxContainer}>
                            <LightBox underlayColor='transparent'
                                      backgroundColor='rgba(0,0,0, 0.9)'
                                      swipeToDismiss={true}
                                      activeProps={{
                                             width: activeImageWidth,
                                             height: activeImageWidth,
                                             margin: 0,
                                             marginVertical: 0,
                                             marginTop: 0,
                                             marginBottom: 0,
                                             marginHorizontal: 0,
                                             marginLeft: 0,
                                             marginRight: 0,
                                             padding: 0,
                                             paddingVertical: 0,
                                             paddingTop: 0,
                                             paddingBottom: 0,
                                             paddingHorizontal: 0,
                                             paddingLeft: 0,
                                             paddingRight: 0,
                                        } as RN.ViewStyle}
                            >
                                <Image source={getImage(item.image)} style={styles.itemImage} resizeMode='cover'/>
                            </LightBox>
                        </View> : null}
                        <Text style={styles.itemDesc}>{item.desc}</Text>
                    </View>
                    <Grid style={styles.itemDetails}>
                        <Col size={60}>
                            {item.pricetag ? <Text style={styles.itemDetailsText}>Ценник: {item.pricetag}</Text> : null}
                            {item.address ? <Text style={styles.itemDetailsText}>Адрес: {item.address}</Text> : null}
                            {item.phone ? <Text style={styles.itemDetailsText}>Телефон: {item.phone}</Text> : null}
                        </Col>
                        <Col size={40} style={[styles.right, styles.itemDetailsIcons]}>
                            {item.address ? <Link address={item.address + ', Den Haag, Nederland'}>
                                <Icon name='ios-map-outline' style={styles.itemIcon}/>
                            </Link>: null}
                            {item.website ? <Link href={item.website}>
                                <Icon name='ios-globe-outline' style={styles.itemIcon}/>
                            </Link>: null}
                            {item.phone ? <Link phone={item.phone}>
                                <Icon name='ios-call-outline' style={styles.itemIcon}/>
                            </Link>: null}
                        </Col>
                    </Grid>
                </View>
            )}
        </View>
    }
}

const styles = StyleSheet.create({
    $outline: '$debug',
    centered: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        justifyContent: 'flex-start',
    },
    right: {
        justifyContent: 'flex-end',
    },
    item: {
        // marginHorizontal: 30,
        marginHorizontal: '30rem',
        // marginTop: 25,
        marginTop: '20rem',
        // marginBottom: 15,
        marginBottom: '20rem',
    } as RN.ViewStyle,
    itemContent: {
        flexDirection: 'row',
        // paddingVertical: 12,
        paddingVertical: '12rem',
    } as RN.ViewStyle,
    itemDetails: {
        alignItems: 'center',
    } as RN.ViewStyle,
    itemDetailsIcons: {
        flexDirection: 'row',
    } as RN.ViewStyle,
    itemTitle: {
        // fontSize: 17,
        fontFamily: 'Ubuntu-Bold',
        // fontFamily: Platform.OS === 'ios' ? 'Ubuntu' : 'Ubuntu-Regular',
        // fontWeight: 'bold',
        fontSize: '17rem',
        color: '#000',
    },// as RN.TextStyle,
    itemDesc: {
        // fontSize: 18,
        fontSize: '17rem',
        fontFamily: 'UbuntuCondensed-Regular',
        color: '#444',
        flex: 1,
        flexWrap: 'wrap',
    },// as RN.TextStyle,
    itemImage: {
        // width: 90,
        width: '85rem',
        // height: 90,
        height: '85rem',
        // marginTop: 1,
        // marginRight: 10,
        marginRight: '8rem',
        // marginBottom: 10,
        // marginBottom: '10rem',
    },// as RN.ImageStyle,
    itemDetailsText: {
        // fontSize: 14,
        fontSize: '14rem',
        // fontWeight: '100',
        fontFamily: 'Ubuntu-Light',
        color: '#777',
    },// as RN.TextStyle,
    itemIcon: {
        // fontSize: 28,
        fontSize: '28rem',
        fontWeight: '700',
        // color: '#444',
        color: '#71A6D0',
        // marginHorizontal: 10,
        marginHorizontal: '10rem',
    },// as RN.TextStyle,
    forwardIcon: {
        // fontSize: 18,
        fontSize: '18rem',
        color: '#555',
    },// as RN.TextStyle,
    lightBoxContainer: {
        // width: 90,
        width: '90rem',
        // height: 90,
        height: '90rem',
        // marginTop: 6,
        // marginTop: 5,
        marginTop: '5rem',
        // marginRight: 10,
        marginRight: '10rem',
        // marginBottom: 10,
        marginBottom: '10rem',
    },
    lightBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    } as RN.ViewStyle,
})
