import React, { Component } from 'react';
import './JoinCreate.css';

import SmallButton from './SmallButton';
import SmallText from './SmallText';

export default class JoinCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: "",
            isError: false,
            status: "",
        };
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    onChooseCreate() {
        console.log("did choose create");
        if (this.state.roomName.length === 0) {
            this.setState({
                isError: true,
                status: "Cannot create an empty room name",
            });
        } else {
            this.setState({
                isError: false,
                status: "Creating...",
            }, () => {
                this.props.socket.emit("createRoom", this.state.roomName, response => {
                    if (response.error) {
                        this.setState({
                            isError: true,
                            status: "Room name already in use; choose another name",
                        });
                    } else {
                        // successfully created room
                        this.props.onJoinCreate(this.state.roomName, 1, true);
                    }
                });
            });
        }
    }
    onChooseJoin() {
        console.log("did choose join");
        if (this.state.roomName.length === 0) {
            this.setState({
                isError: true,
                status: "Cannot join an empty room name",
            });
        } else {
            this.setState({
                isError: false,
                status: "Joining...",
            }, () => {
                this.props.socket.emit("joinRoom", this.state.roomName, (response) => {
                    if (response.error) {
                        this.setState({
                            isError: true,
                            status: "Room name does not exist",
                        });
                    } else {
                        // successfully joined room
                        this.props.onJoinCreate(this.state.roomName, response.roomSize, false);
                    }
                });
            });
        }
    }
    onChangeRoomName(roomName) {
        this.setState({
            roomName: roomName,
        });
    }
    render() {
        const widthPercent = '35%';
        const statusClassName = 'JoinCreate-status' + (this.state.isError ? ' JoinCreate-error' : '');
        const status = this.state.status.length === 0 ? (<div></div>) : (<div className={statusClassName}>{this.state.status}</div>);
        return (
            <div className='JoinCreate-container'>
                <div className='JoinCreate-description'>
                    Create a new room or join a room created by your friends
                </div>
                {status}
                <SmallText onChangeRoomName={(roomName) => this.onChangeRoomName(roomName)}/>
                <div className='JoinCreate-row'>
                    <SmallButton buttonText='Create Room' 
                                onButtonClick={() => this.onChooseCreate()} 
                                isGrabbing={this.props.isGrabbing}
                                handPos={this.props.handPos} 
                                widthPercent={widthPercent}/>
                    <SmallButton buttonText='Join Room' 
                                onButtonClick={() => this.onChooseJoin()} 
                                isGrabbing={this.props.isGrabbing}
                                handPos={this.props.handPos} 
                                widthPercent={widthPercent}/>
                </div>
            </div>
        );
    }
}