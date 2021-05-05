import React, { Component } from 'react';
import './Guesser.css';

import Canvas from './Canvas';
import GuesserSidePanelSpeechHandler from './GuesserSidePanelSpeechHandler';
import GuessHelper from './GuessHelper';

import {guessStates} from '../helpers/constants';

export default class Guesser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guessState: guessStates.waitingState,
            selectedWord: "nil",
        };
    }
    componentDidMount() {
        this.props.socket.on('selectWord', (word) => {
            this.setState({
                guessState: guessStates.guessingState,
                selectedWord: word,
            });
        });
    }
    componentDidUpdate() {

    }
    onGuessCorrectly() {
        this.setState({
            guessState: guessStates.correctState,
        });
    }
    render() {
        const topBlurb = this.state.guessState === guessStates.waitingState ? 'Drawer is choosing a word...' : 'Drawer is drawing the word';
        return (
            <div className='Guesser-container'>
                <div className='Guesser-topBlurb'>
                   {topBlurb}
                </div>
                <div className='Guesser-row'> 
                    <Canvas socket={this.props.socket}
                            isDrawer={false} />
                    <GuesserSidePanelSpeechHandler selectedWord={this.state.selectedWord}
                                                    onGuessCorrectly={() => this.onGuessCorrectly()}/>
                </div>
                <GuessHelper guessState={this.state.guessState} />
            </div>
        )
    }
}