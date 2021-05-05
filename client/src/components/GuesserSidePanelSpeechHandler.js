import React, { Component } from 'react';

import GuesserSidePanel from './GuesserSidePanel';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

var undoId = 0;
var clearId = 0;

const getCommands = () => {
    return [
    ];
}


export default function GuesserSidePanelSpeechHandler(props) {
    const commands = getCommands();
    SpeechRecognition.startListening({continuous: true});
    const { transcript, finalTranscript } = useSpeechRecognition({ commands });
    const guesses = transcript.split(" ");
    return <GuesserSidePanel guesses={guesses} {...props} />;
} 

