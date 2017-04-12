/* global ErrorUtils: true */

import { AsyncStorage, Platform } from 'react-native'
import Errio from 'errio'
import ErrorUtils from 'ErrorUtils'
import Raven from 'raven-js'
// import deepForceUpdate from 'react-deep-force-update'

import pkg from '../../package.json'

const noop = function() {}

/* Colorize or disable logs accordingly to the execution mode */
if(process.env.NODE_ENV === 'development') {
    const logger = require('color-term-console') // Import first to format all the logs
    logger.condensedJsonOutput(false)
} else {
    /* Disable `console` logging */
    const methods = [
        'clear', 'count', 'dir', 'dirxml',
        'group', 'groupCollapsed', 'groupEnd',
        'markTimeline', 'profile', 'profileEnd', 'timeEnd',
        'timeStamp',
    ]
    const console: any = window.console || {}
    methods.forEach(method => {
        /* Only stub defined methods. */
        if(typeof console[method] === 'function') console[method] = noop
    })
}


/**
 * Sentry error-reporter with AsyncStorage support
 *
 * This is required step to send all exceptions on next app launch
 * since during normal app run there's not enough time to process it all
 */

/**
 * Serialize error stacks as well
 */
Errio.setDefaults({
    stack: true,
})

/**
 * Raven-js plugin will overwrite default handler and try to log every exception as it happens,
 * we want to use our logger instead
 */
const defaultHandler = ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler() || ErrorUtils._globalHandler
const saveException = (err: any, callback: any) => AsyncStorage.setItem("@SENTRY:EXCEPTION", Errio.stringify(err), callback)
const clearException = (callback: any) => AsyncStorage.removeItem("@SENTRY:EXCEPTION", callback)

/* Install React Native plugin */
require('raven-js/plugins/react-native')(Raven)
let initialized = false

export const errorReporterInit = ({userId, appId}: {userId: string, appId: string}) => {
    if(initialized) return
    initialized = true

    Raven.config(`https://${userId}@app.getsentry.com/${appId}`, {
        logger: 'app-logger',
        release: pkg[`version_${Platform.OS}`],
        environment: process.env.NODE_ENV,
        serverName: Platform.OS,
    }).install()

    AsyncStorage.getItem("@SENTRY:EXCEPTION", (err, item) => {
        if (!err && item) {
            const error = Errio.parse(item)
            console.debug('Sending the crash report after the app re-launch...')
            Raven.captureException(error)
            clearException(noop)
        }
    })

    /**
     * When error happens, we want to persist it to AsyncStorage and just do the default
     * action, which will be RedBox in dev or crash in production
     */
    ErrorUtils.setGlobalHandler((err: any, isFatal: boolean) => {
        console.debug(`Exception (${isFatal ? '' : 'non-'}fatal) ${err.line}:${err.column}`)
        saveException(err, () => {
            defaultHandler(err, isFatal)
        })
    })
}
