import React, { Component } from 'react';
import './DrawerGuessVision.css';

export default class DrawerGuessVision extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newGuess: '',
        };
    }
    componentDidMount() {
        this.props.socket.on('guess', (newGuess) => {
            this.setState({
                newGuess: newGuess,
            }, () => this.readGuess(newGuess));
        });
    }
    componentDidUpdate() {

    }
    readGuess(guess) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = guess;
        msg.rate = 0.7;
        speechSynthesis.speak(msg);
    }
    render() {
        if (this.state.newGuess.length === 0 || this.props.selectedWord.length === 0) {
            return (<></>);
        } else {
            const className = 'DrawerGuessVision-guess DrawerGuessVision-' + (this.state.newGuess === this.props.selectedWord ? 'correct' : 'incorrect');
            return (
                <div className='DrawerGuessVision-container'>
                    Guesses: <span className={className}> {this.state.newGuess} </span>
                </div>
            )
        }
    }
}