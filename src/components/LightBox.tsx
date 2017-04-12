import React, {
	Component,
	Children,
	cloneElement,
	// PropTypes,
} from 'react'
import RN, {
	Animated,
	Dimensions,
	Modal,
	Platform,
	StatusBar,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from 'react-native'
import StyleSheet from 'react-native-extended-stylesheet'
import ViewTransformer from 'react-native-view-transformer'


const WINDOW_HEIGHT = () => Dimensions.get('window').height
const WINDOW_WIDTH = () => Dimensions.get('window').width

// Translation threshold for closing the image preview
const CLOSING_THRESHOLD = 100


interface LightBoxProps {
	activeProps?: object,
	renderHeader?: any,
	renderContent?: any,
	underlayColor?: string,
	backgroundColor?: string,
	onOpen?: any,
	onClose?: any,
	springConfig?: {
		tension: number,
		friction: number,
		useNativeDriver: boolean,
	},
	animateOpening?: boolean,
	animateClosing?: boolean,
	swipeToDismiss?: boolean,
	pinchToZoom?: boolean,
	style?: object,
}
interface LightBoxState {}


export default class LightBox extends Component<LightBoxProps, LightBoxState> {
	static defaultProps = {
		swipeToDismiss: true,
		pinchToZoom: true,
		onOpen: (): void => {},
		onClose: (): void => {},
	}

	state = {
		isOpen: false,
		origin: {
			x: 0,
			y: 0,
			width: 0,
			height: 0,
		},
		layoutOpacity: new Animated.Value(1),
	}

	getContent() {
		if(this.props.renderContent) {
			return this.props.renderContent()
		} else if(this.props.activeProps) {
			return cloneElement(
				Children.only(this.props.children),
				this.props.activeProps
			)
		}
		return this.props.children
	}

	getOverlayProps(): LightBoxOverlayProps {
		return {
			isOpen: this.state.isOpen,
			origin: this.state.origin,
			renderHeader: this.props.renderHeader,
			swipeToDismiss: this.props.swipeToDismiss,
			pinchToZoom: this.props.pinchToZoom,
			springConfig: this.props.springConfig,
			animateOpening: this.props.animateOpening,
			animateClosing: this.props.animateClosing,
			backgroundColor: this.props.backgroundColor,
			children: this.getContent(),
			onClose: this.onClose,
		}
	}

	open = () => {
		this.refs.lightBox.measureInWindow((x: number, y: number, width: number, height: number) => {
			this.props.onOpen()
			this.setState({
				isOpen: true,
				origin: {
					width,
					height,
					x,
					y,
				},
			}, () => setTimeout(() => this.state.layoutOpacity.setValue(0)))
		})
	}

	onClose = () => {
		this.state.layoutOpacity.setValue(1)
		this.setState({
			isOpen: false,
		}, this.props.onClose)
	}

	render() {
		// measure will not return anything useful if we don't attach an onLayout handler on android
		return <View ref='lightBox'
		             style={this.props.style}
                     onLayout={() => this.forceUpdate()}
		>
			<Animated.View style={{opacity: this.state.layoutOpacity}}>
				<TouchableHighlight
					underlayColor={this.props.underlayColor}
					onPress={this.open}
				>
					{this.props.children}
				</TouchableHighlight>
			</Animated.View>
			<LightboxOverlay {...this.getOverlayProps()}/>
		</View>
	}
}


interface LightBoxOverlayProps {
	isOpen: boolean,
	origin: {
		x: number,
		y: number,
		width: number,
		height: number,
	},
	renderHeader: any,
	swipeToDismiss: boolean,
	pinchToZoom: boolean,
	springConfig: {
		tension: number,
		friction: number,
		useNativeDriver: boolean,
	},
	animateOpening: boolean,
	animateClosing: boolean,
	backgroundColor: string,
	children?: any,
	onOpen?: any,
	onClose?: any,
}
interface LightBoxOverlayState {}


class LightboxOverlay extends Component<LightBoxOverlayProps, LightBoxOverlayState> {
    static defaultProps = {
		springConfig: {
			tension: 30,
			friction: 7,
			// Native animations work better on Android, but sometimes still have issues on iOS
			useNativeDriver: Platform.OS === 'android',
		},
		animateOpening: true,
		animateClosing: false,
        backgroundColor: 'black',
		renderHeader: (close: any) => <TouchableOpacity onPress={close}>
            <Text style={StyleSheet.create(_styles).closeButton}>×</Text>
        </TouchableOpacity>,
	}

	state = {
		isClosing: false,
		target: {
			x: 0,
			y: 0,
		},
		closingDistance: new Animated.Value(0),
		visibility: new Animated.Value(0),
	}

	componentDidMount() {
		if(this.props.isOpen) {
			this.open()
		}
	}

	componentWillReceiveProps(props: LightBoxOverlayProps) {
		if((this.props.isOpen != props.isOpen) && props.isOpen) this.open()
	}

	startClosing() {
		if (this.state.isClosing) return
		this.setState({ isClosing: true })
	}

	stopClosing() {
		if (!this.state.isClosing) return

		this.state.closingDistance.setValue(0)
		this.setState({ isClosing: false })
	}

	open() {
		if (Platform.OS === 'ios') StatusBar.setHidden(true)

		const { animateOpening } = this.props

		if (animateOpening) {
			Animated.spring(
				this.state.visibility,
				{ toValue: 1, ...this.props.springConfig }
			).start()
		} else
			this.state.visibility.setValue(1)
	}

	close = () => {
		if (Platform.OS === 'ios') StatusBar.setHidden(false, 'fade')

		const { animateClosing } = this.props
		if (animateClosing) {
			Animated.spring(
				this.state.visibility,
				{ toValue: 0, ...this.props.springConfig }
			).start(() => this.onClose())
		} else this.onClose()
	}

	onClose() {
		this.props.onClose()
		this.state.closingDistance.setValue(0)
		this.state.visibility.setValue(0)
		this.state.isClosing = false
        this.state.target = {
            x: 0,
            y: 0,
        }
	}

	onViewTransformed = ({translateY, scale}: {translateY: number, scale: number}) => {
		if (scale > 1) {
			this.stopClosing()
			return
		}
		this.state.closingDistance.setValue(translateY)
		if (Math.abs(translateY) > 0) this.startClosing()
		else this.stopClosing()
	}

	onTransformGestureReleased = ({translateX, translateY, scale}: {translateX: number, translateY: number, scale: number}) => {
		const { swipeToDismiss } = this.props

		if(swipeToDismiss && (scale === 1) &&
			((Math.abs(translateY) > CLOSING_THRESHOLD) ||
			(Math.abs(translateX) > CLOSING_THRESHOLD))
		) {
			this.setState({
				isClosing: false,
				target: {
					y: translateY,
					x: translateX,
				}
			}, () => this.close())
		} else this.stopClosing()
	}

	render() {
		const {
			isOpen,
			renderHeader,
			pinchToZoom,
			origin,
			backgroundColor,
		} = this.props

		const {
			isClosing,
			visibility,
			target,
		} = this.state

        const styles = StyleSheet.create(_styles)

		const lightboxOpacityStyle = {
			opacity: visibility.interpolate({
				inputRange: [0, 0.8, 1],
				outputRange: [0, 0.4, 1],
			})
		}

		if(isClosing) {
			lightboxOpacityStyle.opacity = this.state.closingDistance.interpolate({
				inputRange: [-CLOSING_THRESHOLD * 2, 0, CLOSING_THRESHOLD * 2],
				outputRange: [0, 1, 0]
			})
		}

		const openStyle = {
			top: target.y,
			left: target.x,
			transform: [{
				translateX: visibility.interpolate({
					inputRange: [0, 1],
					outputRange: [origin.x, target.x]
				})
			}, {
				translateY: visibility.interpolate({
					inputRange: [0, 1],
					outputRange: [origin.y - origin.height, target.y]
				})
			}, {
				scale: visibility.interpolate({
					inputRange: [0, 1],
					outputRange: [origin.width / WINDOW_WIDTH(), 1]
				})
			}],
		}

		return <Modal visible={isOpen}
                      transparent={true}
                      onRequestClose={this.close}
		>
            <Animated.View
                style={[
                    styles.background,
                    { backgroundColor: backgroundColor },
                    lightboxOpacityStyle
                ]}
            >
                <Animated.View style={openStyle}>
                    {!pinchToZoom
                        ? this.props.children
                        : <ViewTransformer
                            style={{flex: 1}}
                            enableTransform={true}
                            enableScale={true}
                            enableTranslate={true}
                            enableResistance={true}
                            contentAspectRatio={origin.width / origin.height}
                            maxScale={3}
                            onTransformGestureReleased={this.onTransformGestureReleased}
                            onViewTransformed={this.onViewTransformed}
                        >
                            <View style={styles.contentBox}>
                                {this.props.children}
                            </View>
                        </ViewTransformer>
                    }
                </Animated.View>
                <Animated.View style={styles.header}>
                    {renderHeader && renderHeader(this.close)}
                </Animated.View>
            </Animated.View>
		</Modal>
	}
}

const _styles = {
	$outline: '$debug',
	background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
	},
	contentBox: {
		width: WINDOW_WIDTH,
		height: WINDOW_HEIGHT,
        flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		// Android pan handlers crash without this declaration:
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: WINDOW_WIDTH,
		backgroundColor: 'transparent',
	},
	closeButton: {
		// fontSize: 35,
		fontSize: '35rem',
		color: 'white',
		lineHeight: 40,
		// lineHeight: '40rem',
		// width: 40,
		width: '40rem',
		textAlign: 'center',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		// shadowRadius: 1.5,
		shadowRadius: '1.5rem',
		shadowColor: 'black',
		shadowOpacity: 0.8,
	},
}
