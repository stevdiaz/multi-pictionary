import React, { Component } from 'react';
import './DrawCard.css';

export default class DrawCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            didStartDrawing: false,
        };
        this.options = ['cat', 'dog', 'car', 'bus', 'house', 'tree', 'star', 'plane', 'mug', 'bike', 'fish', 'pizza', 'apple', 'spider'];
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if (!this.state.didStartDrawing) {
            if (this.props.isDrawing) {
                this.props.onSelectWord(this.options[this.state.index]);
                this.setState({
                    didStartDrawing: true,
                });
            }
            if (this.props.swipeObject.isSwipe && !prevProps.swipeObject.isSwipe) {
                this.onSwitchToCard(!this.props.swipeObject.isRight);
            } 
            if (this.props.nextId > prevProps.nextId) {
                this.onSwitchToCard(true);
            } else if (this.props.prevId > prevProps.prevId) {
                this.onSwitchToCard(false);
            }
        }
    }
    onSwitchToCard(isNext) {
        let newIndex = this.state.index;
        if (isNext) {
            newIndex = (newIndex === this.options.length - 1 ? 0 : newIndex + 1);
        } else {
            newIndex = (newIndex === 0 ? this.options.length - 1 : newIndex - 1);
        }
        this.setState({
            index: newIndex,
        });
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