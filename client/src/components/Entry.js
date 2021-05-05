import React, { Component } from 'react';
import './Entry.css';

import SmallButton from './SmallButton';
import JoinCreate from './JoinCreate';
import WaitingRoom from './WaitingRoom';

export default class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            didPressStart: false,
            didJoinCreate: false,
            roomName: "",
            isCreator: false,
        };
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    onStartGame() {
        this.props.onStartGame(this.state.isCreator);
    }
    onJoinCreate(roomName, roomSize, isCreator) {
        this.setState({
            didJoinCreate: true,
            roomName: roomName,
            roomSize: roomSize,
            isCreator: isCreator,
        });
    }
    render() {
        let content = (<JoinCreate handPos={this.props.handPos} 
                                    isGrabbing={this.props.isGrabbing} 
                                    socket={this.props.socket} 
                                    onJoinCreate={(roomName, roomSize, isCreator) => this.onJoinCreate(roomName, roomSize, isCreator)} />);
        if (this.state.didJoinCreate) {
            content = (<WaitingRoom isCreator={this.state.isCreator} 
                                    roomName={this.state.roomName} 
                                    roomSize={this.state.roomSize}
                                    handPos={this.props.handPos} 
                                    isGrabbing={this.props.isGrabbing} 
                                    socket={this.props.socket} 
                                    onStartGame={() => this.onStartGame()} />);
        }
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

                <div className='Entry-content'>
                    {content}
                </div>
                
            </div>
        )
    };
}