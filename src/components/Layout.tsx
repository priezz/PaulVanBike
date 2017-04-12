import React, { Component } from 'react'
import RN, {
    // StyleSheet,
    Platform,
    StatusBar,
    Text,
    View,
} from 'react-native'
// import Button from 'react-native-button'
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
                <Link href='https://dvaplus.eu' contentStyle={styles.copyright}>Разработка приложения: DvaPlus d.o.o., <Text style={styles.copyrightLink}>www.dvaplus.eu</Text></Link>
            </Row>
        </Grid></View>
    }
}

const styles = StyleSheet.create({
    $outline: '$debug',
    container: {
        flex: 1,
        // backgroundColor: '#efefef',
        backgroundColor: '#f2f2f2',
        paddingTop: Platform.OS === 'ios' ? '21rem' : StatusBar.currentHeight,
        // backgroundColor: 'green',
    },// as RN.ViewStyle,
    footer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        // backgroundColor: 'tomato',
    } as RN.ViewStyle,
    copyright: {
        // paddingLeft: 15,
        paddingLeft: '15rem',
        // paddingBottom: 7,
        paddingBottom: '7rem',
        // fontSize: 12,
        fontSize: '11rem',
        fontWeight: '200',
        textAlign: 'left',
        color: '#444',
    },// as RN.TextStyle,
    copyrightLink: {
        color: '#71A6D0',
    } as RN.TextStyle,
})
