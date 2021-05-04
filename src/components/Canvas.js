import React, { Component } from 'react';
import './Canvas.css';

export default class Canvas extends React.Component {
    constructor(props) {
        super(props);
        let ref = React.createRef();
        this.state = {
            isDrawing: false,
            prevPos: {
                x: 0,
                y: 0,
            },
            line: [],
            strokes: [], // strokes[i] is stroke object, which contains color, thickness, and position fields
            ref: ref,
        };
        this.canvasWidth = 1200;
        this.canvasHeight = 800;
    }
    componentDidMount() {
        this.state.ref.current.width = this.canvasWidth;
        this.state.ref.current.height = this.canvasHeight;
        const ctx = this.getCtx();
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = this.props.selectedThickness; 
    }
    componentDidUpdate(prevProps) {
        const transformedHandPos = this.transform(this.props.handPos);
        if (!this.state.isDrawing && this.props.isIndexPoint && !prevProps.isIndexPoint) {
            this.onStartDraw(transformedHandPos);
            this.props.onStartDraw();
        } else if (this.state.isDrawing && this.props.isIndexPoint && prevProps.isIndexPoint && 
            this.props.handPos !== prevProps.handPos) {
            this.onMoveFinger(transformedHandPos);
        } else if (this.state.isDrawing && !this.props.isIndexPoint && prevProps.isIndexPoint) {
            this.onEndDraw();
            this.props.onEndDraw();
        } else if (this.props.undoId > prevProps.undoId) {
            this.undo();
            this.props.onUndo();
        } else if (this.props.clearId > prevProps.clearId) {
            this.clear({forUndo: false});
            this.props.onClear();
        }
    }
    transform(handPos) {
        return {
            x: handPos.x - 340,
            y: handPos.y - 100,
        };
    }
    onStartDraw(posEvent) {
        const { x, y } = posEvent;
        const offsetData = {x, y};
        const newStrokeObj = {
            color: this.props.selectedColor,
            thickness: this.props.selectedThickness,
            positions: [offsetData],
        };
        this.setState((prevState) => ({
            isDrawing: true,
            prevPos: offsetData,
            strokes: prevState.strokes.concat(newStrokeObj),
        }));
    }
    onMoveFinger(posEvent) {
        if (this.state.isDrawing) {
            const { x, y } = posEvent;
            const offsetData = { x, y };
            const positionData = {
                start: { ...this.state.prevPos },
                stop: { ...offsetData },
            };
            let strokes = [...this.state.strokes];
            const lastIndex = strokes.length - 1;
            let lastStrokeObject = {...strokes[lastIndex]};
            let positions = [...lastStrokeObject.positions];  
            positions.push(offsetData);
            lastStrokeObject.positions = positions;
            strokes[lastIndex] = lastStrokeObject;
            this.setState(prevState => ({
                line: prevState.line.concat(positionData),
                strokes: strokes
            }), () => this.paint(this.state.prevPos, offsetData, this.props.selectedColor, this.props.selectedThickness));
        }
    }
    onEndDraw() {
        this.setState({
            isDrawing: false,
        });
    }
    paint(prevPos, currPos, color, thickness) {
        const { x, y } = currPos;
        const { x: prevX, y: prevY } = prevPos;

        const ctx = this.getCtx();
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness; 
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
        this.setState({
            prevPos: {
                x,
                y
            },
        });
    }
    clear({forUndo}) {
        console.log('clear');
        const ctx = this.getCtx();
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if (!forUndo) {
            this.setState({
                strokes: [],
            });
        }
    }
    undo() {
        console.log('undo');
        this.clear({forUndo: true});
        let strokes = [...this.state.strokes];
        strokes.pop();
        this.setState({
            strokes: strokes,
        }, () => {
            this.state.strokes.forEach(stroke => {
                for (let i = 1; i < stroke.positions.length; i++) {
                    const prevPos = stroke.positions[i-1];
                    const currPos = stroke.positions[i];
                    this.paint(prevPos, currPos, stroke.color, stroke.thickness);
                }
            });
        });
    }
    getCtx() {
        return this.state.ref.current.getContext('2d');
    }
    render() {
        return (
            <div className='Canvas-container'>
                <div className='Canvas-canvas'>
                    <canvas
                        id='Canvas'
                        ref={this.state.ref}
                        style={{ background: 'var(--offwhite)' }}
                    />
                </div>
            </div>
        )
    }
}