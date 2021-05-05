import React, { Component } from 'react';
import './DrawCard.css';

export default class DrawCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            didStartDrawing: false,
        };
        this.options = ['cat', 'dog', 'car', 'bus', 'house', 'tree', 'pool', 'star', 'plane', 'computer'];
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if (this.props.isDrawing && !this.state.didStartDrawing) {
            this.props.onSelectWord(this.options[this.state.index]);
            this.setState({
                didStartDrawing: true,
            });
        }
        if (this.props.swipeObject.isSwipe && !prevProps.swipeObject.isSwipe && !this.state.didStartDrawing) {
            let newIndex = this.state.index;
            if (this.props.swipeObject.isRight) {
                newIndex = (newIndex === this.options.length - 1 ? 0 : newIndex + 1);
            } else {
                newIndex = (newIndex === 0 ? this.options.length - 1 : newIndex - 1);
            }
            this.setState({
                index: newIndex,
            });
        }
    }
    render() {
        let card = (<span className='DrawCard-card'>{this.options[this.state.index]}</span>);
        let text = this.state.didStartDrawing ? 
        (
            <>
                Drawing a {card}
            </>
        ) : (
            <>
                Choosing a {card}
            </>
        );

        return (
            <div className='DrawCard-container'>
                {text}
            </div>
        )
    }
}