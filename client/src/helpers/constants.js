const black = '#000000';
const blue = '#0052e0';
const red = '#fa3c3c';
const yellow = '#fff75c'; 
const purple = '#d65cff';
const green = '#00ff11';
const orange = '#ffa35c';
const gray = '#808080';
export const colors = {
    black,
    blue,
    red,
    yellow,
    purple,
    green,
    orange,
    gray
};
export const defaultColorString = 'black';
export const defaultColor = colors[defaultColorString];

export const defaultCursorColor = '#8CFF98';

const smallThickness = 4;
const mediumThickness = 7;
const largeThickness = 10;
const largerThickness = 14;
export const thickness = {
    small: smallThickness,
    medium: mediumThickness,
    large: largeThickness,
    larger: largerThickness,
};
export const defaultThicknessString = 'medium';
export const defaultThickness = thickness[defaultThicknessString];

const choosingState = 'choose';
const drawingState = 'draw';
export const drawStates = {
    choosingState,
    drawingState,
};

const waitingState = 'wait';
const guessingState = 'guess';
const correctState = 'correct';
export const guessStates = {
    waitingState,
    guessingState,
    correctState,
};

const colorSelectedAnnouncement = (color) => "you have selected color " + color;
const thicknessSelectedAnnouncement = (thickness) => "you have selected thickness " + thickness;
const undoSuccessfulAnnouncement = () => "undo successful";
const clearSuccessfulAnnouncement = () => "clear successful";
export const announcements = {
    colorSelectedAnnouncement,
    thicknessSelectedAnnouncement,
    undoSuccessfulAnnouncement,
    clearSuccessfulAnnouncement,
};
