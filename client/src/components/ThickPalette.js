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
            larger : '110px',
        };
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if (this.props.isGrabbing && !prevProps.isGrabbing) {
            this.onHandGrab(this.props.handPos);
        }
        if (this.props.voiceSelectedThicknessString !== prevProps.voiceSelectedThicknessString && 
                this.state.selectedThickness !== thickness[this.props.voiceSelectedThicknessString]) {
            this.onSelectThickness(this.props.voiceSelectedThicknessString);
        }
    }
    onHandGrab(handPos) {
        Object.keys(thickness).forEach(thicknessString => {
            const intersects = this.doesIntersect(handPos, document.getElementById(thicknessString).getBoundingClientRect());
            if (intersects && this.state.selectedThickness !== thickness[thicknessString]) {
                this.onSelectThickness(thicknessString);
            }
        })
    }
    onSelectThickness(thicknessString) {
        this.setState({
            selectedThickness: thickness[thicknessString],
        }, () => this.props.onSelectThickness(this.state.selectedThickness, thicknessString));
    }
    doesIntersect(handPos, rectangle) {
        return rectangle.left <= handPos.x && handPos.x <= rectangle.right && rectangle.top <= handPos.y && handPos.y <= rectangle.bottom; 
    }
    render() {
        const thicknessDivs = Object.keys(thickness).map(thicknessString => {
            const size = this.sizeForThickness[thicknessString];
            const className = 'ThickPalette-thickness' + (this.state.selectedThickness === thickness[thicknessString] ? ' ThickPalette-thicknessSelected' : '');
            return (
                <div className={className} id={thicknessString} key={thicknessString} style={{width: size, height: size}} />
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