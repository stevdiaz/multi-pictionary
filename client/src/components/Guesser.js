import React, { Component } from 'react';
import './Guesser.css';

import Canvas from './Canvas';
import GuesserSidePanelSpeechHandler from './GuesserSidePanelSpeechHandler';
import GuessHelper from './GuessHelper';
import GuessStatus from './GuessStatus';

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
    componentDidUpdate(prevProps) {
        if (this.props.roundId > prevProps.roundId) {
            // reset for new round
            this.setState({
                guessState: guessStates.waitingState,
                selectedWord: "nil",
            });
        }
    }
    onGuess(newGuess) {
        this.props.socket.emit('guesserNewGuess', newGuess);
    }
    onGuessCorrectly() {
        this.props.socket.emit('guesserCorrect');
        this.setState({
            guessState: guessStates.correctState,
        });
    }
    render() {
        const topBlurb = this.state.guessState === guessStates.waitingState ? 'Drawer is choosing a word...' : 'Drawer is drawing the word';
        return (
            <div className='Guesser-container'>
                <div className='Guesser-row Guesser-topRow'>
                    <GuessStatus isDrawer={false} 
                                socket={this.props.socket} 
                                roundId={this.props.roundId}/>
                    <div className='Guesser-topBlurb'>
                        {topBlurb}
                    </div>
                </div>    
                <div className='Guesser-row Guesser-botRow'> 
                    <Canvas socket={this.props.socket}
                            isDrawer={false} 
                            roundId={this.props.roundId} />
                    <GuesserSidePanelSpeechHandler selectedWord={this.state.selectedWord}
                                                    onGuess={(newGuess) => this.onGuess(newGuess)}
                                                    onGuessCorrectly={() => this.onGuessCorrectly()}
                                                    roundId={this.props.roundId} />
                </div>
                <GuessHelper guessState={this.state.guessState} />
            </div>
        )
    }
}