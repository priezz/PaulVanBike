import React, { Component } from 'react'
import {
    // Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import {
    Grid,
    Row,
} from 'react-native-easy-grid'
import Icon from 'react-native-vector-icons/Ionicons'
import Text from 'react-native-text'

import router from '../lib/router'
import List from '../components/List'


interface Props {
    items: any,
    title?: string,
    image?: string,
    desc?: string,
    descStyle?: any,
    contentType: string,
}
interface State {}

export default class Content extends Component<Props, State> {
    render() {
        const {title = ''} = this.props
        return <Grid>
            <Row size={8}><TouchableOpacity style={styles.header} onPress={() => router.goBack()}>
                <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-arrow-back`} style={styles.backIcon}/>
                <Text style={styles.headerText} ellipsizeMode="tail">{title}</Text>
            </TouchableOpacity></Row>
            <Row size={92} style={{overflow: 'hidden', backgroundColor: 'transparent'}}>
                <List {...this.props}/>
            </Row>
        </Grid>
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        // paddingVertical: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: 'tomato',
    } as React.ViewStyle,
    backIcon: {
        fontSize: 24,
        color: '#222',
    },
    headerText: {
        fontSize: 17,
        color: '#000',
        paddingLeft: 14,
        paddingBottom: 2,
    },
})
