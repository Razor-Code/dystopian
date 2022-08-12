import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {
  createImage,
  createImageAsync,
  isOnTopOfPlatform,
  collisionTop,
  isOnTopOfPlatformCircle,
  hitBottomOfPlatform,
  hitSideOfPlatform,
  objectsTouch
} from './utils.js';


import platform from '../../graphics/img/platform.png';
import cybercity from '../../graphics/img/cybercity.png';
import background from '../../graphics/img/cybercity.png';
import lgPlatform from '../../graphics/img/lgPlatform.png';
import tPlatform from '../../graphics/img/tPlatform.png';

import spriteRunLeft from '../../graphics/img/spriteRunLeft.png';
import spriteRunRight from '../../graphics/img/spriteRunRight.png';
import spriteStandLeft from '../../graphics/img/spriteStandLeft.png';
import spriteStandRight from '../../graphics/img/spriteStandRight.png';

import spriteJumpRight from '../../graphics/img/spriteJumpRight.png';
import spriteJumpLeft from '../../graphics/img/spriteJumpLeft.png';


const Index = () => {
  const canvasRef = useRef();

  useEffect(() => {
    if(canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      
      let gravity = 1.5;

      const bg = new Image();
      bg.src = "./img/cybercity.png";

      // const playerimg = new Image();
      // playerimg.src = "./img/Idle/Idle4.png";
           

      class Player {
        constructor() {
          this.shooting = false
          this.speed = 10
          this.position = {
            x: 100,
            y: 100
          }
          this.velocity = {
            x: 0,
            y: 0
          }

          this.width = 82
          this.height = 82

          this.image = createImage(spriteStandRight)
          this.frames = 0
          this.sprites = {
            stand: {
              right: createImage(spriteStandRight),
              left: createImage(spriteStandLeft),
            },
            run: {
              right: createImage(spriteRunRight),
              left: createImage(spriteRunLeft),
            },
            jump: {
              right: createImage(spriteJumpRight),
              left: createImage(spriteJumpLeft),
            },
            // shoot: {
            //   fireFlower: {
            //     right: createImage(images.mario.shoot.fireFlower.right),
            //     left: createImage(images.mario.shoot.fireFlower.left)
            //   }
            // }
          }

          this.currentSprite = this.sprites.stand.right
          this.currentCropWidth = 82
          this.powerUps = {
            fireFlower: false
          }
          this.invincible = false
          this.opacity = 1
        }

        draw() {
          ctx.save()
          ctx.globalAlpha = this.opacity
          ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
          ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
          ctx.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            82,
            this.position.x,
            this.position.y,
            this.width,
            this.height
          )
          ctx.restore()
        }

        update() {
          this.frames++
          const { currentSprite, sprites } = this

          if (
            this.frames > 4 &&
            (currentSprite === sprites.stand.right ||
              currentSprite === sprites.stand.left)
          )
            this.frames = 0
          else if (
            this.frames > 7 &&
            (currentSprite === sprites.run.right ||
              currentSprite === sprites.run.left)
          )
            this.frames = 0
          else if (
            currentSprite === sprites.jump.right ||
            currentSprite === sprites.jump.left
          )
            this.frames = 0

          this.draw()
          this.position.x += this.velocity.x
          this.position.y += this.velocity.y

          if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity

          if (this.invincible) {
            if (this.opacity === 1) this.opacity = 0
            else this.opacity = 1
          } else this.opacity = 1
        }
      }

      class Platform {
        constructor({ x, y, image, block, text }) {
          this.position = {
            x,
            y
          }
      
          this.velocity = {
            x: 0
          }
      
          this.image = image
          this.width = image.width
          this.height = image.height
          this.block = block
          this.text = text
        }
      
        draw() {
          c.drawImage(this.image, this.position.x, this.position.y)
      
          if (this.text) {
            c.font = '20px Arial'
            c.fillStyle = 'red'
            c.fillText(this.text, this.position.x, this.position.y)
          }
        }
      
        update() {
          this.draw()
          this.position.x += this.velocity.x
        }
      }

      class GenericObject {
        constructor({ x, y, image }) {
          this.position = {
            x,
            y
          }

          this.velocity = {
            x: 0
          }

          this.image = image
          this.width = image.width
          this.height = image.height
        }

        draw() {
          ctx.drawImage(this.image, this.position.x, this.position.y)
        }

        update() {
          this.draw()
          this.position.x += this.velocity.x
        }
      }

      class Particle {
        constructor({
          position,
          velocity,
          color = '#654428',
          fireball = false,
          fades = false
        }) {
          this.position = {
            x: position.x,
            y: position.y
          }

          this.velocity = {
            x: velocity.x,
            y: velocity.y
          }

          this.ttl = 300
          this.color = color
          this.fireball = fireball
          this.opacity = 1
          this.fades = fades
        }

        draw() {
          ctx.save()
          ctx.globalAlpha = this.opacity
          ctx.beginPath()
          ctx.moveTo(this.position.x, this.position.y)
          ctx.fillStyle = this.color
          ctx.fill()
          ctx.closePath()
          ctx.restore()
        }

        update() {
          this.ttl--
          this.draw()
          this.position.x += this.velocity.x
          this.position.y += this.velocity.y
        }
      }
      
      let lgPlatformImage
      let tPlatformImage

      let player = new Player()
      let platforms = []
      let genericObjects = []
      let particles = []

      let lastKey
      let keys = {right: { pressed: false }, left: { pressed: false }}

      let scrollOffset
      let game = {disableUserInput: false}
      let currentLevel = 1

      function selectLevel(currentLevel) {
        if (!audio.musicLevel1.playing()) audio.musicLevel1.play()
        switch (currentLevel) {
          case 1:
            init()
            break
          case 2:
            initLevel2()
            break
        }
      }

      async function init() {
        player = new Player()
        keys = {
          right: {
            pressed: false
          },
          left: {
            pressed: false
          }
        }
        scrollOffset = 0

        game = {
          disableUserInput: false
        }

        platformImage = await createImageAsync(platform)
        platformSmallTallImage = await createImageAsync(platformSmallTall)
        lgPlatformImage = await createImageAsync(lgPlatform)
        tPlatformImage = await createImageAsync(tPlatform)
        
        player = new Player()

        particles = []

        platforms = [
          new Platform({
            x: 1991 + lgPlatformImage.width - tPlatformImage.width,
            y: canvas.height - lgPlatformImage.height - tPlatformImage.height,
            image: tPlatformImage,
            block: false
          }),
          new Platform({
            x: 6968 + 300,
            y: canvas.height - lgPlatformImage.height,
            image: lgPlatformImage,
            block: true,
            text: 6968 + 300
          })
        ]

        genericObjects = [
          new GenericObject({
            x: -1,
            y: -1,
            image: createImage(background)
          }),
          new GenericObject({
            x: -1,
            y: -1,
            image: createImage(cybercity)
          })
        ]

        scrollOffset = 0

        const platformsMap = [
          'lg',
          'lg',
          'gap',
          'lg',
          'gap',
          'gap',
          'lg',
          'gap',
          't',
          'gap',
          'lg',
        ]

        let platformDistance = 0

        platformsMap.forEach((symbol) => {
          switch (symbol) {
            case 'lg':
              platforms.push(
                new Platform({
                  x: platformDistance,
                  y: canvas.height - lgPlatformImage.height,
                  image: lgPlatformImage,
                  block: true,
                  text: platformDistance
                })
              )

              platformDistance += lgPlatformImage.width - 2

              break

            case 'gap':
              platformDistance += 175

              break

            case 't':
              platforms.push(
                new Platform({
                  x: platformDistance,
                  y: canvas.height - tPlatformImage.height,
                  image: tPlatformImage,
                  block: true
                })
              )

              platformDistance += tPlatformImage.width - 2

              break

          }
        })
      }

      function animate() {
        requestAnimationFrame(animate)
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        genericObjects.forEach((genericObject) => {
          genericObject.update()
          genericObject.velocity.x = 0
        })

        // particles.forEach((particle, i) => {
        //   particle.update()

        //   if (
        //     particle.fireball &&
        //     (particle.position.x >= canvas.width ||
        //       particle.position.x <= 0)
        //   )
        //     setTimeout(() => {
        //       particles.splice(i, 1)
        //     }, 0)
        // })

        //   // mario touches flagpole
        //   // win condition
        //   // complete level
        //   if (
        //     !game.disableUserInput &&
        //     objectsTouch({
        //       object1: player,
        //       object2: flagPole
        //     })
        //   ) {
        //     audio.completeLevel.play()
        //     audio.musicLevel1.stop()
        //     game.disableUserInput = true
        //     player.velocity.x = 0
        //     player.velocity.y = 0
        //     gravity = 0

        //     player.currentSprite = player.sprites.stand.right

        //     if (player.powerUps.fireFlower)
        //       player.currentSprite = player.sprites.stand.fireFlower.right

        //     // flagpole slide
        //     setTimeout(() => {
        //       audio.descend.play()
        //     }, 200)
            gsap.to(player.position, {
              y: canvas.height - lgPlatformImage.height - player.height,
              duration: 1,
              onComplete() {
                player.currentSprite = player.sprites.run.right

                if (player.powerUps.fireFlower)
                  player.currentSprite = player.sprites.run.fireFlower.right
              }
            })

            gsap.to(player.position, {
              delay: 1,
              x: canvas.width,
              duration: 2,
              ease: 'power1.in'
            })


        //     // switch to the next level
        //     setTimeout(() => {
        //       currentLevel++
        //       gravity = 1.5
        //       selectLevel(currentLevel)
        //     }, 8000)
        //   }
        }

        player.update()

        if (game.disableUserInput) return

        // scrolling code starts
        let hitSide = false
        if (keys.right.pressed && player.position.x < 400) {
          player.velocity.x = player.speed
        } else if (
          (keys.left.pressed && player.position.x > 100) ||
          (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
        ) {
          player.velocity.x = -player.speed
        } else {
          player.velocity.x = 0

          // scrolling code
          if (keys.right.pressed) {
            for (let i = 0; i < platforms.length; i++) {
              const platform = platforms[i]
              platform.velocity.x = -player.speed

              if (
                platform.block &&
                hitSideOfPlatform({
                  object: player,
                  platform
                })
              ) {
                platforms.forEach((platform) => {
                  platform.velocity.x = 0
                })

                hitSide = true
                break
              }
            }

            if (!hitSide) {
              scrollOffset += player.speed

              flagPole.velocity.x = -player.speed

              genericObjects.forEach((genericObject) => {
                genericObject.velocity.x = -player.speed * 0.66
              })
            }
          } else if (keys.left.pressed && scrollOffset > 0) {
            for (let i = 0; i < platforms.length; i++) {
              const platform = platforms[i]
              platform.velocity.x = player.speed

              if (
                platform.block &&
                hitSideOfPlatform({
                  object: player,
                  platform
                })
              ) {
                platforms.forEach((platform) => {
                  platform.velocity.x = 0
                })

                hitSide = true
                break
              }
            }

            if (!hitSide) {
              scrollOffset -= player.speed


              genericObjects.forEach((genericObject) => {
                genericObject.velocity.x = player.speed * 0.66
              })
            }
          }
        }

        // platform collision detection
        platforms.forEach((platform) => {
          if (
            isOnTopOfPlatform({
              object: player,
              platform
            })
          ) {
            player.velocity.y = 0
          }

          if (
            platform.block &&
            hitBottomOfPlatform({
              object: player,
              platform
            })
          ) {
            player.velocity.y = -player.velocity.y
          }

          if (
            platform.block &&
            hitSideOfPlatform({
              object: player,
              platform
            })
          ) {
            player.velocity.x = 0
          }

        })

        // lose condition
        if (player.position.y > canvas.height) {
          audio.die.play()
          selectLevel(currentLevel)
        }

        // sprite jump
        if (player.velocity.y !== 0) return

        if (
          keys.right.pressed &&
          lastKey === 'right' &&
          player.currentSprite !== player.sprites.run.right
        ) {
          player.currentSprite = player.sprites.run.right
        } else if (
          keys.left.pressed &&
          lastKey === 'left' &&
          player.currentSprite !== player.sprites.run.left
        ) {
          player.currentSprite = player.sprites.run.left
        } else if (
          !keys.left.pressed &&
          lastKey === 'left' &&
          player.currentSprite !== player.sprites.stand.left
        ) {
          player.currentSprite = player.sprites.stand.left
        } else if (
          !keys.right.pressed &&
          lastKey === 'right' &&
          player.currentSprite !== player.sprites.stand.right
        ) {
          player.currentSprite = player.sprites.stand.right
        }


        if (
          keys.right.pressed &&
          lastKey === 'right' &&
          player.currentSprite !== player.sprites.run.fireFlower.right
        ) {
          player.currentSprite = player.sprites.run.fireFlower.right
        } else if (
          keys.left.pressed &&
          lastKey === 'left' &&
          player.currentSprite !== player.sprites.run.fireFlower.left
        ) {
          player.currentSprite = player.sprites.run.fireFlower.left
        } else if (
          !keys.left.pressed &&
          lastKey === 'left' &&
          player.currentSprite !== player.sprites.stand.fireFlower.left
        ) {
          player.currentSprite = player.sprites.stand.fireFlower.left
        } else if (
          !keys.right.pressed &&
          lastKey === 'right' &&
          player.currentSprite !== player.sprites.stand.fireFlower.right
        ) {
          player.currentSprite = player.sprites.stand.fireFlower.right
        }
      } // animation loop ends

      selectLevel(1)
      // init()
      // initLevel2()
      animate()


      // class sprite {
      //   constructor(position, velocity, image) {
      //     this.bg = new Image();
      //     this.bg.src = "./img/cybercity.png";
      //     this.position = position;
      //   }
      //   draw(){
      //     console.log(this.position.x);
      //     ctx.drawImage(this.bg , 0 , -320, 4990, 1605);
      //   }
      // }

  

      // const background = new sprite({
      //   position: {
      //     x: 0, 
      //     y: -320
      //   },
      //   image: bg
      // });
      
      // const keys = {
      //   w: {
      //     pressed: false
      //   },
      //   a: {
      //     pressed: false
      //   },
      //   s: {
      //     pressed: false
      //   },
      //   d: {
      //     pressed: false
      //   }
      // }
    
        //set image height fit to the height of the canvas
        // function animate(){
        // window.requestAnimationFrame(animate);
        // background.draw();
        // ctx.drawImage(playerimg, 20, 480, 200, 200);   
        
        
        // if (keys.d.pressed){
        //   background.position.x = background.position.x - 1;
        // }
        // }
        // animate();

        window.addEventListener('keydown', function(e){
          switch(e.key){
            case 'w':
              player.velocity.y -= 25

              audio.jump.play()

              if (lastKey === 'right') player.currentSprite = player.sprites.jump.right
              else player.currentSprite = player.sprites.jump.left

              if (!player.powerUps.fireFlower) break

              if (lastKey === 'right')
                player.currentSprite = player.sprites.jump.fireFlower.right
              else player.currentSprite = player.sprites.jump.fireFlower.left

              break;
            case 'a':
              keys.left.pressed = true
              lastKey = 'left';
              break;
            case 's':
              break;
            case 'd':
              keys.right.pressed = true
              lastKey = 'right'
              break;
          }
        });

        window.addEventListener('keyup', function(e){
          switch(e.key){
            case 'w':
              break;
            case 'a':
              keys.left.pressed = false;
              break;
            case 's':
              break;
            case 'd':
              keys.right.pressed = false;
              break;
          }
        });
    
  }, [canvasRef]);

  return (
    <div className='game'>
      <canvas id="game" width="1920"  height="961" ref={canvasRef}></canvas>
    </div>
  )
}

export default Index