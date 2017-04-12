import React, { Component } from 'react'
import RN, {
    Linking,
    Platform,
    Text,
    TouchableOpacity,
    // StyleSheet,
} from 'react-native'
// import Text from 'react-native-text'
import StyleSheet from 'react-native-extended-stylesheet'


interface Props {
    href?: string,
    address?: string,
    phone?: string,
    style?: any,
    contentStyle?: any,
    children?: any,
}

interface State {}

export default class Link extends Component<Props, State> {
    // static
    _navigate = async(url: string) => {
        try {
            const supported = await Linking.canOpenURL(url)
            console.debug("Link/_navigate()", supported, url)
            if(supported) Linking.openURL(url)
        } catch(e) {}
    }

    navigate = () => {
        // console.debug("Link/navigate()")
        const {href, address, phone} = this.props

        if(address) this.navigateToAddress(address)
        if(href) this.navigateToUrl(href)
        if(phone) this.navigateToPhone(phone)
    }

    // static
    navigateToAddress(address: string) {
        /* Map URL schemas: http://stackoverflow.com/a/34359246/3445280 */
        const link = Platform.OS === 'ios'
            ? 'maps:?saddr=Current Location&daddr=' + address
            : 'geo:0,0?q=' + address.replace(',', '+')
        this._navigate(link)
    }

    // static
    navigateToUrl(href: string) {
        this._navigate(href.indexOf('http') === 0 ? href : 'http://' + href)
    }

    navigateToPhone(phone: string) {
        this._navigate(`tel:${phone}`)
    }

    render() {
        const {children, style, contentStyle} = this.props
        // console.debug("Link/render()", typeof children)

        return <TouchableOpacity onPress={this.navigate} style={style}>
            {typeof children === 'string' || typeof children[0] === 'string'
                ? <Text style={[styles.text, contentStyle]} children={children}/>
                : children
            }
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    $outline: '$debug',
    text: {
        color: "blue",
        // fontSize: 14,
        fontSize: '14rem',
    },
})
