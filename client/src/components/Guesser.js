import React, { Component } from 'react';
import './Guesser.css';

import Canvas from './Canvas';

export default class Guesser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    render() {
        return (
            <div className='Guesser-container'>
                <Canvas isIndexPoint={this.props.isIndexPoint} 
                        handPos={this.props.handPos} 
                        isCircular={this.props.isCircular}
                        onStartDraw={() => this.updateIsDrawing(true)} 
                        onEndDraw={() => this.updateIsDrawing(false)}
                        onUndo={() => this.onUndo()}
                        onClear={() => this.onClear()}
                        selectedColor={this.state.selectedColor} 
                        selectedThickness={this.state.selectedThickness} 
                        socket={this.props.socket}
                        isDrawer={false} />
            </div>
        )
    }
}