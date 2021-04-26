import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';

import Cursor from './components/Cursor';
import Entry from './components/Entry';
import Canvas from './components/Canvas';
import Drawer from './components/Drawer';
import ColorPalette from './components/ColorPalette';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isIndexPoint: false,
      handPos: {x: 0, y: 0},
      isGrabbing: false,
      isCircular: false,
      swipeObject: {
        isSwipe: false,
        isRight: false,
      },
    };
  }

  componentDidMount() {
  
  }
  componentDidUpdate() {

  }
  onPointUpdate(isIndexPoint, handPos) {
    this.setState({
      isIndexPoint: isIndexPoint,
      handPos: handPos,
    });
  }
  onHandGrabUpdate(isGrabbing) {
    this.setState({
      isGrabbing: isGrabbing,
    });
  }
  onCircularUpdate(isCircular) {
    this.setState({
      isCircular: isCircular,
    });
  }
  onSwipeUpdate(swipeObject) {
    this.setState({
      swipeObject: swipeObject,
    });
  }
  render() {
    return (
      <div>
        <Cursor onHandGrabUpdate={(isGrabbing) => this.onHandGrabUpdate(isGrabbing)} 
                onPointUpdate={(isIndexPoint, handPos) => this.onPointUpdate(isIndexPoint, handPos)}
                onCircularUpdate={(isCircular) => this.onCircularUpdate(isCircular)}
                onSwipeUpdate={(swipeObject) => this.onSwipeUpdate(swipeObject)}/>
        <Drawer isIndexPoint={this.state.isIndexPoint} 
                handPos={this.state.handPos} 
                swipeObject={this.state.swipeObject}
                isGrabbing={this.state.isGrabbing}/>
      </div>
    )
  }
}
