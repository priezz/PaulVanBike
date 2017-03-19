import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import Button from 'react-native-button'


interface Props {
    items: any[],
    desc: string,
}

interface State {}

export default class CategoriesList extends Component<Props, State> {
    onPress = () => {
        alert("It's working fine")
    }

    render() {
        const {items, desc} = this.props
        return <View style={styles.container}>
            <Text style={styles.text}>{desc}</Text>
            {items.map((item: any, i: number) =>
                <View key={i}>
                    <Button onPress={this.onPress}>{item.title} ></Button>
                </View>
            )}
            {/*{data.type === 'categories'*/}
                {/*? <CatList items={items.children || []}/>*/}
                {/*: <ItemsList items={items.children || []}/>*/}
            {/*}*/}
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
