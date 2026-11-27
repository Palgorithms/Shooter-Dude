
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
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;

        this.damage = 10;

        // this.damage = damage;
        // this.lifespan = 2000;

        // this.setScale(scale);
        // let bodyScale = 1;
        // let r = Math.hypot(this.width*(bodyScale/2),this.height*(bodyScale/2));
        // this.body.setCircle(r,-(r-this.width/2),-(r-this.height/2));
        
        // this.lifeTimer = scene.time.delayedCall(this.lifespan, () => this.disableBody(true,true));
        
        // this.body.setOrigin()
        // this.refreshBody();
        // this.body.setSize(this.width*2,this.height*2);

        // this.fire(x, y, angleRad, speed);
    }

    fire(angleRad, speed, damage = 10, scale = 1) {
        this.body.enable = true;
        this.setActive(true)
        this.setVisible(true)

        this.damage = damage;
        this.lifespan = 2000;

        this.setScale(scale);
        let bodyScale = 1;
        let r = Math.hypot(this.width*(bodyScale/2),this.height*(bodyScale/2));
        this.body.setCircle(r,-(r-this.width/2),-(r-this.height/2));
        
        if (this.lifeTimer) {
            this.lifeTimer.remove();
        }
        this.lifeTimer = this.scene.time.delayedCall(this.lifespan, () => this.disableBody(true,true));

        this.setRotation(angleRad);
        this.scene.physics.velocityFromRotation(angleRad, speed, this.body.velocity);
    }

    // destroy(fromScene) {
    //     if (this.lifeTimer) {
    //         this.lifeTimer.remove();
    //         this.lifeTimer = null;
    //     }

    //     if(this.scene.bullets.length){
    //         this.scene.bullets.splice(this.scene.bullets.findIndex( b => b == this),1)
    //     }

    //     super.destroy(fromScene);
    // }

    overlap(entity){
        entity.damage(this.damage)
    }
}