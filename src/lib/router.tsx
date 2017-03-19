import { Platform, BackAndroid } from 'react-native'
import Router from 'simple-react-mobx-router'

import Home from '../views/Home'
import CategoriesList from '../components/CategoriesList'
import ItemsList from '../components/ItemsList'


const router = new Router({
        '/home': Home,
        '/categories': CategoriesList,
        '/items': ItemsList,
    }, {
        defaultRoute: '/home', // <- default route
    }
)
export default router

if(Platform.OS === 'android') BackAndroid.addEventListener('hardwareBackPress', () => router.goBack(true))
