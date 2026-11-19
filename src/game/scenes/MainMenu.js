import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    preload(){
        this.load.image('background','assets/bg.png');
        this.load.image('logo','assets/logo.png');
    }

    create ()
    {
        this.add.image(this.game.config.width/2, this.game.config.height/2, 'background');

        this.add.image(this.game.config.width/2, this.game.config.height/2, 'logo');

        let txt = this.add.text(512, 460, 'Start Game', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        txt.setInteractive({useHandCursor:true})

        txt.once('pointerdown', () => {
            this.scene.start('Game');
        });
        // this.input.once('pointerdown', () => {
        //     this.scene.start('Game');
        // });
    }
}
