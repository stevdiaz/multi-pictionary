import React, { Component } from 'react';
import './DrawHelper.css';

import { drawStates } from '../helpers/constants';

export default class DrawHelper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    render() {
        var text = '';
        if (this.props.drawState === drawStates.choosingState) {
            text = "swipe left or right with fingers extended to switch word";
        } else if (this.props.drawState === drawStates.drawingState) {
            text = "say 'undo' or 'clear' to erase. hover over and grab colors or thickness levels";
        }
        return (
            <div className='DrawHelper-container'>
                {text}
            </div>
        )
    }
}