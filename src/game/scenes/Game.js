
// import { Scene, Input,Math as fMath } from 'phaser';
// import Bullet from '../classes/bullet';

// export class Game extends Scene
// {
//     constructor ()
//     {
//         super('Game');
//     }

//     preload(){
//         this.load.image('player','assets/player/soldierCut.png')
//         this.load.image('gun','assets/player/gun.png')
//         this.load.image('bullet','assets/player/red-bullet.png')
//         this.load.spritesheet("player-walk","assets/player/walk.png",{
//             frameWidth: 28,
//             frameHeight: 45,
//         })
        
//     }

//     create()
//     {
//         //  Camera
//         this.cam = this.input.cameras.main;
//         this.cam.setZoom(2)
//         // this.cam.setDeadzone(200,200)

//         //  Mouse
//         this.input.mouse.disableContextMenu();
//         this.mouse = this.input.activePointer;
        
//         //  Background
//         this.cameras.main.setBackgroundColor(0x00ff00);
//         this.add.image(this.game.config.width/2, this.game.config.height/2, 'background').setAlpha(.5).setScale(1/this.cam.zoom);
        
//         //  Player Config
//         this.player = this.physics.add.sprite(this.game.config.width/2,this.game.config.height/2,'player-walk').setScale(1)
//         if (!this.player.anims.exists('walk')) {
//             this.player.anims.create({
//                 key: 'walk',
//                 frames: this.anims.generateFrameNumbers('player-walk', { start: 0, end: 5 }),
//                 frameRate: 15,
//                 repeat: -1
//             });
//         }
//         this.player.play("walk")
//         // this.player.moveSpeed = 200;
//         this.player.accel = 3000;
//         this.player.setDrag(1200,1200)
//         this.player.setMaxVelocity(250)
//         this.player.maxSpeed = this.player.body.maxVelocity.x;
//         this.player.facingR = true;
//         //  Gun
//         let offset = {x:-1*this.player.scale,y:6*this.player.scale};
//         // this.player.gun = this.add.rectangle(this.player.x+offset.x,this.player.y+offset.y,20*this.player.scale,8*this.player.scale,0x000000)
//         this.player.gun = this.add.image(this.player.x+offset.x,this.player.y+offset.y,"gun").setScale(this.player.scale)
//         this.player.gun.setOrigin(.3,.5)
//         this.player.gun.offset = offset;
//         //  Camera Follow
//         this.cam.startFollow(this.player, true, .2, .2)

//         //  Bullets
//         // this.bullets = this.physics.add.group({
//         //     classType : Bullet,
//         //     maxSize: 50,
//         //     // runChildUpdate: false,
//         // })

//         //  Key Bindings   addListener => once
//         this.input.addListener('pointerdown', (e) => {
//             //  Shoot
//             let xtip = Math.cos(fMath.DegToRad(this.player.gun.angle)) * (10*this.player.gun.scale);
//             let ytip = Math.sin(fMath.DegToRad(this.player.gun.angle)) * (10*this.player.gun.scale);
//             new Bullet(this,this.player.gun.x+xtip,this.player.gun.y+ytip,"bullet",this.player.gun.angle,this.player.body.maxVelocity.x*4,this.player.scale)
            
//             //  Damage
//             // this.cam.shake(100, .01);
//             // this.cam.flash(50, 255, 0, 0);
//         });
//         this.keys = this.input.keyboard.addKeys({
//             up : "W",
//             down : "S", //  Both Works Perfectly
//             left : Input.Keyboard.KeyCodes.A,
//             right : Input.Keyboard.KeyCodes.D,
//         })
//         this.cursors = this.input.keyboard.createCursorKeys();

//     }

//     faceRight(){
//         if(this.player.facingR) return;
//         this.player.setFlipX(false);
//         this.player.gun.setFlipY(false);
//         this.player.gun.offset.x *= -1;
//         this.player.facingR = true;
//     }
    
//     faceLeft(){
//         if(!this.player.facingR) return;
//         this.player.setFlipX(true);
//         this.player.gun.setFlipY(true);
//         this.player.gun.offset.x *= -1;
//         this.player.facingR = false;
//     }

//     update(time, delta){
//         //  Mouse Fixed World Position
//         this.mouse.updateWorldPoint(this.cam)
//         this.handlePlayerMovement(delta)
//         this.handleGun()
//     }
    
//     handlePlayerMovement(d){

//         //  Final Version

//         let xv=0,yv=0;
//         if(this.keys.right.isDown || this.cursors.right.isDown) xv += 1;
//         if(this.keys.left.isDown  || this.cursors.left.isDown)  xv -= 1;
//         if(this.keys.down.isDown  || this.cursors.down.isDown)  yv += 1;
//         if(this.keys.up.isDown    || this.cursors.up.isDown)    yv -= 1;
//         let velocity = this.normalize(xv,yv,this.player.accel);
//         this.player.setAcceleration(velocity.x,velocity.y)

//         if(this.player.body.velocity.length() > this.player.maxSpeed){
//             const scale = this.player.maxSpeed / this.player.body.velocity.length();
//             this.player.body.velocity.x *= scale;
//             this.player.body.velocity.y *= scale;
//         }
//         // console.log(this.player.body.velocity)
//         // console.log(this.player.body.velocity.length())
//         // console.log(this.player.body.acceleration)
//         // console.log(this.player.body.maxVelocity)
//         // console.log(this.player.body.velocity)
//         // const v = this.player.body.velocity;
//         // console.log(`speed: ${v.length().toFixed(1)}, max: ${this.player.body.maxVelocity.x}`);
        
//         //  Flip on Movement
//         if(velocity.x > 0){
//             this.faceRight();
//         }
//         else if(velocity.x < 0){
//             this.faceLeft();
//         }

//         //  Animation
//         if(this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0){
//             if (this.player.anims.isPlaying){
//                 this.player.anims.pause();
//                 this.player.setFrame(0);
//             }
//         }
//         else{
//             if (!this.player.anims.isPlaying){
//                 this.player.anims.resume()
//             }
//             this.player.anims.timeScale = this.player.body.velocity.length() / 250;
//         }

//         //  Second Version
        
//         // let xv=0,yv=0;
//         // if(this.keys.right.isDown || this.cursors.right.isDown) xv += 1;
//         // if(this.keys.left.isDown  || this.cursors.left.isDown)  xv -= 1;
//         // if(this.keys.down.isDown  || this.cursors.down.isDown)  yv += 1;
//         // if(this.keys.up.isDown    || this.cursors.up.isDown)    yv -= 1;
//         // let velocity = this.normalize(xv,yv);
//         // //  Physics
//         // this.player.body.setVelocity(velocity.x * this.player.moveSpeed,velocity.y * this.player.moveSpeed)
//         // //  Manual
//         // // this.player.x += velocity.x * this.player.moveSpeed * d/100;
//         // // this.player.y += velocity.y * this.player.moveSpeed * d/100;

//         //  First Version

//         // let xv=0,yv=0;
//         // if(this.keys.right.isDown) xv += 1;
//         // if(this.keys.left.isDown)  xv -= 1;
//         // if(this.keys.down.isDown)  yv += 1;
//         // if(this.keys.up.isDown)    yv -= 1;
//         // if(xv != 0 || yv != 0){
//         //     let angle = Math.atan2(yv,xv);
//         //     xv = Math.cos(angle);
//         //     yv = Math.sin(angle);
//         //     this.player.x += xv*this.player.moveSpeed * d/100;
//         //     this.player.y += yv*this.player.moveSpeed * d/100;
//         // }
//     }

//     handleGun(){
//         //  Hold Gun
//         this.player.gun.x = this.player.body.center.x + this.player.gun.offset.x;
//         this.player.gun.y = this.player.body.center.y + this.player.gun.offset.y;
//         //  Rotate Gun
//         let dy = this.mouse.worldY-this.player.gun.y;
//         let dx = this.mouse.worldX-this.player.gun.x;
//         this.player.gun.angle = Math.atan2(dy,dx);
//         this.player.gun.setRotation(this.player.gun.angle)
//     }

//     normalize(x,y,accel=1){
//         let len = Math.hypot(x,y);
//         return len > 0 ? {x : (x/len)*accel, y : (y/len)*accel} : {x:0,y:0};
//     }
// }





import { Scene, Input } from 'phaser';
import Player from '../classes/Player';
import Bullet from '../classes/Bullet';
import Enemy from '../classes/Enemy';
// import Enemy from '../classes/Enemy';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        // this.load.image('player', 'assets/player/soldierCut.png');
        this.load.image('grid', 'assets/tileLines.png');
        this.load.image('gun', 'assets/player/gun.png');
        this.load.image('bullet', 'assets/player/red-bullet.png');
        this.load.spritesheet('player-walk', 'assets/player/walk.png', {
            frameWidth: 28,
            frameHeight: 45
        });
    }

    create() {
        // Camera
        this.cam = this.cameras.main;
        this.cam.setZoom(1.2);
        this.cam.setBackgroundColor(0x00ff00);

        // Mouse
        this.input.mouse.disableContextMenu();
        this.mouse = this.input.activePointer;

        // console.log(this.scale)
        this.bg = this.add.tileSprite(
            0, 0,
            this.scale.width, this.scale.height,
            'grid'
        )
        .setOrigin(0, 0)
        .setScrollFactor(0);  // stays fixed on screen

        // Player
        this.player = new Player(
            this,
            this.game.config.width / 2,
            this.game.config.height / 2
        );

        //  Bullets
        this.bullets = this.physics.add.group({
            classType: Bullet,
            maxSize : 20
        });

        //  Enemys
        this.enemys = this.physics.add.group({
            classType: Enemy,
            maxSize : 30,
            runChildUpdate: true // This automatically calls enemy.update() every frame!
        });
        // this.enemys.push(
        //     new Enemy(
        //         this,
        //         this.game.config.width,
        //         this.game.config.height/2,
        //         50,
        //         0xff0000
        //     )
        // )

        //  Enemys Spawner
        this.enemySpawner = this.time.addEvent({
            delay : 2000,
            callback : this.spawnEnemy,
            callbackScope : this,
            loop : true
        })

        // Camera follow
        this.cam.startFollow(this.player, true, 0.2, 0.2);

        // Shooting
        this.input.on('pointerdown', () => this.shoot());
    }

    update() {        
        this.mouse.updateWorldPoint(this.cam);
        this.player.update(this.mouse.worldX, this.mouse.worldY);
        // this.enemys.forEach((enemy) => {
        //     enemy.update(this.player.x,this.player.y)
        // })

        this.bg.tilePositionX = this.cam.scrollX;
        this.bg.tilePositionY = this.cam.scrollY;

        this.handleOverlaps()
    }

    shoot() {
        const g = this.player.gun;
        const angle = g.rotation;
        const tip = 10 * g.scaleX;
        // this.bullets.push(
        //     new Bullet(
        //         this,
        //         g.x + Math.cos(angle) * tip,
        //         g.y + Math.sin(angle) * tip,
        //         'bullet',
        //         angle,
        //         this.player.maxSpeed * 3,
        //         // this.player.maxSpeed * 1,
        //         g.damage,
        //         this.player.scaleX*1.5,
        //         // this.player.scaleX*5,
        //     )
        // )
        let b = this.bullets.get(
            g.x + Math.cos(angle) * tip,
            g.y + Math.sin(angle) * tip,
            'bullet',
        );
        if(b)
            b.fire(
                angle,
                this.player.maxSpeed * 3,
                // this.player.maxSpeed * 1,
                g.damage,
                this.player.scaleX*1.5,
                // this.player.scaleX*5,
            )

        // console.log(this.bullets)
    }

    spawnEnemy(rad=50,color=0xff0000){
        if(this.enemys.length<30){
            let ang = Math.random()*Math.PI*2; 
            let dis = Math.hypot(this.game.config.width/2+rad/2,this.game.config.height/2+rad/2);
            this.enemys.push(
                new Enemy(
                    this,
                    dis * Math.cos(ang) + this.player.x,
                    dis * Math.sin(ang) + this.player.y,
                    rad,
                    color
                )
            )
        }
    }

    handleOverlaps(){
        this.physics.overlap(this.enemys,this.bullets,(e,b)=>{
            e.radius -= 10;
            e.body.setCircle(e.radius)
            e.speed += 60;

            if(e.radius <= 0){
                this.enemys.splice(this.enemys.findIndex( ee => ee == e),1)
                e.destroy()
            }
            
            if(this.bullets.length){
                this.bullets.splice(this.bullets.findIndex( bb => bb == b),1)
                b.destroy()
            }
            
            console.log(this.enemys)
            // console.log(b)
        })
    }
}