import React, { Component } from 'react'
import RN, {
    Platform,
    StatusBar,
    Text,
    View,
} from 'react-native'
import StyleSheet from 'react-native-extended-stylesheet'
import {
    Grid,
    Row
} from 'react-native-easy-grid'

import Link from '../components/Link'


interface Props {
    children?: any,
}
interface State {}

export default class Layout extends Component<Props, State> {
    render() {
        return <View style={styles.container}><Grid>
            <StatusBar
                animated={true}
                hidden={false}
                showHideTransition='fade'
                barStyle='dark-content'
                backgroundColor='transparent'
                translucent={true}
            />
            <Row size={93}>
                {this.props.children}
            </Row>
            <Row size={7} style={styles.footer}>
                <Link href='https://dvaplus.eu' contentStyle={styles.copyright}>Приложение разработано DvaPlus d.o.o. <Text style={styles.copyrightLink}>http://dvaplus.eu</Text></Link>
            </Row>
        </Grid></View>
    }
}

const styles = StyleSheet.create({
    $outline: '$debug',
    container: {
        flex: 1,
        backgroundColor: '$color.background',
        paddingTop: '$statusBarHeight',
    },// as RN.ViewStyle,
    footer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    } as RN.ViewStyle,
    copyright: {
        paddingLeft: '10rem',
        paddingBottom: '10rem',
        fontSize: '11rem',
        fontWeight: '200',
        textAlign: 'left',
        color: '$color.normalText',
    },// as RN.TextStyle,
    copyrightLink: {
        color: '$color.link',
    } as RN.TextStyle,
})
