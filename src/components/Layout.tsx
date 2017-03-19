import React, { Component } from 'react'
import {
    StyleSheet,
    StatusBar,
} from 'react-native'
import Button from 'react-native-button'
import {
    Grid,
    Row
} from 'react-native-easy-grid'


interface Props {
    children?: any,
}
interface State {}

export default class Layout extends Component<Props, State> {
    render() {
        return <Grid style={styles.container}>
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
                <Button style={styles.copyright}>Разработка приложения: DvaPlus d.o.o., mail@dvaplus.eu</Button>
            </Row>
        </Grid>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
        paddingTop: 25,
    } as React.ViewStyle,
    footer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    } as React.ViewStyle,
    copyright: {
        paddingLeft: '5%',
        fontSize: 12,
        fontWeight: '200',
        color: '#444',
    } as React.TextStyle,
})
