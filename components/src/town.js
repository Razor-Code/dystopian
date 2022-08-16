import { updateCurrentUser } from 'firebase/auth';
import React from 'react';
import { useRef, useEffect } from 'react';
import styles from './town.module.css'


const town = () => {

    const canvasRef = useRef();
    useEffect(() => {

    if(canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        const platform1 = new Image();
        platform1.src = "./img/townStand.png";
        const playerimg = new Image();
        playerimg.src = "./img/Idle/Idle1.png";
        const BG = new Image();
        BG.src = "./townBG.png";

        const gravity = 0.5;

        class Player {
            constructor(){
                this.position = {
                    x: 100,
                    y: 0
                }

                this.velocity = {
                    x: 0,
                    y: 1
                }
                this.playerimg = new Image();
                this.playerimg.src = "./img/Idle/Idle1.png";
                this.width = 30;
                this.height = 30;
            }

            draw(){
                ctx.drawImage(this.playerimg, this.position.x, this.position.y, 200,200)
            }
        

        update(){
            this.draw()
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            
            if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity;
        }else{
            this.velocity.y = 0;
        }
        }
    }

    
    class Platform{
        constructor({x ,y, image }){
            this.position = {
                x,
                y
            }
            this.image = image;
            
            this.width = image.width;
            this.height = 20;
        }

        draw(){
            ctx.drawImage(this.image, this.position.x, this.position.y )
        }
    }

    class GenericObjects{
        constructor({x ,y, image }){
            this.position = {
                x,
                y
            }
            this.image = image;
            
            this.width = image.width;
            this.height = 0;
        }

        draw(){
            ctx.drawImage(this.image, this.position.x, this.position.y, 9000, 1235)
        }
    }

        platform1 = new Image();
        platform1.src = "./townFloor.png";

        BG = new Image();
        BG.src = "./townBG.png";
        

        const player = new Player();
        const platforms = [ new Platform({x: 0, y: 870, image: platform1 }) , new Platform({x: 1600, y: 870, image: platform1}), new Platform({x: 2400, y: 870, image: platform1}), new Platform({x: 4000, y: 870, image: platform1}),new Platform({x: 5500, y: 870, image: platform1}), new Platform({x: 7000, y: 870, image: platform1}), new Platform({x: 7400, y: 870, image: platform1}) ];
        const genericObject = [ new GenericObjects({x: 0, y: -250, image: BG}) ]
        
        const keys = {
            right: {
                pressed: false
            },
            left: {
                pressed: false
            },
            up: {
                pressed: false
            },
            down: { 
                pressed: false
            }
        }

        function animate(){
            window.requestAnimationFrame(animate);
            ctx.fillStyle = "white"
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            
            genericObject.forEach(genericObject => {
                genericObject.draw();
            })
            platforms.forEach(platform => {
                platform.draw();
            })
            player.update();
            

            
           
            if(keys.right.pressed && player.position.x < 400){
                player.velocity.x = 5;
            }
            else if(keys.left.pressed && player.position.x > 100 ){
                player.velocity.x = -5;
            }
            else{
                player.velocity.x = 0;

                if(keys.right.pressed){
                    platforms.forEach((platform) => {
                        platform.position.x -= 5;
                    })
                    genericObject.forEach((genericObject) => {
                        genericObject.position.x -= 5;
                    })
                }
                else if(keys.left.pressed){
                   
                      platforms.forEach((platform) => {
                        platform.position.x += 5;
                      });

                      genericObject.forEach((genericObject) => {
                        genericObject.position.x += 5;
                    })
                    
                }
        }
            

        platforms.forEach((platform) => { 
            if(player.position.y + player.height <= platform.position.y 
            && player.position.y + 155 + player.height + player.velocity.y >= platform.position.y 
            && player.position.x + player.width >= platform.position.x 
            && player.position.x <= platform.position.x + platform.width){
                player.velocity.y = 0 ;
                
            }
        })
        }
        animate();

        addEventListener('keydown', (event) => {
            switch(event.key){
                case 'a':
                    keys.left.pressed = true;
                    break;
                case 's':
                    player.velocity.x = -10;
                    break;
                case 'd':
                   keys.right.pressed = true;
                    break;
                case 'w':
                    player.velocity.y -= 10;
                    break;
            }
        })

        addEventListener('keyup', (event) => {
            switch(event.key){
                case 'a':
                    keys.left.pressed = false
                    break;
                case 's':
                    player.velocity.x = -10;
                    break;
                case 'd':
                   keys.right.pressed = false
                    break;
                case 'w':
                    player.velocity.y -= 10;
                    break;
            }
        
        })
    }
    }, [canvasRef]);



    return (
        <div className={styles.body}>
        <canvas id="game" className={styles.town} ref={canvasRef}></canvas>
        </div>
      )
}

export default town;
