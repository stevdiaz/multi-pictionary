import React, { Component } from 'react';

import Canvas from './Canvas';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

var undoId = 0;
var clearId = 0;

const getCommands = () => {
    return [
        {
            command: 'undo',
            callback: () => undo(),
        },
        {
            command: 'clear',
            callback: () => clear(),
        }
    ];
}

const undo = () => {
    console.log('undo');
    undoId++;
}

const clear = () => {
    console.log('clear');
    clearId++;
}

export default function CanvasSpeechHandler(props) {
    const commands = getCommands();
    SpeechRecognition.startListening({continuous: true});
    const { transcript, finalTranscript } = useSpeechRecognition({ commands });
    return <Canvas undoId={undoId} clearId={clearId} {...props} />;
} 

