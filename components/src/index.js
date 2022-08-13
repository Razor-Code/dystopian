import React, {useEffect, useRef} from 'react';


const Index = () => {
  const canvasRef = useRef();
  useEffect(() => {
    if(canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 1920, 961);
      const bg = new Image();
      bg.src = "./img/cybercity.png";
      const playerimg = new Image();
      playerimg.src = "./img/Idle/Idle1.png";


      class sprite {
        constructor(position,velocity, image) {
          this.bg = new Image();
          this.bg.src = "./img/cybercity.png";
          this.position = position;
        }
        draw(){
          ctx.drawImage(this.bg , this.position.position , -320, 4990, 1605);
        }
      }


  

      const background = new sprite({
        position: 5,
        image: bg
      });
      
      const keys = {
        w: {
          pressed: false
        },
        a: {
          pressed: false
        },
        s: {
          pressed: false
        },
        d: {
          pressed: false
        }
      }
    
        //set image height fit to the height of the canvas
        function animate(){
        window.requestAnimationFrame(animate);
        background.draw();
        ctx.drawImage(playerimg, 20, 480, 200, 200);   
        
        
        if (keys.d.pressed){
          background.position.position = background.position.position - 5;
        }

        if (keys.a.pressed) {
          if(background.position.position < 0){
             background.position.position = background.position.position + 5;
          }
          else{
            background.position.position = 0;
          }
        }
        }
        animate();

        window.addEventListener('keydown', function(e){
          switch(e.key){
            case 'w':
              keys.w.pressed = true;
              break;
            case 'a':
              keys.a.pressed = true;
              break;
            case 's':
              keys.s.pressed = true;
              break;
            case 'd':
              keys.d.pressed = true;
              break;
          }
        });

        window.addEventListener('keyup', function(e){
          switch(e.key){
            case 'w':
              keys.w.pressed = false;
              break;
            case 'a':
              keys.a.pressed = false;
              break;
            case 's':
              keys.s.pressed = false;
              break;
            case 'd':
              keys.d.pressed = false;
              break;
          }
        });
    
      }
  }, [canvasRef]);


  return (
    <div>
    <canvas id="game" width="1920"  height="961" ref={canvasRef}></canvas>
    </div>
  )
}

export default Index