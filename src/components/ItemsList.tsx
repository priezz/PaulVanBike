import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native'
// import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'
import {
    Grid,
    Col,
    Row,
} from 'react-native-easy-grid'

/* Run prom 'assets/images' directory to update:
    rm -f ../../src/lib/images.ts; (echo "export default {"; for i in *.webp ; do echo "    '$i': require('../../assets/images/$i'),"; done; echo "}") > ../../src/lib/images.ts
*/
import images from '../lib/images'
import Link from '../components/Link'


interface Props {
    items: any,
    title?: string,
    desc?: string,
}

interface State {}

export default class ItemsList extends Component<Props, State> {
    getImage = (image: string): any => {
        const idx: number = image.indexOf("http://") + image.indexOf("https://")
        if(idx > -2) console.log({uri: image})
        if(idx === -2) console.log(image)
        else console.log(images[image])
        if(idx > -2) return {uri: image}
        else return images[image]
    }

    render() {
        const {items = [], desc = ''} = this.props
        // console.debug("CategoriesList/render()", haveIcons)

        return <ScrollView style={styles.container} contentContainerStyle={styles.scrollView}>
            {desc ? <Text style={styles.desc}>{desc}</Text> : null}
            {items.map((item: any, i: number) =>
                <View key={i} style={styles.item}>
                    <Text style={styles.itemTitle}>{item.title.toUpperCase()}</Text>
                    <View style={styles.itemContent}>
                        {item.image ? <Image source={this.getImage(item.image)} style={styles.itemImage} resizeMode='cover'/> : null}
                        <Text style={styles.itemDesc}>{item.desc}</Text>
                    </View>
                    <Grid>
                        <Col size={70}>
                            {item.pricetag ? <Text style={styles.itemDetails}>Ценник: {item.pricetag}</Text> : null}
                            {item.address ? <Text style={styles.itemDetails}>Адрес: {item.address}</Text> : null}
                            {item.phone ? <Text style={styles.itemDetails}>Телефон: {item.phone}</Text> : null}
                        </Col>
                        <Col size={30} style={[styles.right, styles.itemDetailsBox]}>
                            {item.address ? <Link address={item.address}>
                                <Icon name='ios-map-outline' style={styles.itemIcon}/>
                            </Link>: null}
                            {item.website ? <Link href={item.website}>
                                <Icon name='ios-information-circle-outline' style={styles.itemIcon}/>
                            </Link>: null}
                            {/*{item.phone ? <Link phone={item.phone}>*/}
                                {/*<Icon name='ios-call-outline' style={styles.itemIcon}/>*/}
                            {/*</Link>: null}*/}
                        </Col>
                    </Grid>
                </View>
            )}
        </ScrollView>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 40,
    } as React.ViewStyle,
    scrollView: {
        paddingBottom: 30,
    } as React.ViewStyle,
    centered: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        justifyContent: 'flex-start',
    },
    right: {
        justifyContent: 'flex-end',
    },
    desc: {
        fontSize: 14,
        fontWeight: '400',
        color: '#888',
        textAlign: 'left',
        margin: 10,
        marginTop: 20,
        marginHorizontal: 40,
    } as React.TextStyle,
    item: {
        marginHorizontal: 40,
        marginTop: 30,
    } as React.ViewStyle,
    itemContent: {
        flexDirection: 'row',
        paddingVertical: 8,
    } as React.ViewStyle,
    itemDetailsBox: {
        flexDirection: 'row',
    } as React.ViewStyle,
    itemTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
    } as React.TextStyle,
    itemDesc: {
        fontSize: 14,
        fontWeight: '300',
        color: '#444',
        flex: 1,
        flexWrap: 'wrap',
    } as React.TextStyle,
    itemImage: {
        width: 90,
        height: 90,
        marginTop: 6,
        marginRight: 10,
        marginBottom: 10,
    },
    itemDetails: {
        fontSize: 11,
        fontWeight: '100',
        color: '#888',
    } as React.TextStyle,
    itemIcon: {
        fontSize: 26,
        fontWeight: '700',
        color: '#444',
        marginHorizontal: 8,
    } as React.TextStyle,
    forwardIcon: {
        fontSize: 18,
        color: '#555',
    }
})
