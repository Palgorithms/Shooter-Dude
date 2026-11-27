// scenes/HudScene.js
import { Scene } from 'phaser';

export default class HudScene extends Scene {
    constructor() {
        super('HudScene');
    }

    create() {
        // Example: A score text in the top-left
        this.scoreText = this.add.text(70, 10, 'Score: 0', {
            fontSize: '60px',
            fontStyle: "bold",
            color: '#fff',
            strokeThickness: 6,
            stroke: "#000"
        });

        let healthBar = {
            x : 70,
            y : 110,
            w : 400,
            h : 40,
            offset : 12,    //  better to be Even
        }

        // Example: A health bar background (using a rectangle)
        this.add.rectangle(
            healthBar.x,
            healthBar.y,
            healthBar.w,
            healthBar.h,
            0x000000).setOrigin(0, .5);
        // The actual health bar that will shrink
        this.healthBar = this.add.rectangle(
            healthBar.x + healthBar.offset/2,
            healthBar.y,
            healthBar.w - healthBar.offset,
            healthBar.h - healthBar.offset,
            0x00ff00,
        ).setOrigin(0, .5);

        // this.add.rectangle(100,100,100,100,0xffff00)

        // Listen for events from the Game Scene
        const gameScene = this.scene.get('Game');
        gameScene.events.on('update-health', (health, maxHealth) => {
            const ratio = health / maxHealth;
            this.healthBar.width = 200 * ratio;
        });
        
        gameScene.events.on('update-score', (score) => {
            this.scoreText.setText(`Score: ${score}`);
        });
    }
}