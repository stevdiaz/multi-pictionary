import React, { Component } from 'react';
import './GuessStatus.css';

export default class GuessStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guessesCorrect: 0,
            amountOfGuessers: 0,
        };
    }
    componentDidMount() {
        this.props.socket.emit('getRoomSize', (response) => {
            if (!response.error) {
                this.setState({
                    amountOfGuessers: response.roomSize - 1,
                });
            }
        });
        this.props.socket.on('guesserCorrectUpdate', (correctGuesses) => {
            this.setState({
                guessesCorrect: correctGuesses,
            });
        });
    }
    componentDidUpdate() {

    }
    render() {
        return (
            <div className='GuessStatus-container'>
                Correct Guesses: <span className='GuessStatus-correct'> {this.state.guessesCorrect} </span> / {this.state.amountOfGuessers}
            </div>
        )
    }
}