import React, { Component } from 'react';
import './ColorPalette.css';

import {colors, defaultColor} from '../helpers/constants';

export default class ColorPalette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedColor: defaultColor,
        };
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if (this.props.isGrabbing && !prevProps.isGrabbing) {
            this.onHandGrab(this.props.handPos);
        }
    }
    onHandGrab(handPos) {
        Object.keys(colors).forEach(color => {
            const intersects = this.doesIntersect(handPos, document.getElementById(color).getBoundingClientRect());
            if (intersects && this.state.selectedColor !== colors[color]) {
                this.setState({
                    selectedColor: colors[color],
                }, () => this.props.onSelectColor(this.state.selectedColor, color));
            }
        })
    }
    doesIntersect(handPos, rectangle) {
        return rectangle.left <= handPos.x && handPos.x <= rectangle.right && rectangle.top <= handPos.y && handPos.y <= rectangle.bottom; 
    }
    render() {
        const colorDivs = Object.keys(colors).map(color => {
            let className = 'ColorPalette-color';
            if (colors[color] === this.state.selectedColor) {
                if (this.state.selectedColor === colors.green) {
                    className += ' ColorPalette-colorSelectedGreen'
                } else {
                    className += ' ColorPalette-colorSelected';
                }
            }
            return (
                <div className={className} id={color} key={color} style={{backgroundColor: colors[color]}}/>
            );
        });
        const colorRows = colorDivs.filter((color, index) => index % 2 === 0).map((firsColor, index) => {
            const secondColor = colorDivs[2*index+1];
            return (<div className='ColorPalette-row' key={index}>
                {firsColor}
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