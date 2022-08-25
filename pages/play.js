import { React, useState, useEffect } from "react";
import App from '../engine/App';

export default function() {
  const [displayPopup, setDisplayPopup] = useState(true);
  const [displayHint, setDisplayHint] = useState(true);

  useEffect(() => {
    if (displayPopup) {
      setTimeout(() => {
        setDisplayPopup(false);
      }, 3000);
    }
    
    if (displayHint) {
      setTimeout(() => {
        setDisplayHint(false);
      }, 10000);
    }
  }, [])

  return (
    <>
      {displayPopup && (
        <div className="popup">
          <span className="popup-heading">OBJECTIVE:</span>
          <span className="popup-description">Find and eliminate the Xenobug</span>
          {/* <span className="popup-hint">Hint: Xenobugs are often located at the highest level of the hive structure</span> */}
        </div>
      )}

      {displayHint && (
        <div className="popup-hint">
          <span className="hint-heading">HINT:</span>
          <span className="hint-description">Avoid getting hit by red critters to save your HP</span>
          {/* <span className="popup-hint">Hint: Xenobugs are often located at the highest level of the hive structure</span> */}
        </div>
      )}

      <div className="panels">
        <div className="popup-question">
          <p className="question-heading">QUESTION: </p>
          <p className="question-description">What is the function used to print a statement in Python?</p>
          <div className="question-options">
            <button className="option">A. println()</button>
            <button className="option">B. Print()</button>
            <button className="option">C. print()</button>
          </div> 
        </div>
        <App />
      </div>
    </>
  )
}