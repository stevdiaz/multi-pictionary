import React, { Component } from 'react';
import './Entry.css';

import SmallButton from './SmallButton';

export default class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            didPressStart: false,
        };
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    didClickStart() {
        console.log('started');
    }
    render() {
        return (
            <div className='Entry-container'>
                <div className='Entry-firstLine'>
                    Multimodal
                </div>
                <div className='Entry-secondLine'>
                    <span role='img' aria-label='hand'>✋</span> Pictionary <span role='img' aria-label='microphone'>🎤</span>
                </div>

                <div className='Entry-description'>
                    remote pictionary with your friends, done right
                </div>

                <div className='Entry-startButton'>
                    <SmallButton buttonText='Close Fist to Start Game' onButtonClick={() => this.didClickStart()} />
                </div>
            </div>
        )
    };
}