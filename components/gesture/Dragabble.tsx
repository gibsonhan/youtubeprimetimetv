import { useEffect, useState, } from "react"
import { Animated, PanResponder, View } from "react-native";

function Draggable(props: any) {
    const [isDragging, setIsDragging] = useState(false)
    const pan: any = new Animated.ValueXY()

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true, /// I need to read up on this
        //onStartShouldSetPanResponderCapture: (evt, gestureState) => true, /// I need to read up on this
        onMoveShouldSetPanResponder: () => true, /// I need to read up on this
        //onMoveShouldSetPanResponderCapture: () => true, /// I need to read up on this

        onPanResponderStart: (e, gestureState) => {
            setIsDragging(true)
        },
        onPanResponderEnd: (e, gestureState) => {
            setIsDragging(false)
        },
        onPanResponderGrant: (e, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            console.log('grant')
            pan.setOffset({
                x: pan.x._value,
                y: pan.y._value
            });
        },
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        onPanResponderMove: Animated.event(
            [
                null,
                { dx: pan.x, dy: pan.y },
            ],
            { useNativeDriver: true }
        ),
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (e, gestureState) => {
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
            console.log('on release')
            return Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                friction: 1,
                useNativeDriver: true
            }).start()
        },
        onPanResponderTerminate: (e, gestureState) => {
            console.log('terminate')
            // Another component has become the responder, so this gesture
            // should be cancelled
            Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                friction: 1,
                useNativeDriver: true
            }).start()
        },
    })

    return (
        <Animated.View
            style={{
                transform: [
                    { translateX: pan.x },
                    { translateY: pan.y }
                ]
            }}
            {...panResponder.panHandlers}
        >
            {props.children}
        </Animated.View>
    )
}

export default Draggable

