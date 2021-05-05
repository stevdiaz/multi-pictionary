import React, { Component } from 'react';
import './GuessHelper.css';

import {guessStates} from '../helpers/constants';

export default class GuessHelper extends React.Component {
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
        if (this.props.guessState === guessStates.waitingState) {
            text = "wait for the drawer to choose a word";
        } else if (this.props.guessState === guessStates.guessingState) {
            text = "drawing has started! shout out the word to guess it";
        } else if (this.props.guessState === guessStates.correctState) {
            text = "you have correctly guessed! now, wait for the round to be over";
        }
        return (
            <div className='GuessHelper-container'>
                {text}
            </div>
        )
    }
}