import React, { Component } from 'react'
import {
    Platform,
    LayoutAnimation,
    UIManager,
    Dimensions,
    StatusBar,
} from 'react-native'
import codePush from 'react-native-code-push'
import {observer} from 'mobx-react/native'
import StyleSheet from 'react-native-extended-stylesheet'

import router from './lib/router'
import Layout from './components/Layout'
import {errorReporterInit} from './lib/logger'
import credentials from '../.credentials.json'


interface Props {}
interface State {}


/* Enable Sentry error logs collection */
errorReporterInit({
    userId: credentials.sentry.userId,
    appId: credentials.sentry.appId,
})

const minScreenDimension = Math.min(Dimensions.get('window').width, Dimensions.get('window').height)

const debug = 0
StyleSheet.build({
    debug: process.env.NODE_ENV === 'production' ? 0 : debug,
    rem: () => Math.pow(minScreenDimension / 360, 1/3),
    statusBarHeight: () => Platform.OS === 'ios' ? 21 : StatusBar.currentHeight,
    color: {
        background: '#f2f2f2',
        boldText: '#000',
        normalText: '#444',
        lightText: '#777',
        ultraLightText: '#aaa',
        link: '#71A6D0',
        underline: '#ddd',
        // lighter: '#ffffff',
    },
})

/* Enable LayoutAnimation under Android */
if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

@codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
})
@observer export default class App extends Component<Props, State> {
    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut()
    }

    render() {
        const [CurrentView, props={}] = router.currentSubView('/', {}, true).get()
        return <Layout>
            <CurrentView {...props}/>
        </Layout>
    }
}
