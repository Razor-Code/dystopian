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
      <App />
    </>
  )
}