import React, { Component } from 'react';
import './Drawer.css';

import CanvasSpeechHandler from './CanvasSpeechHandler';
import DrawCardSpeechHandler from './DrawCardSpeechHandler';
import DrawHelper from './DrawHelper';
import ColorPaletteSpeechHandler from './ColorPaletteSpeechHandler';
import ThickPaletteSpeechHandler from './ThickPaletteSpeechHandler';
import GuessStatus from './GuessStatus';
import DrawerGuessVision from './DrawerGuessVision';

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
            selectedWord: "",
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
    onSelectWord(word) {
        this.setState({
            selectedWord: word,
        });
        this.props.socket.emit('drawerSelectWord', word);
    }
    render() {
        return (
            <div className='Drawer-container'>
                <div className='Drawer-row Drawer-topRow'>
                    <GuessStatus isDrawer={true} socket={this.props.socket} />
                    <DrawCardSpeechHandler swipeObject={this.props.swipeObject} isDrawing={this.state.isDrawing} onSelectWord={(word) => this.onSelectWord(word)}/>
                    <DrawerGuessVision selectedWord={this.state.selectedWord} socket={this.props.socket} />
                </div>
                <div className='Drawer-row'>
                    <ColorPaletteSpeechHandler handPos={this.props.handPos} 
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
                    <ThickPaletteSpeechHandler handPos={this.props.handPos}
                        isGrabbing={this.props.isGrabbing}
                        onSelectThickness={(selectedThickness, thicknessName) => this.onSelectThickness(selectedThickness, thicknessName)} />
                </div>
                <DrawHelper drawState={this.state.drawState} announcement={this.state.announcement}/>
            </div>
        );
    }
}