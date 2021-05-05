import React, { Component } from 'react';
import './WaitingRoom.css';

import SmallButton from './SmallButton';

export default class WaitingRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomSize: 1,
        };
    }
    componentDidMount() {
        this.setState({
            roomSize: this.props.roomSize,
        });
        this.props.socket.on('roomUpdate', (roomSize) => {
            this.setState({
                roomSize: roomSize,
            });
        });
        this.props.socket.on('startGame', () => {
            this.props.onStartGame();
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.isGrabbing && !prevProps.isGrabbing) {
            this.onStartGame();
        }
    }
    onStartGame() {
        if (this.props.isCreator) {
            this.props.socket.emit('creatorStartGame', (response) => {
                if (!response.error) {
                    this.props.onStartGame();
                }
            });
        }
    }
    render() {
        return (
            <div className='WaitingRoom-container'>
                <div className='WaitingRoom-description'>
                    Currently in room <span className='WaitingRoom-roomName'>{this.props.roomName}</span>
                </div>
                <div className='WaitingRoom-body'>
                    {`Room size: ${this.state.roomSize}`}
                </div>
                {this.props.isCreator ? (<div className='WaitingRoom-start'> 
                    <SmallButton buttonText='Close Fist to Start Game'
                                onButtonClick={() => this.onStartGame()}
                                isGrabbing={this.props.isGrabbing}
                                handPos={this.props.handPos} />
                </div>) : <div className='WaitingRoom-body'>
                    Waiting for room creator to start...
                </div>}
            </div>
        )
    }
}