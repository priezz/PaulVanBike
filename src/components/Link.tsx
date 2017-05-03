import React, { Component } from 'react'
import RN, {
    Linking,
    Platform,
    Text,
    TouchableOpacity,
} from 'react-native'
import StyleSheet from 'react-native-extended-stylesheet'


interface Props {
    href?: string,
    address?: string,
    coords?: {
        lat: number,
        lng: number,
    },
    phone?: string,
    style?: any,
    contentStyle?: any,
    children?: any,
}

interface State {}

export default class Link extends Component<Props, State> {
    navigate = () => {
        // console.debug("Link/navigate()")
        const { href, address, phone, coords = { lat: Infinity, lng: Infinity }} = this.props

        if (address) Link.navigateToAddress(address, coords)
        if (href) Link.navigateToUrl(href)
        if (phone) Link.navigateToPhone(phone)
    }

    // private static _navigate = async (url: string) => {
    private static async _navigate(url: string) {
        try {
            const supported = await Linking.canOpenURL(url)
            console.debug("Link/_navigate()", supported, url)
            if (supported) Linking.openURL(url)
        } catch (e) { }
    }

    private static navigateToAddress(address: string, { lat = Infinity, lng = Infinity }: { lat: number, lng: number }) {
        /* Map URL schemas:
            http://stackoverflow.com/a/34359246/3445280
            https://developer.apple.com/library/content/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
        */
        address = address.replace(/ /g, '+')
        const coords = lat !== Infinity && lng !== Infinity ? `${lat},${lng}` : ''
        const link = Platform.OS === 'ios'
            ? `maps:?sll=${coords}&address=${address}&daddr=${address}&t=m`
            // ? `maps:?sll=${coords}&near=${coords}&daddr=${address}&t=m`
            : `geo:${lat},${lng}?q=${address}`
        Link._navigate(link)
    }

    private static navigateToUrl(href: string) {
        Link._navigate(href.indexOf('http') === 0 ? href : 'http://' + href)
    }

    private static navigateToPhone(phone: string) {
        Link._navigate(`tel:${phone}`)
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
