// import 'lib/logger' // Import first to format or disable all the logs
import React, { Component } from 'react'
import {
    Platform,
    LayoutAnimation,
    UIManager,
    View,
} from 'react-native'
import codePush from 'react-native-code-push'
import {observer} from 'mobx-react/native'

import router from './lib/router'
import Layout from './components/Layout'


interface Props {}
interface State {}


// /* Enable Sentry error logs collection */
// errorReporterInit({
//     userId: '179fc18a1dc741eca35bc266bbfff22f',
//     appId: '97525',
//     root: this,
// })

// /* Collect data from the server and set the schedule to recollect */
// api.updateAll()
// setInterval(() => api.updateAll(), 1000 * 60 * 15) // call once per 15 minutes


/* Enable LayoutAnimation under Android */
if (Platform.OS === 'android') {
    // UIManager.setLayoutAnimationEnabledExperimental(true)
}

@codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
    // checkFrequency: codePush.CheckFrequency.MANUAL
})
@observer export default class App extends Component<Props, State> {
    componentWillUpdate() {
        // console.log("App/componentWillUpdate()")
        // LayoutAnimation.easeInEaseOut()
    }

    render() {
        // console.debug('App/render()', router.currentRoute('/').get())
        const [CurrentView, props={}] = router.currentSubView('/', {}, true).get()
        // console.debug('App/render()', router.currentRoute('/').get(), props)
        return <Layout>
            <CurrentView {...props}/>
        </Layout>
    }
}

// TODO: Publish 'CachedImage' package
