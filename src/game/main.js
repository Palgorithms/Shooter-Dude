import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game, Scale } from 'phaser';

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
            debug: true // should be False
        }
    },
    render: {
        roundPixels: true
    },
    scale: {
        mode: Scale.ENVELOP,    //  Fit
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        MainMenu,
        MainGame,
    ]
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
