import React, { Component } from 'react'
import {
    Linking,
    Platform,
    // Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Text from 'react-native-text'


interface Props {
    href?: string,
    address?: string,
    phone?: string,
    style?: any,
    contentStyle?: any,
}

interface State {}

export default class Link extends Component<Props, State> {
    // static
    _navigate = async(url: string) => {
        try {
            const supported = await Linking.canOpenURL(url)
            console.debug("Link/navigate()", supported, url)
            if(supported) Linking.openURL(url)
        } catch(e) {}
    }

    navigate = () => {
        console.debug("Link/navigate()")
        const {href, address} = this.props

        if(address) this.navigateToAddress(address)
        else if(href) this.navigateToUrl(href)
        // if(address) Link.navigateToAddress(address)
        // else if(href) Link.navigateToUrl(href)
    }

    // static
    navigateToAddress(address) {
        /* Map URL schemas: http://stackoverflow.com/a/34359246/3445280 */
        const url = Platform.OS === 'ios'
            ? 'maps:?saddr=Current Location&daddr=' + address
            : 'geo:0,0?q=' + address.replace(',', '+')
        // Link._navigate(url)
        this._navigate(url)
    }

    // static
    navigateToUrl(href) {
        const url = href.indexOf('http') === 0 ? href : 'http://' + href
        // Link._navigate(url)
        this._navigate(url)
    }

    render() {
        const {children, style, contentStyle} = this.props
        // console.debug("Link/render()", typeof children)

        return <TouchableOpacity onPress={this.navigate} style={style}>
            {typeof children === 'string' || typeof children[0] === 'string'
                ? <Text style={[styles.text, contentStyle]} target="_blank" children={children}/>
                : children
            }
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    text: {
        color: "blue",
        fontSize: 14,
    },
})
