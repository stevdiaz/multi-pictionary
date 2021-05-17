import React, { Component } from 'react';

import ThickPalette from './ThickPalette';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import {thickness, defaultThicknessString} from '../helpers/constants';

var selectedThicknessString = defaultThicknessString;

const getCommands = () => {
    return [
        {
            command: 'switch (to) thickness (to) *',
            callback: (thicknessStringMatched) => setThickness(thicknessStringMatched.toLowerCase()),
        },
    ];
}

// sets selected thickness to a lowercased thickness string
function setThickness(thicknessStringMatched) {
    let thicknessStrings = thicknessStringMatched.split(' ').filter(word => word in thickness);
    if (thicknessStrings.length > 0) {
        let thicknessString = thicknessStrings[0];
        console.log('switching thickness to ' + thicknessString);
        selectedThicknessString = thicknessString;
    }
}


export default function ThickPaletteSpeechHandler(props) {
    const commands = getCommands();
    SpeechRecognition.startListening({continuous: true});
    const { transcript, finalTranscript } = useSpeechRecognition({ commands });
    return <ThickPalette voiceSelectedThicknessString={selectedThicknessString} {...props} />;
} 
