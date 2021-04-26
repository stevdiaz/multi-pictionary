import React, { Component } from 'react';
import './Cursor.css';

import Leap from 'leapjs';
import 'leapjs-plugins'

export default class Cursor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGrabbing: false,
            isPointing: false,
            isCircular: false,
            swipeObject: {
                isSwipe: false,
                isRight: false,
            },
            position: {
                x: 0,
                y: 0,
            },
        };
        this.grabThreshold = 0.8;
        this.flatThreshold = 0.7;
    }
    componentDidMount() {
        this.leapController = Leap.loop({enableGestures: true}, (frame) => this.onLeapFrame(frame));
        this.leapController.use('screenPosition', {scale: 0.8, positioning: 'absolute'});
        this.leapController.connect();
    }
    componentDidUpdate() {

    }
    onLeapFrame(frame) {
        if (frame.hands.length > 0) {
            const hand = frame.hands[0];
            const handPosition = hand.screenPosition();
            this.setState({position: {x: handPosition[0] + 30, y: handPosition[1] + 600}});
            if (hand.grabStrength > this.grabThreshold) {
                if (!this.state.isGrabbing) {
                    this.setState({
                        isGrabbing: true,
                    });
                }
                this.props.onHandGrabUpdate(true);
            } else if (hand.grabStrength < this.flatThreshold) {
                if (this.state.isGrabbing) {
                    this.setState({
                        isGrabbing: false,
                    });
                }
                this.props.onHandGrabUpdate(false);
            }
            const isPointing = this.onlyIndexFingerExtended(hand);
            this.setState({
                isPointing: isPointing,
            });
            this.props.onPointUpdate(isPointing, this.state.position);

            const gestures = frame.data.gestures;
            const isCircular = this.circularGesture(hand, gestures);
            this.setState({
                isCircular: isCircular,
            });
            this.props.onCircularUpdate(isCircular);

            const isSwipe = this.swipeGesture(hand, gestures);
            const isRight = this.swipeIsRight(gestures);
            const swipeObject = {
                isSwipe: isSwipe,
                isRight: isRight,
            };
            this.setState({
                swipeObject: swipeObject,
            });
            this.props.onSwipeUpdate(swipeObject);
        }
    }
    onlyIndexFingerExtended(hand) {
        return (hand.indexFinger.extended && !hand.ringFinger.extended && !hand.pinky.extended && !hand.thumb.extended && !hand.middleFinger.extended);
    }
    allFingersExtended(hand) {
        return true;
        return (hand.indexFinger.extended && hand.ringFinger.extended && hand.pinky.extended && hand.middleFinger.extended);
    }
    circularGesture(hand, gestures) {
        const circleGesture = gestures.filter(gesture => gesture.type === 'circle');
        return hand.pinky.extended && circleGesture.length === 1 && circleGesture.duration > 700;
    }
    swipeGesture(hand, gestures) {
        const swipeGesture = gestures.filter(gesture => gesture.type === 'swipe' && gesture.state === 'stop');
        return swipeGesture.length > 0;
    }
    swipeIsRight(gestures) {
        const swipeGesture = gestures.filter(gesture => gesture.type === 'swipe' && gesture.state === 'stop');
        if (swipeGesture.length > 0) {
            const stop = swipeGesture[0];
            if (stop.position[0] < 0 || stop.position[0] < 0) {
                return true;
            }
            return false;
        }
        return false;
    }
    render() {
        var className = 'Cursor-cursor';
        if (this.state.isGrabbing) {
            className += ' Cursor-cursorGrab';
        } else if (this.state.isPointing) {
            className += ' Cursor-cursorPoint';
        } else {
            className += ' Cursor-cursorNormal';
        }
        return (
            <div className={className} style={{left: `${this.state.position.x}px`, top: `${this.state.position.y}px`}}/>
        )
    }
}