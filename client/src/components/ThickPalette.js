import React, { Component } from 'react';
import './ThickPalette.css';

import {thickness, defaultThickness} from '../helpers/constants';

export default class ThickPalette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedThickness: defaultThickness,
        };
        this.sizeForThickness = {
            small : '50px',
            medium : '70px',
            large : '90px',
            xLarge : '110px',
        };
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    componentDidUpdate(prevProps) {
        if (this.props.isGrabbing && !prevProps.isGrabbing) {
            this.onHandGrab(this.props.handPos);
        }
    }
    onHandGrab(handPos) {
        Object.keys(thickness).forEach(thicknessValue => {
            const intersects = this.doesIntersect(handPos, document.getElementById(thicknessValue).getBoundingClientRect());
            if (intersects && this.state.selectedThickness !== thickness[thicknessValue]) {
                this.setState({
                    selectedThickness: thickness[thicknessValue],
                }, () => this.props.onSelectThickness(this.state.selectedThickness, thicknessValue));
            }
        })
    }
    doesIntersect(handPos, rectangle) {
        return rectangle.left <= handPos.x && handPos.x <= rectangle.right && rectangle.top <= handPos.y && handPos.y <= rectangle.bottom; 
    }
    render() {
        const thicknessDivs = Object.keys(thickness).map(thicknessValue => {
            const size = this.sizeForThickness[thicknessValue];
            const className = 'ThickPalette-thickness' + (this.state.selectedThickness === thickness[thicknessValue] ? ' ThickPalette-thicknessSelected' : '');
            return (
                <div className={className} id={thicknessValue} key={thicknessValue} style={{width: size, height: size}} />
            )
        });
        return (
            <div className='ThickPalette-container'>
                <div className='ThickPalette-title'>
                    Thickness:
                </div>
                <div className='ThickPalette-column'>
                    {thicknessDivs}
                </div>
            </div>
        )
    }
}