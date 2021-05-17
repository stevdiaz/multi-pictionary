import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './HelpPopUp.css'

const getCommands = (openModal, closeModal) => {
    return [
        {
            command: 'help',
            callback: () => openModal(),
        },
        {
            command: 'exit',
            callback: () => closeModal(),
        },
    ];
}

export default function ControlledPopup(props) {

    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(o => !o);
    const closeModal = () => setOpen(false);
    const commands = getCommands(openModal, closeModal);
    SpeechRecognition.startListening({continuous: true});
    const { transcript, finalTranscript } = useSpeechRecognition({ commands });
    return (
        <div>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className='HelpPopUp-container'>
                <span className='HelpPopUp-title'>Help</span>
                <div className='HelpPopUp-body'>
                    When choosing a word, you can <span className='HelpPopUp-hand'>swipe</span> left or right with your fingers extended to move through the list.
                    You can also <span className='HelpPopUp-say'>say</span> 'next' or 'previous' for the next and previous words in the list, respectively.
                </div>

                <div className='HelpPopUp-body'>
                    To paint on the canvas, keep just your index finger <span className='HelpPopUp-hand'>extended</span> outward to produce ink.
                    To move your cursor ink-free, <span className='HelpPopUp-hand'>extend</span> all fingers outwards.
                    If you make mistakes, don't fret! <span className='HelpPopUp-say'>Say</span> 'undo' or 'clear' to erase.
                </div>

                <div className='HelpPopUp-body'>
                    To select colors or thickness levels, you can <span className='HelpPopUp-hand'>hover</span> over them with your hand and <span className='HelpPopUp-hand'>grab</span> to select, or you can use voice commands. 
                    <span className='HelpPopUp-say'> Say</span> 'switch color to ____' to switch your color to one of 'black', 'blue', 'red', 'yellow', 'purple', 'green', 'orange', or 'gray'. 
                    <span className='HelpPopUp-say'> Say</span> 'switch thickness to ____' to switch your ink thickness level to one of 'small', 'medium', 'large', or 'larger'
                </div>

                <div className='HelpPopUp-body'>
                    In the upper left corner, you can see how many guessers have guessed your word correctly.
                    In the upper right corner, you can see the guessers' real time guesses!
                </div>

                <div className='HelpPopUp-body'>
                    That's all! <span className='HelpPopUp-say'>Say</span> <span className='HelpPopUp-exit'>'exit'</span> to close this pop-up and get back into the game!
                </div>
            </div>
        </Popup>
        </div>
    );
};