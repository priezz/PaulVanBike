declare module 'react-native-easy-grid' {
    const value: any
    export default value
}
declare module 'simple-react-mobx-router' {
    const value: any
    export default value
}
declare module 'sreact-native-text' {
    const value: any
    export default value
}
declare module 'mobx-react/native' {
    const value: any
    export default value
    export const observer: any
}

declare module 'react-native-button' {
    import React, { Component } from 'react'
    interface Props {
        style?: React.ViewStyle
        styleDisabled?: React.ViewStyle
        onPress?: () => any
    }
    export default class Button extends Component<Props, any> {}
}

declare module '*.json' {
    const value: any
    export default value
}
