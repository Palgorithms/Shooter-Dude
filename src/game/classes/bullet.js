
// import { Scene, Input, Physics } from 'phaser';

// export default class Bullet extends Physics.Arcade.Sprite{
//     constructor(scene, x, y, texture, angle, speed, scale=1){
//         super(scene, x, y, texture);

//         scene.add.existing(this)
//         scene.physics.add.existing(this)

//         this.damage = 10;
//         this.lifespan = 2000;
//         this.scene = scene;

//         this.setScale(scale)
//         this.refreshBody()

//         this.lifeTimer = scene.time.delayedCall(this.lifespan, ()=>{
//             this.destroy()
//         }, [], this)

//         this.fire(x, y, angle, speed)
//     }

//     fire(x, y, angle, speed){
//         this.setPosition(x, y)
//         this.setAngle(angle)
//         this.scene.physics.velocityFromAngle(angle, speed, this.body.velocity);
//     }

//     destroy(fromScene){
//         if(this.lifeTimer){
//             this.lifeTimer.remove()
//             this.lifeTimer = null;
//         }
//         super.destroy(fromScene)
//     }
    
// }





import { Physics } from 'phaser';

export default class Bullet extends Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, angleRad, speed, scale = 1) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.damage = 10;
        this.lifespan = 2000;

        this.setScale(scale);
        this.refreshBody();

        this.lifeTimer = scene.time.delayedCall(this.lifespan, () => this.destroy());

        this.fire(x, y, angleRad, speed);
    }

    fire(x, y, angleRad, speed) {
        this.setPosition(x, y);
        this.setRotation(angleRad);              // ← radians
        this.scene.physics.velocityFromRotation(angleRad, speed, this.body.velocity);
    }

    destroy(fromScene) {
        if (this.lifeTimer) {
            this.lifeTimer.remove();
            this.lifeTimer = null;
        }
        super.destroy(fromScene);
    }
}