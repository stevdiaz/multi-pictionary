import React, { Component } from 'react';
import './SmallButton.css';

export default class SmallButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    componentDidMount() {

    };
    componentDidUpdate() {

    };
    onClick() {
        this.props.onButtonClick();
    }
    render() {
        return (
            <div className='SmallButton-button' onClick={() => this.onClick()}>
                {this.props.buttonText}
            </div>
        )
    };
}