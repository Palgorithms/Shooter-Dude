import { GameObjects } from 'phaser';

export default class Enemy extends GameObjects.Arc {
    constructor(scene, x, y, radius, color) {
        super(scene, x, y, radius, 0, 360, false, color);
        
        // this.cir = this.add.circle(this.x,this.y,200,)

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCircle(radius);

        this.speed = 50;

        
    }

    update(playerX, playerY) {
        this.handleMovement(playerX,playerY);
    }

    handleMovement(px,py) {
        let ns = this.normalize(px-this.x,py-this.y);
        this.body.setVelocity(ns.x*this.speed,ns.y*this.speed)
    }

    normalize(x, y, accel = 1) {
        const len = Math.hypot(x, y);
        return len > 0
            ? { x: (x / len) * accel, y: (y / len) * accel }
            : { x: 0, y: 0 };
    }

    destroy(fromScene) {
        // super.destroy(fromScene);
        // this.destroy(fromScene)
    }
}