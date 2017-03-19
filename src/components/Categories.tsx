import React, { Component } from 'react'
import {
    StyleSheet,
    // Text,
    View,
    TouchableOpacity,
} from 'react-native'
import Text from 'react-native-text'
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

export default class Categories extends Component<Props, State> {
    nextView = (item: any): void => {
        /* Add 'item.title' (which is ignored by the router) in the end of the route for reactivity */
        const {title = ''} = this.props
        console.log("Categories/nextView", title, item.title)
        if(item.type) router.go(`/content/${item.title}`, {
            items: item.items,
            contentType: item.type,
            desc: item.desc || '',
            title: (title ? title + ' / ' : '') + (item.title || ''),
        })
    }

    itemsCount = (item: any): number => {
        // console.log("Categories/itemsCount()", item.title)
        return item.type === 'items'
            ? item.items.length
            : item.items.reduce((acc, i) => acc + this.itemsCount(i), 0)
    }

    render() {
        const {items = []} = this.props
        let haveIcons = false
        items.forEach((item: Object) => {
            if(item.icon) haveIcons = true
        })
        console.debug("Categories/render()", haveIcons)

        return <View>
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
        </View>
    }
}

const styles = StyleSheet.create({
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
    title: {
        fontSize: 17,
        fontWeight: '100',
        paddingLeft: 10,
        color: '#555',
    } as React.TextStyle,
    itemsCount: {
        fontSize: 12,
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
        fontWeight: '100',
        color: '#777',
    }
})
