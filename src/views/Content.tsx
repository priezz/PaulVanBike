import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
} from 'react-native'
import {
    Grid,
    Row,
} from 'react-native-easy-grid'
import Icon from 'react-native-vector-icons/Ionicons'

import router from '../lib/router'
import CategoriesList from '../components/CategoriesList'
import ItemsList from '../components/ItemsList'


interface Props {
    items: any,
    title?: string,
    desc?: string,
    contentType: string,
}
interface State {}

export default class Content extends Component<Props, State> {
    render() {
        const {title = '', contentType} = this.props
        return <Grid>
            <Row size={6}><TouchableOpacity style={styles.header} onPress={() => router.goBack()}>
                <Icon name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-arrow-back`} style={styles.backIcon}/>
                <Text style={styles.headerText}>{title}</Text>
            </TouchableOpacity></Row>
            <Row size={94}>
                {contentType === 'categories' && <CategoriesList {...this.props}/>}
                {contentType === 'items' && <ItemsList {...this.props}/>}
            </Row>
        </Grid>
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 5,
    } as React.ViewStyle,
    backIcon: {
        fontSize: 24,
        color: '#222',
    },
    headerText: {
        fontSize: 15,
        color: '#000',
        paddingLeft: 14,
    },
})
