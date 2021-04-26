import React, { Component } from 'react';
import './Drawer.css';

import CanvasSpeechHandler from './CanvasSpeechHandler';
import DrawCard from './DrawCard';
import DrawHelper from './DrawHelper';
import ColorPalette from './ColorPalette';
import ThickPalette from './ThickPalette';

import { drawStates, colors, defaultColor, thickness, defaultThickness } from '../helpers/constants';

export default class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawState: drawStates.choosingState,
            isDrawing: false,
            selectedColor: defaultColor,
            selectedThickness: defaultThickness,
        };
    }
    componentDidMount() {

    }
    componentDidUpdate() {
    
    }
    updateIsDrawing(isDrawing) {
        this.setState({
            drawState: drawStates.drawingState,
            isDrawing: isDrawing,
        });
    }
    onSelectColor(selectedColor) {
        this.setState({
            selectedColor: selectedColor,
        });
    }
    onSelectThickness(selectedThickness) {
        this.setState({
            selectedThickness: selectedThickness,
        });
    }
    render() {
        return (
            <div className='Drawer-container'>
                <DrawCard swipeObject={this.props.swipeObject} isDrawing={this.state.isDrawing}/>
                <div className='Drawer-row'>
                    <ColorPalette handPos={this.props.handPos} 
                        isGrabbing={this.props.isGrabbing}
                        onSelectColor={(selectedColor) => this.onSelectColor(selectedColor)} />
                    <CanvasSpeechHandler isIndexPoint={this.props.isIndexPoint} 
                        handPos={this.props.handPos} 
                        isCircular={this.props.isCircular}
                        onStartDraw={() => this.updateIsDrawing(true)} 
                        onEndDraw={() => this.updateIsDrawing(false)}
                        selectedColor={this.state.selectedColor} 
                        selectedThickness={this.state.selectedThickness} />
                    <ThickPalette handPos={this.props.handPos}
                        isGrabbing={this.props.isGrabbing}
                        onSelectThickness={(selectedThickness) => this.onSelectThickness(selectedThickness)} />
                </div>
                <DrawHelper drawState={this.state.drawState} />
            </div>
        );
    }
}