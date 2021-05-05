import logo from './logo.svg';
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

import Cursor from './components/Cursor';
import Entry from './components/Entry';
import Canvas from './components/Canvas';
import Drawer from './components/Drawer';
import ColorPalette from './components/ColorPalette';
import JoinCreate from './components/JoinCreate';
import WaitingRoom from './components/WaitingRoom';
import Guesser from './components/Guesser';
import GuesserSidePanel from './components/GuesserSidePanel';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      didTransitionToDraw: false,
      isIndexPoint: false,
      handPos: {x: 0, y: 0},
      isGrabbing: false,
      isCircular: false,
      swipeObject: {
        isSwipe: false,
        isRight: false,
      },
      isDrawer: false,
    };
    this.socket = socketIOClient();
  }

  componentDidMount() {
    this.socket.on('newRound', (isDrawer) => {
      this.setState({
        isDrawer: isDrawer,
      });
    });
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
  onStartGame(isDrawer) {
    this.setState({
      didTransitionToDraw: true,
      isDrawer: isDrawer,
    });
  }
  render() {
    let content = (<Entry handPos={this.state.handPos} 
                          isGrabbing={this.state.isGrabbing} 
                          socket={this.socket} 
                          onStartGame={(isDrawer) => this.onStartGame(isDrawer)}/>);

    if (this.state.didTransitionToDraw) {
      if (this.state.isDrawer) {
        content = (<Drawer isIndexPoint={this.state.isIndexPoint} 
                            handPos={this.state.handPos} 
                            swipeObject={this.state.swipeObject}
                            isGrabbing={this.state.isGrabbing} 
                            socket={this.socket} />);
      } else {
        content = (<Guesser isIndexPoint={this.state.isIndexPoint} 
                            handPos={this.state.handPos}
                            swipeObject={this.state.swipeObject}
                            isGrabbing={this.state.isGrabbing}
                            socket={this.socket} />);
      }
    }
    return (
      <div>
        <Cursor onHandGrabUpdate={(isGrabbing) => this.onHandGrabUpdate(isGrabbing)} 
                onPointUpdate={(isIndexPoint, handPos) => this.onPointUpdate(isIndexPoint, handPos)}
                onCircularUpdate={(isCircular) => this.onCircularUpdate(isCircular)}
                onSwipeUpdate={(swipeObject) => this.onSwipeUpdate(swipeObject)}/>
        {content}
      </div>
    )
  }
}
