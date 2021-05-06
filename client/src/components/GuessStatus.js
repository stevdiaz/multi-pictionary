import React, { Component } from 'react';
import './GuessStatus.css';

export default class GuessStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            correctGuesses: 0,
            amountOfGuessers: 0,
            didStartNewRound: false,
            didReceiveRoomSize: false,
        };
    }
    componentDidMount() {
        this.props.socket.emit('getRoomSize', (response) => {
            if (!response.error) {
                this.setState({
                    amountOfGuessers: response.roomSize - 1,
                    didReceiveRoomSize: true,
                });
            }
        });
        this.props.socket.on('guesserCorrectUpdate', (correctGuesses) => {
            this.setState({
                correctGuesses: correctGuesses,
            });
        });
    }
    componentDidUpdate(prevProps) {
        if (!this.state.didStartNewRound && this.props.isDrawer && this.state.didReceiveRoomSize && this.state.correctGuesses === this.state.amountOfGuessers) {
            this.setState({
                didStartNewRound: true,
            }, () => this.props.socket.emit('roundOver'));
        } else if (this.props.roundId > prevProps.roundId) {
            // reset for new round
            this.setState({
                correctGuesses: 0,
                didStartNewRound: false,
            })
        }
    }
    render() {
        return (
            <div className='GuessStatus-container'>
                Correct Guesses: <span className='GuessStatus-correct'> {this.state.correctGuesses} </span> / {this.state.amountOfGuessers}
            </div>
        )
    }
}