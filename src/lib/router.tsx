import { Platform, BackAndroid } from 'react-native'
import Router from 'simple-react-mobx-router'

import Home from '../views/Home'
import Content from '../views/Content'


const router = new Router({
        '/home': Home,
        '/content': Content,
    }, {
        defaultRoute: '/home', // <- default route
    }
)
export default router

if(Platform.OS === 'android') BackAndroid.addEventListener('hardwareBackPress', () => router.goBack(false))
