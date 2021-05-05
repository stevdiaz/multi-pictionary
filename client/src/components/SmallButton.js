import React, { Component } from 'react';
import './SmallButton.css';

export default class SmallButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.id = Math.random().toString(36).substring(7);
    };
    componentDidMount() {

    };
    componentDidUpdate(prevProps) {
        if (this.props.isGrabbing && !prevProps.isGrabbing) {
            this.onHandGrab(this.props.handPos);
        }
    };
    onClick() {
        this.props.onButtonClick();
    }
    onHandGrab(handPos) {
        if (this.doesIntersect(handPos, document.getElementById(this.id).getBoundingClientRect())) {
            this.onClick();
        }
    }
    doesIntersect(handPos, rectangle) {
        return rectangle.left <= handPos.x && handPos.x <= rectangle.right && rectangle.top <= handPos.y && handPos.y <= rectangle.bottom; 
    }
    render() {
        const style = this.props.widthPercent !== undefined ? {width: this.props.widthPercent} : {};
        return (
            <div className='SmallButton-button' id={this.id} onClick={() => this.onClick()} style={style}>
                {this.props.buttonText}
            </div>
        )
    };
}