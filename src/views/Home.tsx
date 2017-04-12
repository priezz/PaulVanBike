import React, { Component } from 'react'
import RN, {
    Image,
    Dimensions,
} from 'react-native'
import {
    Grid,
    Row,
} from 'react-native-easy-grid'
import StyleSheet from 'react-native-extended-stylesheet'

import data from '../../assets/data.json'
import List from '../components/List'


interface Props {}
interface State {}

const logoBoxHeightPercentage = 21
export default class Home extends Component<Props, State> {
    render() {
        const styles = StyleSheet.create(_styles)
        console.debug("Home/render()", styles._logoBox.height, styles._logo.height)
        return <Grid onLayout={() => this.forceUpdate()}>
            <Row size={logoBoxHeightPercentage} style={styles.logoBox}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode='contain'/>
            </Row>
            <Row size={100 - logoBoxHeightPercentage}>
                {/*<List contentType='categories' {...data} descStyle={styles.desc}/>*/}
                <List contentType='categories' {...data}/>
            </Row>
        </Grid>
    }
}

const logoBoxHeight = () => Dimensions.get('window').height * logoBoxHeightPercentage / 100
const _styles = {
    $outline: '$debug',
    container: {
        flex: 1,
        backgroundColor: '#eee',
    } as RN.ViewStyle,
    logoBox: {
        height: logoBoxHeight,
        width: () => Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
    },// as RN.ViewStyle,
    logo: {
        height: () => logoBoxHeight() * 0.95,
        // height: () => screenHeight() * 0.25 * 0.95,
        // tintColor: '#3A83BF',
    },// as RN.ImageStyle,
    // desc: {
    //     textAlign: 'center',
    //     // fontSize: 16,
    //     fontSize: '16rem',
    // },
}
