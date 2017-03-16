import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import Button from 'react-native-button'


interface Props {
    items: Array<any>,
}

interface State {}

export default class CategoriesList extends Component<Props, State> {
    render() {
        const {items} = this.props
        return <View style={styles.container}>
            {/*{data.type === 'categories'*/}
                {/*? <CatList items={items.children || []}/>*/}
                {/*: <ItemsList items={items.children || []}/>*/}
            {/*}*/}
                <Text style={styles.text}>
                    Welcome to React Natif!
                </Text>
                {/*<Button onPress={this.onPress}>*/}
                    {/*Hi there!*/}
                {/*</Button>*/}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
} as React.ViewStyle,

    text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
} as React.TextStyle,
})
