import React, { Component } from 'react';
import './SmallText.css';

export default class SmallText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: "",
        };
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    onChangeRoomName(evt) {
        const roomName = evt.target.value;
        this.setState({
            roomName: roomName,
        });
        this.props.onChangeRoomName(roomName)
    }
    render() {
        const style = this.props.widthPercent !== undefined ? {width: this.props.widthPercent} : {};
        return (
            <input className='SmallText-text'
                    style={style} 
                    onChange={(evt) => this.onChangeRoomName(evt)} 
                    value={this.state.roomName} 
                    placeholder={"Enter room name"} />
        );
    }
}