const black = '#000000';
const blue = '#0052e0';
const red = '#fa3c3c';
const yellow = '#fff75c'; 
const purple = '#d65cff';
const green = '#00ff11';
const orange = '#ffa35c';
const grey = '#808080';
export const colors = {
    black,
    blue,
    red,
    yellow,
    purple,
    green,
    orange,
    grey
};
export const defaultColor = black;

const smallThickness = 3;
const mediumThickness = 5;
const largeThickness = 7;
const xLargeThickness = 10;
export const thickness = {
    small: smallThickness,
    medium: mediumThickness,
    large: largeThickness,
    xLarge: xLargeThickness,
};
export const defaultThickness = mediumThickness;

const choosingState = 'choose';
const drawingState = 'draw';
export const drawStates = {
    choosingState,
    drawingState,
};

const colorSelectedAnnouncement = (color) => "you have selected color " + color;
const thicknessSelectedAnnouncement = (thickness) => "you have selected thickness " + thickness;
const undoSuccessfulAnnouncement = () => "undo successfull";
const clearSuccessfulAnnouncement = () => "clear successfull";
export const announcements = {
    colorSelectedAnnouncement,
    thicknessSelectedAnnouncement,
    undoSuccessfulAnnouncement,
    clearSuccessfulAnnouncement,
};
