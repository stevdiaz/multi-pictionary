import React, { Component } from 'react';
import './GuesserSidePanel.css';

export default class GuesserSidePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            didGuessCorrectly: false,
        };
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if (this.props.guesses.length > 0 && this.props.guesses.length !== prevProps.guesses.length) {
            const newGuess = this.props.guesses[this.props.guesses.length - 1];
            this.props.onGuess(newGuess);
        }
    }
    onGuessCorrectly() {
        if (!this.state.didGuessCorrectly) {
            this.setState({
                didGuessCorrectly: true,
            }, () => this.props.onGuessCorrectly());
        }
    }
    render() {
        let didGuessCorrectly = false;
        const guesses = this.props.guesses.filter(guess => {
            if (guess === this.props.selectedWord && !didGuessCorrectly) {
                didGuessCorrectly = true;
                return true;
            } else {
                return guess !== '' && !didGuessCorrectly;
            }
        }).map((guess, index) => {
            let className = '';
            if (guess === this.props.selectedWord) {
                className = 'GuesserSidePanel-correct';
                didGuessCorrectly = true;
            } else {
                className = 'GuesserSidePanel-incorrect';
            }
            return (<li className={className} key={index}>{guess}</li>);
        });
        if (didGuessCorrectly) {
            this.onGuessCorrectly();
        }
        return (
            <div className='GuesserSidePanel-container'>
                <div className='GuesserSidePanel-title'>
                    Guesses:
                </div>
                <ul className='GuesserSidePanel-guesses'>
                    {guesses}
                </ul>
            </div>
        )
    }
}