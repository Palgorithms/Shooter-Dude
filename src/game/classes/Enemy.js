import { GameObjects } from 'phaser';

export default class Enemy extends GameObjects.Arc {
    constructor(scene, x, y) {
        super(scene, x, y, 1, 0, 360, false, 0xff0000);
        this.scene = scene;

        // this.cir = this.add.circle(this.x,this.y,200,)

        scene.add.existing(this);
        scene.physics.add.existing(this);
        // this.body.setCircle(radius);

        // this.speed = 50;
        this.speed = scene.player.maxSpeed/5;
        this.maxHealth = 50;
        this.health = 50;

        
    }

    spawn(speed, radius, color){
        //  enable
        this.body.enable = true;
        this.setActive(true)
        this.setVisible(true)

        //  Reset Speed
        this.speed = speed;
        this.health = this.maxHealth;

        //  Reset Size
        this.setRadius(radius);
        this.setFillStyle(color);
        //  Redraw Circle (reCenter Circle)
        this.body.setCircle(radius);
    }

    damage(damage){
        // this.radius -= 10;
        this.health -= damage;
        this.setRadius(this.health);
        this.body.setCircle(this.radius)
        this.speed += 60;

        if(this.health <= 0){
            // this.disableBody(true,true)
            this.body.enable = false; // Turn off physics
            this.setActive(false);    // Mark as dead for .get() to recycle
            this.setVisible(false);   // Hide it from the screen
        }
    }

    update(playerX, playerY) {
        if(!this.scene.player) return;
        playerX = this.scene.player.x;
        playerY = this.scene.player.y;
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

    // destroy(fromScene) {
        // super.destroy(fromScene);
        // this.destroy(fromScene)
    // }
}