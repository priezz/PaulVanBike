import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
} from 'react-native'
import {
    Grid,
    Row,
} from 'react-native-easy-grid'

import data from '../../assets/data.json'
import CategoriesList from '../components/CategoriesList'


interface Props {}
interface State {}

export default class Home extends Component<Props, State> {
    render() {
        return <Grid>
            <Row size={21} style={styles.logoBox}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode='contain'/>
            </Row>
            <Row size={79}>
                <CategoriesList items={data.items} desc={data.desc} descStyle={{textAlign: 'center', fontSize: 16}}/>
            </Row>
        </Grid>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    } as React.ViewStyle,
    logoBox: {
        height: '25%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    } as React.ViewStyle,
    logo: {
        height: '95%',
        tintColor: '#3A83BF',
    } as React.ImageStyle,
    copyright: {
        paddingLeft: '5%',
        fontSize: 12,
        fontWeight: '200',
        color: '#444',
    } as React.TextStyle,
})
