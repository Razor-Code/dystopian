import React, {useEffect, useRef, useState} from 'react';
import styles from './index.module.css';

// images
import background from '../../public/graphics/background.png';
import platform from '../../public/graphics/platform.png';
import smallPlatform from '../../public/graphics/smallPlatform.png';
import stepUpPlatfrom from '../../public/graphics/stepUpPlatform.png';
import mediumTallPlatform from '../../public/graphics/mediumTallPlatform.png';
import tallBridge from '../../public/graphics/tallBridge.png';
import tallPlatform from '../../public/graphics/tallPlatform.png';


// sprites
import spriteIdleRight from '../../public/graphics/spriteIdleRight.png';
import spriteIdleLeft from '../../public/graphics/spriteIdleLeft.png';
import spriteJumpRight from '../../public/graphics/spriteJumpRight.png';
import spriteJumpLeft from '../../public/graphics/spriteJumpLeft.png';
import spriteRunRight from '../../public/graphics/spriteRunRight.png';
import spriteRunLeft from '../../public/graphics/spriteRunLeft.png';

const Index = () => {
  // const canvasRef = useRef();
  // useEffect(() => {
  //   if(canvasRef.current) {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext('2d');
  //     ctx.fillStyle = 'white';
  //     ctx.fillRect(0, 0, canvas.width, canvas.height);
  //     const bg = new Image();
  //     bg.src = "./img/cybercity.png";
  //     const playerimg = new Image();
  //     playerimg.src = "./img/Idle/Idle1.png";

  //     let gravity = 1.5;

  //     class Player {
  //       constructor() {
  //         this.speed = 10;
  //         this.position = {
  //           x: 20,
  //           y: 480
  //         };
  //         this.velocity = {
  //           x: 0,
  //           y: 0
  //         };
  //         this.width = 200;
  //         this.height = 200;

  //         this.image = playerimg;
  //         this.frames = 0;
  //         this.sprites = {
  //           idle: [playerimg]
  //         }
  //         this.currentSprite = this.sprites.idle[0];
  //       }
  //       draw() {
  //         ctx.drawImage(playerimg, this.position.x, this.position.y, this.width, this.height);
  //       }
  //       update() {
  //         this.frames++
  //         const { currentSprite, sprites } = this;
  //       }
  //     }

  //     class sprite {
  //       constructor(position,velocity, image) {
  //         this.bg = new Image();
  //         this.bg.src = "./img/cybercity.png";
  //         this.position = position;
  //       }
  //       draw(){
  //         ctx.drawImage(this.bg , this.position.position , 0, 4 * canvas.height, canvas.height);
  //       }
  //     }


  //     let player = new Player();

  //     const background = new sprite({
  //       position: 5,
  //       image: bg
  //     });
      
  //     const keys = {
  //       w: {
  //         pressed: false
  //       },
  //       a: {
  //         pressed: false
  //       },
  //       s: {
  //         pressed: false
  //       },
  //       d: {
  //         pressed: false
  //       }
  //     }
    
  //       //set image height fit to the height of the canvas
  //       function animate(){
  //       window.requestAnimationFrame(animate);
  //       background.draw();
        
        
  //       if (keys.d.pressed && player.position.x < canvas.width - player.width) {
  //         background.position.position = background.position.position - 5;
  //       }

  //       if (keys.a.pressed) {
  //         if(background.position.position < 0){
  //            background.position.position = background.position.position + 5;
  //         }
  //         else{
  //           background.position.position = 0;
  //         }
  //       }
  //       }
  //       animate();

  //       window.addEventListener('keydown', function(e){
  //         switch(e.key){
  //           case 'w':
  //             keys.w.pressed = true;
  //             break;
  //           case 'a':
  //             keys.a.pressed = true;
  //             break;
  //           case 's':
  //             keys.s.pressed = true;
  //             break;
  //           case 'd':
  //             keys.d.pressed = true;
  //             break;
  //         }
  //       });

  //       window.addEventListener('keyup', function(e){
  //         switch(e.key){
  //           case 'w':
  //             keys.w.pressed = false;
  //             break;
  //           case 'a':
  //             keys.a.pressed = false;
  //             break;
  //           case 's':
  //             keys.s.pressed = false;
  //             break;
  //           case 'd':
  //             keys.d.pressed = false;
  //             break;
  //         }
  //       });
    
  //     }
  // }, [canvasRef]);

  // ##############################################
  // ##############################################
  // ##############################################

  const canvasRef = useRef();
  // const [screenSize, setScreenSize] = useState([0, 0]);
  useEffect(() => {
    if(canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = innerWidth - 10;
      canvas.height = innerHeight - 10;
      // screenSize = setScreenSize([innerWidth, innerHeight]);

      const gravity = 1.5;
    
      class Player {
        constructor() {
          this.position = {
            x: 25,
            y: canvas.height - 200
          }

          this.velocity = {
            x: 0,
            y: 1
          }

          this.width = 71;
          this.height = 67;

          this.frames = 0;
          this.sprites = {
            idle: {
              right: createImage(spriteIdleRight),
              left: createImage(spriteIdleLeft),
              numFrames: 4
            },
            run: {
              right: createImage(spriteRunRight),
              left: createImage(spriteRunLeft),
              numFrames: 7
            },
            jump: {
              right: createImage(spriteJumpRight),
              left: createImage(spriteJumpLeft),
              numFrames: 4
            },
          }

          this.currentSprite = this.sprites.idle.right;
          this.numFrames = this.sprites.idle.numFrames;
        }
    
        draw() {
          ctx.drawImage(this.currentSprite, 71 * Math.floor(this.frames), 0, 71, 67, this.position.x, this.position.y, this.width, this.height);
        }

        update() {
          this.frames += 0.01 * this.numFrames;
          if (this.frames > this.numFrames) {
            this.frames = 0;
          }
          this.draw();
          this.position.y += this.velocity.y;
          this.position.x += this.velocity.x;

          if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
          }
        }
      }

      class Platform {
        constructor({x, y, image}) {
          this.position = { x, y }
          this.image = image;
          this.width = image.width;
          this.height = image.height;
          
        }

        draw() {
          ctx.drawImage(this.image, this.position.x, this.position.y);
        }
      }

      class GenericObject {
        constructor({x, y, image}) {
          this.position = { x, y }
          this.image = image;
          this.width = image.width;
          this.height = image.height;
          
        }

        draw() {
          ctx.drawImage(this.image, this.position.x, this.position.y, innerHeight * this.image.width / this.image.height, innerHeight);
        }
      }

      

      // images
      function createImage(imageSrc) {
        const image = new Image();
        image.src = imageSrc.src;
        image.height = imageSrc.height;
        image.width = imageSrc.width;
        image.base = canvas.height - imageSrc.height;
        return image;
      }

      let player
      let platforms
      let genericObjects
      let scrollOffset;
      let lastKey;

      var keys = {
        right: {
          pressed: false
        },
        left: {
          pressed: false
        }
      }

      function start() {
        let platformImage = createImage(platform);
        let smallPlatformImage = createImage(smallPlatform);
        let stepUpPlatformImage = createImage(stepUpPlatfrom);
        let mediumTallPlatformImage = createImage(mediumTallPlatform);
        let tallBridgeImage = createImage(tallBridge);
        let tallPlatformImage = createImage(tallPlatform);

        player = new Player();
        platforms = [
          new Platform({x: 0, y: platformImage.base, image: platformImage}),
          new Platform({x: 250, y: smallPlatformImage.base, image: smallPlatformImage}),
          new Platform({x: 450, y: stepUpPlatformImage.base, image: stepUpPlatformImage}),
          new Platform({x: 550, y: mediumTallPlatformImage.base, image: mediumTallPlatformImage}),
          new Platform({x: 875, y: tallBridgeImage.base, image: tallBridgeImage}),
          new Platform({x: 1400, y: mediumTallPlatformImage.base, image: mediumTallPlatformImage}),
          new Platform({x: 1700, y: tallPlatformImage.base, image: tallPlatformImage}),
        ]

        genericObjects = [
          new GenericObject({x: 0, y: 0, image: createImage(background)}),
        ];
        scrollOffset = 0;
      }

      start();

      function animate() {
        window.requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        genericObjects.forEach(genericObject => {
          genericObject.draw();
        });
        platforms.forEach(platform => {
          platform.draw();
        });
        player.update();

        // changing player velocity
        if (keys.right.pressed && player.position.x < canvas.width * 0.8) {
          player.velocity.x = 1;
        } else if (
          (keys.left.pressed && player.position.x > canvas.width * 0.2) ||
          (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
        ) {
          player.velocity.x = -1;
        } else {
          player.velocity.x = 0;
        }

        // if (player.velocity.y !== 0) return;

        if (keys.right.pressed) {
          scrollOffset += 1;
          platforms.forEach(platform => {
            platform.position.x -= 1;
          });
          genericObjects.forEach(genericObject => {
            genericObject.position.x -= 0.25;
          });
        } else if (keys.left.pressed && scrollOffset > 0) {
          scrollOffset -= 1;
          platforms.forEach(platform => {
            platform.position.x += 1;
          });
          genericObjects.forEach(genericObject => {
            genericObject.position.x += 0.25;
          });
        }

        if (scrollOffset > 2000) {
          console.log("YOU WIN!!!!!")
        }

        if (player.position.y > canvas.height) {
          start();
        }


        platforms.forEach(platform => {
          if (
            player.position.y + player.height <= platform.position.y + 10
            && player.position.y + player.height + player.velocity.y + player.velocity.y >= platform.position.y + 10
            && player.position.x + player.width >= platform.position.x + 20
            && player.position.x <= platform.position.x + platform.width - 20
            ) {
            player.velocity.y = 0;
          }
        });

        if (
          keys.right.pressed && lastKey === 'right' &&
          player.currentSprite !== player.sprites.run.right
        ) {
          player.currentSprite = player.sprites.run.right;
          player.frames = 1;
          player.numFrames = player.sprites.run.numFrames;
        } else if (
          keys.left.pressed && lastKey === 'left' &&
          player.currentSprite !== player.sprites.run.left
        ) {
          player.currentSprite = player.sprites.run.left;
          player.frames = 1;
          player.numFrames = player.sprites.run.numFrames;
        } else if (
          !keys.right.pressed && lastKey === 'right' &&
          player.currentSprite !== player.sprites.idle.right
        ) {
          player.currentSprite = player.sprites.idle.right;
          player.frames = 1;
          player.numFrames = player.sprites.idle.numFrames;
        } else if (
          !keys.left.pressed && lastKey === 'left' &&
          player.currentSprite !== player.sprites.idle.left
        ) {
          player.currentSprite = player.sprites.idle.left;
          player.frames = 1;
          player.numFrames = player.sprites.idle.numFrames;
        }
      }

      animate();

      addEventListener('keydown', function(e){
        switch(e.key){
          case 'w':
            player.velocity.y -= 20;
            if (lastKey === 'right') {
              player.currentSprite = player.sprites.jump.right
            } else {
              player.currentSprite = player.sprites.jump.left
            }
            player.numFrames = player.sprites.jump.numFrames;
            break;
          case 'a':
            keys.left.pressed = true;
            lastKey = 'left';
            break;
          case 's':
            // player.velocity.y += 25;
            break;
          case 'd':
            keys.right.pressed = true;
            lastKey = 'right';
            break;
        }
      });

      addEventListener('keyup', function(e){
        switch(e.key){
          case 'w':
            break;
          case 'a':
            keys.left.pressed = false;
            break;
          case 's':
            // player.position.y += 25;
            break;
          case 'd':
            keys.right.pressed = false;
            break;
        }
      });
    
    }
  } , [canvasRef]);
  


  return (
    <div className={styles.gameBox}>
    <canvas id="game" width="1920"  height="961" ref={canvasRef}></canvas>
    </div>
  )
}

export default Index