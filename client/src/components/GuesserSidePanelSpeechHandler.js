import React, { Component } from 'react';

import GuesserSidePanel from './GuesserSidePanel';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

var prevRoundId = 0;

const getCommands = () => {
    return [
    ];
}


export default function GuesserSidePanelSpeechHandler(props) {
    const commands = getCommands();
    SpeechRecognition.startListening({continuous: true});
    const { transcript, finalTranscript, resetTranscript } = useSpeechRecognition({ commands });
    let guesses = transcript.split(" ");
    if (props.roundId > prevRoundId) {
        resetTranscript();
        guesses = [];
        prevRoundId = props.roundId;
    }
    return <GuesserSidePanel guesses={guesses} {...props} />;
} 

