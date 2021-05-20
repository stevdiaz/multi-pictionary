# Multimodal Pictionary
## A project by Steven Diaz for MIT's 6.835 

### Description
This project attempts to solve the problems of online pictionary games by introducing multimodal aspects; the drawer can use their hands to draw in the space in front of their computer, as if it were a sketchpad, and the guesser can use their natural voices to guess out loud, as they would in-person. With these changes, the online game becomes more natural and fun to play with others.

### How to Use
The code for the game is currently live at https://multi-pic.herokuapp.com/, and so you don't have to run anything on your local machine. Just visit that URL to access the web app.

### Table of Contents 
Here is a table of contents of all the files in the codebase, along with a description of what each file does. Note that the .css files are not listed here, since they are just styling for their corresponding .js file.

| File        | Description |
| ----------- | ----------- |
| Canvas.js   | Displays and handles the user drawing on a canvas element       |
| CanvasSpeechHandler.js | A wrapper of the Canvas component, used to detect voice commands for the Canvas (i.e. 'erase')        |
| ColorPalette.js | Handles the display and selection of colors for the drawing ink |
| ColorPaletteSpeechHandler.js | A wrapper of the ColorPalette component, used to detect voice commands for colors (i.e. 'switch') |
| Cursor.js | Tracks the user's hand using the Leap Motion SDK and dispays a cursor on the screen |
| DrawCard.js | Handles the display, switching, and selection of the words to draw |
| DrawCardSpeechHandler.js | A wrapper of the DrawCard component, used to detect voice commands for switching word (i.e. 'next') |
| Drawer.js | Displays the entire Drawer POV which the drawer sees |
| DrawerGuessVision.js | Displays guesser information for the drawer, such as the most recent guesses |
| DrawHelper.js | Displays helper announcements on the bottom of the screen for drawers |
| Entry.js | Displays the first page when entering the web app |
| Guesser.js | Displays the entire Guesser POV which a guesser sees |
| GuesserSidePanel.js | Displays the guesser side panel which shows the list of the guesser's guesses |
| GuesserSidePanelSpeechHandler.js | A wrapper of the GuesserSidePanelSpeechHandler, which detects the actual guesses made |
| GuessHelper.js | Displays helper announcements on the bottom of the screen for guessers |
| GuessStatus.js | Displays the number of guesses which are currently correct in the game |
| HelpPopUp.js | Displays the help menu which pops up when users say 'help' |
| JoinCreate.js | Handles creation and joining of rooms when users start a game |
| SmallButton.js | Displays a green button throughout the app, for multiple purposes |
| SmallText.js | Text entry input used for JoinCreate |
| ThickPalette.js | Handles the display and selection of thickness colors for the drawing ink |
| ThickPaletteSpeechHandler.js | A wrapper of the ThickPalette component, used to detect voice commands for thickness (i.e. 'switch') |
| WaitingRoom.js | Displays the room size and waits for the original creator of a room to start the game |
