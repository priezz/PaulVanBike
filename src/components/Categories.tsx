import React, { Component } from 'react'
import RN, {
    Text,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native'
import StyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    Col,
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
        console.log("Categories/nextView()", title, item.title)
        if(item.type) router.go(`/content/${item.title}`, {
            items: item.items,
            contentType: item.type,
            desc: item.desc || '',
            title: (title ? title + ' / ' : '') + (item.title || ''),
            image: item.image,
        })
    }

    itemsCount = (item: any): number => {
        // console.log("Categories/itemsCount()", item.title)
        return item.type === 'items'
            ? item.items.length
            : item.items.reduce((acc: number, i: number) => acc + this.itemsCount(i), 0)
    }

    render() {
        const {items = []} = this.props
        let haveIcons: boolean = false
        items.forEach((item: any) => {
            if(item.icon) haveIcons = true
        })
        // console.debug("Categories/render()", haveIcons)

        return <View>
            {items.map((item: any, i: number) =>
                (item.items || []).length
                    ? <TouchableOpacity key={i} style={styles.row} onPress={() => this.nextView(item)}>
                        {haveIcons && <Col size={15} style={[styles.centered]}>
                            {item.icon && <Icon name={`ios-${item.icon}-outline`} color={item.iconColor || '#71A6D0'} style={styles.icon}/>}
                        </Col>}
                        <Col size={haveIcons ? 70: 85} style={[styles.centered, i < items.length - 1 && styles.underlined, styles.left, styles.itemTitleBox]}>
                            <Text style={styles.itemTitle}>{item.title.replace(/\s+/g, ' ').trim()}</Text>
                        </Col>
                        <Col size={15} style={[styles.centered, i < items.length - 1 && styles.underlined, styles.right]}>
                            <Text style={styles.itemsCount}>{this.itemsCount(item)}</Text>
                            <Icon name='ios-arrow-forward' style={styles.forwardIcon}/>
                        </Col>
                    </TouchableOpacity>
                    : null
            )}
        </View>
    }
}

const styles = StyleSheet.create({
    $outline: '$debug',
    row: {
        height: '46rem',
        flexDirection: 'row',
        marginHorizontal: '30rem',
    },// as RN.ViewStyle,
    centered: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    left: {
        justifyContent: 'flex-start',
    },
    right: {
        justifyContent: 'flex-end',
    },
    underlined: {
        borderBottomWidth: '1rem',
        borderBottomColor: '$color.underline',
    },
    listItem: {
        width: '100%',
    },// as RN.ViewStyle,
    itemTitleBox: {
        paddingHorizontal: '10rem',
    },
    itemTitle: {
        fontSize: '16rem',
        fontFamily: Platform.OS === 'ios' ? 'Ubuntu' : 'Ubuntu-Regular',
        fontWeight: 'normal',
        color: '$color.normalText',
    },// as RN.TextStyle,
    itemsCount: {
        fontSize: '11rem',
        fontWeight: '200',
        paddingRight: '10rem',
        color: '$color.ultraLightText',
    },// as RN.TextStyle,
    icon: {
        fontSize: '25rem',
        fontWeight: '700',
    },// as RN.TextStyle,
    forwardIcon: {
        fontSize: '17rem',
        fontWeight: '100',
        color: '$color.lightText',
    }
})
