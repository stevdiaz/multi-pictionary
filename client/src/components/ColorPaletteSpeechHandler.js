import React, { Component } from 'react';

import ColorPalette from './ColorPalette';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import {colors, defaultColorString} from '../helpers/constants';

var selectedColorString = defaultColorString;

const getCommands = () => {
    return [
        {
            command: 'switch (to) color (to) *',
            callback: (colorStringMatched) => setColor(colorStringMatched.toLowerCase()),
        },
    ];
}

// sets selected color to a lowercased color string
function setColor(colorStringMatched) {
    let colorStrings = colorStringMatched.split(' ').filter(word => word in colors);
    if (colorStrings.length > 0) {
        let colorString = colorStrings[0];
        console.log('switching color to ' + colorString);
        selectedColorString = colorString;
    }
}


export default function ColorPaletteSpeechHandler(props) {
    const commands = getCommands();
    SpeechRecognition.startListening({continuous: true});
    const { transcript, finalTranscript } = useSpeechRecognition({ commands });
    return <ColorPalette voiceSelectedColorString={selectedColorString} {...props} />;
} 
