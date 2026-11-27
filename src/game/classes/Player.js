import { Physics } from 'phaser';
// Player.js
export default class Player extends Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player-walk');
        scene.add.existing(this).setScale(1);
        scene.physics.add.existing(this);

        this.accel = 3000;
        this.maxSpeed = 250;
        this.setDrag(1200, 1200);
        this.facingR = true;

        this.keys = scene.input.keyboard.addKeys({ up: 'W', down: 'S', left: 'A', right: 'D' });
        this.cursors = scene.input.keyboard.createCursorKeys();

        // Gun — owned by the player
        const offset = { x: -1 * this.scaleX, y: 6 * this.scaleY };
        this.gun = scene.add.image(x, y, 'gun')
            .setScale(this.scaleX)
            .setOrigin(0.3, 0.5);
        this.gun.offset = offset;
        this.gun.damage = 10;

        if (!scene.anims.exists('walk')) {
            scene.anims.create({
                key: 'walk',
                frames: scene.anims.generateFrameNumbers('player-walk', { start: 0, end: 5 }),
                frameRate: 15,
                repeat: -1
            });
        }
        this.play('walk');
    }

    update(mouseWorldX, mouseWorldY) {
        this.handleMovement();
        this.handleGun(mouseWorldX, mouseWorldY);
    }

    handleMovement() {
        let x = 0, y = 0;
        if (this.keys.right.isDown || this.cursors.right.isDown) x += 1;
        if (this.keys.left.isDown  || this.cursors.left.isDown)  x -= 1;
        if (this.keys.down.isDown  || this.cursors.down.isDown)  y += 1;
        if (this.keys.up.isDown    || this.cursors.up.isDown)    y -= 1;

        const a = this.normalize(x, y, this.accel);
        this.setAcceleration(a.x, a.y);

        const v = this.body.velocity;
        const speed = v.length();
        if (speed > this.maxSpeed) {
            const s = this.maxSpeed / speed;
            v.x *= s;
            v.y *= s;
        }

        if (a.x > 0) this.faceRight();
        else if (a.x < 0) this.faceLeft();

        if (speed === 0) {
            if (this.anims.isPlaying) {
                this.anims.pause();
                this.setFrame(0);
            }
        } else {
            if (!this.anims.isPlaying) this.anims.resume();
            this.anims.timeScale = speed / this.maxSpeed;
        }
    }

    handleGun(mx, my) {
        const c = this.body.center;
        this.gun.x = c.x + this.gun.offset.x;
        this.gun.y = c.y + this.gun.offset.y;
        const dx = mx - this.gun.x;
        const dy = my - this.gun.y;
        this.gun.rotation = Math.atan2(dy, dx);

        if(mx < this.x){
            this.gun.setFlipY(true);
            this.gun.offset.x = -Math.abs(this.gun.offset.x);
        }
        else{
            this.gun.setFlipY(false);
            this.gun.offset.x = Math.abs(this.gun.offset.x);
        }
    }

    faceRight() {
        if (this.facingR) return;
        this.setFlipX(false);
        // this.gun.setFlipY(false);
        // this.gun.offset.x *= -1;
        this.facingR = true;
    }

    faceLeft() {
        if (!this.facingR) return;
        this.setFlipX(true);
        // this.gun.setFlipY(true);
        // this.gun.offset.x *= -1;
        this.facingR = false;
    }

    normalize(x, y, accel = 1) {
        const len = Math.hypot(x, y);
        return len > 0
            ? { x: (x / len) * accel, y: (y / len) * accel }
            : { x: 0, y: 0 };
    }
}