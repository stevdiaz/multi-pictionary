import React, { Component } from 'react';
import './ColorPalette.css';

import { colors, defaultColor, defaultColorString } from '../helpers/constants';

export default class ColorPalette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedColor: defaultColor,
        };
    }
    componentDidMount() {
        this.props.onSelectColor(defaultColor, defaultColorString);
    }
    componentDidUpdate(prevProps) {
        if (this.props.isGrabbing && !prevProps.isGrabbing) {
            this.onHandGrab(this.props.handPos);
        }
        if (this.props.voiceSelectedColorString !== prevProps.voiceSelectedColorString && 
                this.state.selectedColor !== colors[this.props.voiceSelectedColorString]) {
            this.onSelectColor(this.props.voiceSelectedColorString);
        }
    }
    onHandGrab(handPos) {
        Object.keys(colors).forEach(colorString => {
            const intersects = this.doesIntersect(handPos, document.getElementById(colorString).getBoundingClientRect());
            if (intersects && this.state.selectedColor !== colors[colorString]) {
                this.onSelectColor(colorString);
            }
        })
    }
    doesIntersect(handPos, rectangle) {
        return rectangle.left <= handPos.x && handPos.x <= rectangle.right && rectangle.top <= handPos.y && handPos.y <= rectangle.bottom; 
    }
    onSelectColor(colorString) {
        this.setState({
            selectedColor: colors[colorString],
        }, () => this.props.onSelectColor(this.state.selectedColor, colorString));
    }
    render() {
        const colorDivs = Object.keys(colors).map(colorString => {
            let className = 'ColorPalette-color';
            if (colors[colorString] === this.state.selectedColor) {
                if (this.state.selectedColor === colors.green) {
                    className += ' ColorPalette-colorSelectedGreen'
                } else {
                    className += ' ColorPalette-colorSelected';
                }
            }
            return (
                <div className={className} id={colorString} key={colorString} style={{backgroundColor: colors[colorString]}}/>
            );
        });
        const colorRows = colorDivs.filter((colorDiv, index) => index % 2 === 0).map((colorDiv, index) => {
            const firstColor = colorDiv;
            const secondColor = colorDivs[2*index+1];
            return (<div className='ColorPalette-row' key={index}>
                {firstColor}
                {secondColor}
            </div>);
        });
        return (
            <div className='ColorPalette-container'>
                <div className='ColorPalette-title'>
                    Colors:
                </div>
                <div className='ColorPalette-column'>
                    {colorRows}
                </div>
            </div>
        );
    }
}