import React, { Component } from 'react';

import DrawCard from './DrawCard';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

var nextId = 0;
var prevId = 0;

const getCommands = () => {
    return [
        {
            command: 'next (card)',
            callback: () => next(),
        },
        {
            command: 'previous (card)',
            callback: () => prev(),
        },
        {
            command: 'back',
            callback: () => prev(),
        },
    ];
}

function next() {
    console.log('switching to next card');
    nextId++;
}

function prev() {
    console.log('switching to prev card');
    prevId++;
}


export default function DrawCardSpeechHandler(props) {
    const commands = getCommands();
    SpeechRecognition.startListening({continuous: true});
    const { transcript, finalTranscript } = useSpeechRecognition({ commands });
    return <DrawCard nextId={nextId} prevId={prevId} {...props} />;
} 
