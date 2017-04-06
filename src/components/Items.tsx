import React, { Component } from 'react'
import {
    StyleSheet,
    // Text,
    View,
    Image,
} from 'react-native'
import Text from 'react-native-text'
// import Icon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Foundation'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    Grid,
    Col,
    Row,
} from 'react-native-easy-grid'

import getImage from '../lib/getImage'
import Link from '../components/Link'


interface Props {
    items: any,
    title?: string,
    desc?: string,
}

interface State {}

export default class Items extends Component<Props, State> {
    render() {
        const {items = []} = this.props
        // console.debug("CategoriesList/render()", haveIcons)

        return <View>
            {items.map((item: any, i: number) =>
                <View key={i} style={styles.item}>
                    <Text style={styles.itemTitle}>{item.title.toUpperCase()}</Text>
                    <View style={styles.itemContent}>
                        {item.image ? <Image source={getImage(item.image)} style={styles.itemImage} resizeMode='cover'/> : null}
                        <Text style={styles.itemDesc}>{item.desc}</Text>
                    </View>
                    <Grid>
                        <Col size={70}>
                            {item.pricetag ? <Text style={styles.itemDetails}>Ценник: {item.pricetag}</Text> : null}
                            {item.address ? <Text style={styles.itemDetails}>Адрес: {item.address}</Text> : null}
                            {item.phone ? <Text style={styles.itemDetails}>Телефон: {item.phone}</Text> : null}
                        </Col>
                        <Col size={30} style={[styles.right, styles.itemDetailsBox]}>
                            {item.address ? <Link address={item.address + ', Den Haag, Nederland'}>
                                <Icon name='compass' style={styles.itemIcon}/>
                                {/*<Icon name='google-maps' style={styles.itemIcon}/>*/}
                                {/*<Icon name='navigation' style={styles.itemIcon}/>*/}
                            </Link>: null}
                            {item.website ? <Link href={item.website}>
                                <Icon name='web' style={styles.itemIcon}/>
                            </Link>: null}
                            {item.phone ? <Link phone={item.phone}>
                                <Icon name='telephone' style={styles.itemIcon}/>
                                {/*<Icon name='cellphone-android' style={styles.itemIcon}/>*/}
                            </Link>: null}
                        </Col>
                    </Grid>
                </View>
            )}
        </View>
    }
}

const styles = StyleSheet.create({
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
        marginHorizontal: 30,
        marginTop: 30,
    } as React.ViewStyle,
    itemContent: {
        flexDirection: 'row',
        paddingVertical: 8,
    } as React.ViewStyle,
    itemDetailsBox: {
        flexDirection: 'row',
    } as React.ViewStyle,
    itemTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
    } as React.TextStyle,
    itemDesc: {
        fontSize: 16,
        fontWeight: '300',
        // textAlign: 'justify',
        color: '#444',
        flex: 1,
        flexWrap: 'wrap',
    } as React.TextStyle,
    itemImage: {
        width: 90,
        height: 90,
        marginTop: 6,
        marginRight: 10,
        marginBottom: 10,
    },
    itemDetails: {
        fontSize: 14,
        fontWeight: '100',
        color: '#888',
    } as React.TextStyle,
    itemIcon: {
        fontSize: 26,
        fontWeight: '700',
        // color: '#444',
        color: '#71A6D0',
        marginHorizontal: 8,
    } as React.TextStyle,
    forwardIcon: {
        fontSize: 18,
        color: '#555',
    }
})
