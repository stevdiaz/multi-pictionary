import React, { Component } from 'react';
import './Drawer.css';

import CanvasSpeechHandler from './CanvasSpeechHandler';
import DrawCard from './DrawCard';
import DrawHelper from './DrawHelper';
import ColorPalette from './ColorPalette';
import ThickPalette from './ThickPalette';

import { drawStates, colors, defaultColor, thickness, defaultThickness, announcements } from '../helpers/constants';

export default class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawState: drawStates.choosingState,
            isDrawing: false,
            selectedColor: defaultColor,
            selectedThickness: defaultThickness,
            announcement: "",
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
    onSelectColor(selectedColor, colorName) {
        this.setState({
            selectedColor: selectedColor,
            announcement: announcements.colorSelectedAnnouncement(colorName),
        });
    }
    onSelectThickness(selectedThickness, thicknessName) {
        this.setState({
            selectedThickness: selectedThickness,
            announcement: announcements.thicknessSelectedAnnouncement(thicknessName),
        });
    }
    onUndo() {
        this.setState({
            announcement: announcements.undoSuccessfulAnnouncement(),
        });
    }
    onClear() {
        this.setState({
            announcement: announcements.clearSuccessfulAnnouncement(),
        });
    }
    render() {
        return (
            <div className='Drawer-container'>
                <DrawCard swipeObject={this.props.swipeObject} isDrawing={this.state.isDrawing}/>
                <div className='Drawer-row'>
                    <ColorPalette handPos={this.props.handPos} 
                        isGrabbing={this.props.isGrabbing}
                        onSelectColor={(selectedColor, colorName) => this.onSelectColor(selectedColor, colorName)} />
                    <CanvasSpeechHandler isIndexPoint={this.props.isIndexPoint} 
                        handPos={this.props.handPos} 
                        isCircular={this.props.isCircular}
                        onStartDraw={() => this.updateIsDrawing(true)} 
                        onEndDraw={() => this.updateIsDrawing(false)}
                        onUndo={() => this.onUndo()}
                        onClear={() => this.onClear()}
                        selectedColor={this.state.selectedColor} 
                        selectedThickness={this.state.selectedThickness} 
                        socket={this.props.socket}
                        isDrawer={true} />
                    <ThickPalette handPos={this.props.handPos}
                        isGrabbing={this.props.isGrabbing}
                        onSelectThickness={(selectedThickness, thicknessName) => this.onSelectThickness(selectedThickness, thicknessName)} />
                </div>
                <DrawHelper drawState={this.state.drawState} announcement={this.state.announcement}/>
            </div>
        );
    }
}