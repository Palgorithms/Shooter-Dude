import { AUTO, Game, Scale } from 'phaser';

import { Game as MainGame } from './scenes/Game';
import MainMenu from './scenes/MainMenu';
import HudScene from './scenes/HudScene';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    pixelArt: true,
    antialias: false,
    // fps: {
    //     limit: 60
    // },
    physics: {
        default: 'arcade',
        arcade: {
            fps: 200,
            fixedStep: false,
            gravity: { y: 0 }, // top-down game can set 0
            // debug: true // should be False
        }
    },
    render: {
        roundPixels: true
    },
    scale: {
        mode: Scale.FIT,    //  Fit
        autoCenter: Scale.CENTER_BOTH,
        // parent: 'game-container',
        // width: 1024,  // Your base resolution
        // height: 768
    },
    input: {
        windowEvents: true // This tells Phaser to listen to mouse events on the whole window
    },
    scene: [
        MainMenu,
        MainGame,
        HudScene
    ]
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
