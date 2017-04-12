import React, { Component } from 'react'
import {
    Platform,
    LayoutAnimation,
    UIManager,
    Dimensions,
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
// const maxScreenDimension = Math.max(Dimensions.get('window').width, Dimensions.get('window').height)

const debug = 0
StyleSheet.build({
    debug: process.env.NODE_ENV === 'production' ? 0 : debug,
    rem: () => Math.pow(minScreenDimension / 360, 1/3),
    color: {
        dark: '#212121',
        lessDark: '#2a2a2a',
        accent: '#FC4D75',
        darkest: '#171717',
        light: '#ebebeb',
        darker: '#a3a6a9',
        lighter: '#ffffff',
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
