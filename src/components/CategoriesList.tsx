import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native'
// import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    Grid,
    Col,
    Row,
} from 'react-native-easy-grid'

import router from '../lib/router'


interface Props {
    items: any,
    title?: string,
    desc?: string,
    descStyle?: any,
}

interface State {}

export default class CategoriesList extends Component<Props, State> {
    nextView = (item: any): void => {
        /* Add 'item.title' (which is ignored by the router) in the end of the route for reactivity */
        const {title = ''} = this.props
        console.log("CategoriesList/nextView", title, item.title)
        if(item.type) router.go(`/content/${item.title}`, {
            items: item.items,
            contentType: item.type,
            desc: item.desc || '',
            title: (title ? title + ' / ' : '') + (item.title || ''),
        })
    }

    itemsCount = (item: any): number => {
        // console.log("CategoriesList/itemsCount()", item.title)
        return item.type === 'items'
            ? item.items.length
            : item.items.reduce((acc, i) => acc + this.itemsCount(i), 0)
    }

    render() {
        const {items = [], desc = '', descStyle} = this.props
        let haveIcons = false
        items.forEach((item: Object) => {
            if(item.icon) haveIcons = true
        })
        // console.debug("CategoriesList/render()", haveIcons)

        return <ScrollView style={styles.container} contentContainerStyle={styles.scrollView}>
            {desc ? <Text style={[styles.desc, descStyle]}>{desc}</Text> : null}
            {items.map((item: any, i: number) =>
                (item.items || []).length
                    ? <View key={i} style={styles.row}>
                        {haveIcons && <Col size={15} style={[styles.centered, styles.left]}>
                            {item.icon && <Icon name={`ios-${item.icon}-outline`} color={item.iconColor || '#71A6D0'} style={styles.icon}/>}
                        </Col>}
                        <Col size={haveIcons ? 70: 85} style={[styles.centered, styles.underlined, styles.left]}>
                            <TouchableOpacity style={styles.listItem} onPress={() => this.nextView(item)}>
                                <Text style={styles.title}>{item.title}</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col size={15} style={[styles.centered, styles.underlined, styles.right]}>
                            <Text style={styles.itemsCount}>{this.itemsCount(item)}</Text>
                            <Icon name='ios-arrow-forward' style={styles.forwardIcon}/>
                        </Col>
                    </View>
                    : null
            )}
        </ScrollView>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: 30,
    } as React.ViewStyle,
    scrollView: {
        // paddingBottom: 30,
    } as React.ViewStyle,
    row: {
        height: 50,
        flexDirection: 'row',
        marginHorizontal: 40,
    } as React.ViewStyle,
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
    underlined: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    listItem: {
        width: '100%',
    } as React.ViewStyle,
    desc: {
        fontSize: 14,
        fontWeight: '400',
        color: '#888',
        textAlign: 'justify',
        margin: 10,
        marginVertical: 20,
        marginHorizontal: 40,
    } as React.TextStyle,
    title: {
        fontSize: 17,
        fontWeight: '100',
        paddingLeft: 10,
        color: '#666',
    } as React.TextStyle,
    itemsCount: {
        fontSize: 11,
        fontWeight: '200',
        paddingRight: 10,
        color: '#3a83bf',
    } as React.TextStyle,
    icon: {
        fontSize: 26,
        fontWeight: '700',
    } as React.TextStyle,
    forwardIcon: {
        fontSize: 18,
        color: '#555',
    }
})
