import { useEffect, useRef, useState } from "react";
import Game from "./Game";
import SpriteSheets from "./data/SpriteSheets";
import SpriteSheetManager from "./SpriteSheetManager";
import SpriteSheet from "./SpriteSheet";
import DialogueBox from "../components/DialogueBox/dialogueBox";

import Render from "./Render";

import { useSpeechSynthesis } from 'react-speech-kit'
import { SpeechSynthesisVoice } from 'react-speech-kit'

import Router from 'next/router'

function App() {
  const [value, setvalue] = useState('')
  const { speak ,voices } = useSpeechSynthesis();


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
  const [displayOutcome, setDisplayOutcome] = useState(false);
  const [resultValue, setResultValue] = useState(null);
  const [displayDialogues, setDisplayDialogues] = useState(false);
  const [displayQuestionPopup, setDisplayQuestionPopup] = useState(false);
  const [dialogue, setDialogue] = useState(0);
  
  const max = 3;

  const i = 0;

  // const render = new Render();
  // const groundBottomLeft = new Image();
  // groundBottomLeft.src = "/tiles/ground_bottom_left.png";
  // render.drawImage(groundBottomLeft, 0, 0);

  // if (displayQuestion) {
    useEffect(() => {
   
      if (displayQuestion) {
        setDisplayDialogues(true);
        setDialogue(i);
        
        speak({ text: dialogues[0].text, voice: voices[2]})
        setTimeout(() => {  
          setDialogue(i+1);
          speak({ text: dialogues[1].text, voice: voices[1] })
          }, 6000); 
        
        setTimeout(() => {
          setDialogue(i+2);
          speak({ text: dialogues[2].text, voice: voices[2] })

          }, 12000);

        setTimeout(() => {
          setDisplayDialogues(false);
          setDisplayQuestionPopup(true);
          }, 20000);
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
              <button onClick={() => {setDisplayOutcome(true); setResultValue("false") }} className="option">A. println()</button>
              <button onClick={() => {setDisplayOutcome(true); setResultValue("false") }} className="option">B. Print()</button>
              <button onClick={() => {setDisplayOutcome(true); setResultValue("true") }} className="option">C. print()</button>
            </div> 
          </div>
        <div className='controls'>
          <kbd>W</kbd>
          <kbd>A</kbd>
          <kbd>S</kbd>
          <kbd>D</kbd>
        </div>

      {displayOutcome && (<Outcome result={resultValue} />)}
    </div>
  );
}

const Outcome = (props) => {
  const  color = props.result === "true" ? "#00cafe" : "#ca00fe";
  return (
    <div class="outcome-box flex flex-col ">
      <h1 className="heading">{props.result === "true" ? "SUCCESS!" : "You made a mistake :["}</h1>
      <p className="px-10">
        Congratulations on successfully completing this lesson! Feel free to stay back or move on to the next one.
      </p>
      <p className="sub-heading">Through this level you learnt:</p>
      <ul>
        <li>Input Statements</li>
        <li>Output Statements</li>
      </ul>
      <button class="proceedBtn" style={{backgroundColor: color}} onClick={() => {props.result === "true" ? Router.replace('/Curriculumpage') : Router.reload(window.location.pathname)}}>{props.result === "true" ? "Move onto next lesson" : "Retry"}</button>
    </div>
  )
}

export default App;
