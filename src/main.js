import StartGame from './game/main';

document.addEventListener('DOMContentLoaded', () => {

    // In your index.html or main.js
    document.getElementById('game-container').addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
    StartGame('game-container');

});