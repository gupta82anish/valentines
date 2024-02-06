"use client";
import React, { useEffect, useState, useRef } from "react";
import HeartsContainer from "./Hearts";
import { useReward } from "react-rewards";


const phrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Pretty Please 👉👈",
  "No dont'do this to mee",
  "You're breaking my heart 💔",
];

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yes, setYes] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [hardMode, setHardMode] = useState(false);
  const [seed, setSeed] = useState(100);

  const { reward, isAnimating } = useReward('rewardId', 'emoji', {emoji: ['❤️', '💖', '💕']});


  function calculateNewPosition() {
    const topVal = Math.random() * seed;
    const leftVal = Math.random() * seed;
    // Update style state with new random positions
    setStyle({
      position: "relative",
      top: `calc(${topVal}% - ${topVal}px)`,
      left: `calc(${leftVal}% - ${leftVal}px)`,
      transition: "0.5s ease", // Smooth transition for moving effect
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHardMode(e.target.checked);
  }

  function hardModeOn() {
    if (hardMode) {
      setSeed(200);
      calculateNewPosition();
    }
  }

  function updateNoState() {
    setNoCount(noCount + 1);
    setSeed((oldSeed) => {
      if (noCount > 4) return oldSeed;
      return oldSeed + 25;
    });
  }


  function reset() {
    setStyle({});
    // setYes(false);
  }

  function sheSaidYes() {
    reward();
    setYes(true);
  }

  useEffect(() => {
    setYesButtonSize(20 * noCount + 16);
  }, [noCount]);

  return (
    <div>
      {!yes && (
        <div className="absolute left-3 top-3">
          <div className="flex flex-row justify-center items-center gap-4">
            <label className="switch">
              <input onChange={handleChange} type="checkbox" checked={hardMode} />
              <span className="slider round"></span>
            </label>
            <label className="text-black">Hard Mode</label>
            <div>
              <button className="bg-slate-900 text-white p-2" onClick={() => reset()}>Reset</button>
            </div>
          </div>
        </div>
      )}
      <div className="main-container">
        {!yes ? (
          <>
            <img
              src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
              className="image-1"
            />
            <p>Will you be my valentine?</p>
            <div className="button-container">
              <button
                className="yes-button p-2"
                style={{ fontSize: `${yesButtonSize}px` }}
                onClick={() => sheSaidYes()}
              >
                Yes
              </button>
              <button
                style={style}
                className="no-button p-2"
                onClick={() => updateNoState()}
                onMouseEnter={() => calculateNewPosition()}
                onTransitionEnd={() => hardModeOn()}
                ref={noButtonRef}
              >
                {phrases[noCount % phrases.length]}
              </button>
            </div>
          </>
        ) : (
          <>
          <HeartsContainer />
            <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
            <p>Yayy!</p>
          </>
        )}
        <span id="rewardId" />
      </div>
    </div>
  );
}

export default App;
