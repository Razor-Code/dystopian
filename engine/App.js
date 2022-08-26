import { useEffect, useRef, useState } from "react";
import Game from "./Game";
import SpriteSheets from "./data/SpriteSheets";
import SpriteSheetManager from "./SpriteSheetManager";
import SpriteSheet from "./SpriteSheet";
import DialogueBox from "../components/DialogueBox/dialogueBox";


function App() {
  const dialogues = {
    0: {
      name: "Alita",
      speaker: "/speaker/alita.jpeg",
      text: "I see so you're the one creating the glitches in this lab!!"
    },
    1: {
      name: "Xenobug",
      speaker: "/speaker/unknown.jpg",
      text: "Affirmative! I have destroyed your entire lab and now I will destroy you!"
    },
    2: {
      name: "Alita",
      speaker: "/speaker/alita.jpeg",
      text: "I won't let you do that to my planet! I know how to correct your corruption. You are a simple print bug after all!"
    }
  }


  var canvasRef = useRef();
  var gameRef = useRef();


  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [displayOutcome, setDisplayOutcome] = useState(true);
  const [resultValue, setResultValue] = useState(null);
  const [displayDialogues, setDisplayDialogues] = useState(false);
  const [displayQuestionPopup, setDisplayQuestionPopup] = useState(false);
  const [dialogue, setDialogue] = useState(0);
  
  const max = 3;

  const i = 0;

  // if (displayQuestion) {
    useEffect(() => {
   
      if (displayQuestion) {
        setDisplayDialogues(true);
        setDialogue(i);
        setTimeout(() => {  
          setDialogue(i+1);
          }, 3000); 
        
        setTimeout(() => {
          setDialogue(i+2);
          }, 6000);

        setTimeout(() => {
          setDisplayDialogues(false);
          setDisplayQuestionPopup(true);
          }, 9000);
      }
      
    }, [displayQuestion])
  
  // }
  
  

  useEffect(() => {
    var ssm = new SpriteSheetManager();

    Object.keys(SpriteSheets).forEach((spriteSheetName) => {
      var data = SpriteSheets[spriteSheetName];
      ssm.addSpriteSheet(spriteSheetName, data.imgPath, data);
    });

    /**
     * @type {HTMLCanvasElement}
     */
    var canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    /**
     * @type {CanvasRenderingContext2D}
     */
    var ctx = canvas.getContext("2d");

    var last = performance.now();

    var game = new Game(canvas, ctx, ssm, setDisplayQuestion);
    gameRef.current = game;

    window.game = game;

    var cb = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      game.camera.updateAspectRatio();
    };
    cb();
    var active = true;
    game.active = true;

    function update() {
      var now = performance.now();
      var delta = (now - last) / 1000;
      last = now;

      if (delta > 0.25) {
        delta = 0.25;
      }
      
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (game.active && game.player.health > 0) {
        game.updateGame(delta);
      } else if(game.player.health <= 0) {
        // Game Restart when Player health drops to 0
        // NOT WORKING
        game.restart();
      }

      game.renderGame(delta);

      active && requestAnimationFrame(update);
    }

    ssm.onLoaded = () => {
      Object.keys(ssm.spriteSheets).forEach((key) => {
        if (key.includes("player_")) {
          ssm.spriteSheets[key].getEffects(["flipHorizontally"]);
        }
      });

      update();

      setTimeout(() => {
        game.start();
      }, 100);
    };

    window.addEventListener("resize", cb);

    return () => {
      cancelAnimationFrame(update);
      window.removeEventListener("resize", cb);

      active = false;

      game.end();
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-wrap md:flex-row">    
        <canvas ref={canvasRef} />
          {displayDialogues && <DialogueBox image={dialogues[dialogue].speaker} text={dialogues[dialogue].text} name={dialogues[dialogue].name} />}
          <div className={displayQuestionPopup ? "popup-question" : "hide-question"}>
            <p className="question-heading">SOLVE TO UNDO CORRUPTION: </p>
            <p className="question-description">What is the function used to print a statement in Python?</p>
            <div className="question-options">
              <button className="option">A. println()</button>
              <button className="option">B. Print()</button>
              <button className="option">C. print()</button>
            </div> 
          </div>
        <div className='controls'>
          <kbd>W</kbd>
          <kbd>A</kbd>
          <kbd>S</kbd>
          <kbd>D</kbd>
        </div>

        <Outcome result={resultValue} />

    </div>
  );
}

const Outcome = (props) => {
  const  color = props.result === "true" ? "#00cafe" : "#ca00fe";
  return (
    <div class="outcome-box">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4">{props.result === "true" ? "SUCCESS!" : "You made a mistake :["}</h1>
      <p className="px-5 text-center">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep.</p>
      <button class="proceedBtn" style={{backgroundColor: color}}>{props.result === "true" ? "Move onto next lesson" : "Retry"}</button>
    </div>
  )
}

export default App;
