import React, { useState, useEffect } from "react";
import * as execute from './execute';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import LoadingIndicator from './LoadingIndicator';

const Play = () => {
  const connectedWallet = useConnectedWallet();
  // Configure this as you want, I like shorter games
  const playTime = 30;

  const [time, setTime] = useState(playTime);
  const [gameOver, setGameOver] = useState(false);
  // We use this to track where the target is on the screen
  const [targetPosition, setTargetPosition] = useState({ top: "15%", left: "50%" });
  const [target2Position, setTarget2Position] = useState({ top: "45%", left: "20%" });
  const [target3Position, setTarget3Position] = useState({ top: "60%", left: "47%" });
 
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  
  
  // Every second we're going to lower the value of time.
  useEffect(() => {
    const unsubscribe = setInterval(() => {
      setTime(time => time > 0 ? time - 1 : 0);
    }, 1000);
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    if (time === 0) {
      setTargetPosition({ display: 'none' });
      setTarget3Position({ display: 'none' });
      // Show alert to let user know it's game over
      alert(`Game Over! Your score is ${score}. Please confirm transaction to submit score.`);
      submitScore();
    }
  }, [time]);

  const submitScore = async () => {
    if (connectedWallet && connectedWallet.network.name === 'testnet') {
      setLoading(true);
      const tx = await execute.setScore(connectedWallet, score);
      console.log(tx);
      // Once the transaction is confirmed, we let the user know and navigate to the leaderboard
      alert('Score submitted!');
      setLoading(false);
      window.location.href = '/leaderboard';
    }
  };

  const handleClick = () => {
    // OGs will know this :)
    let audio = new Audio("/Zergling_explodes.mp3");
    
    // Don't let it get too loud!
    audio.volume = 0.2;
    audio.play();

    setScore(score => score + 1);
    
    // Play around with this to control bounds!
    setTargetPosition({
      top: `${Math.floor(Math.random() * 80)}%`,
      left: `${Math.floor(Math.random() * 80)}%`
    });

    setTarget2Position({
      top: `${Math.floor(Math.random() * 50)}%`,
      left: `${Math.floor(Math.random() * 30)}%`
    });

    setTarget3Position({
      top: `${Math.floor(Math.random() * 25)}%`,
      left: `${Math.floor(Math.random() * 63)}%`,
    });
  };

  return (
    <div className="score-board-container">
      <div className="play-container">
        <span>Score: {score}</span>
        <span>Munch!</span>
        <span>Time left: {time} s</span>
      </div>

      {/* Render loading or game container */}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="game-container">
          {/* CHANGE THIS IMAGE! It's loaded from the public folder. */}
          <img src={"apple.png"} id="target" alt="Apple" style={{ ...targetPosition }} onClick={handleClick} />
          <img src={"berry.png"} id="target2" alt="Berry" style={{ ...target2Position }} onClick={handleClick} />

          <img src="hedgehog.png" id="marine-img" alt="Marine" />
          <img src={"fox.png"} id="nottarget" alt="Fox" style={{ ...target3Position }} />
        </div>
      )}
    </div>
  );
};

export default Play;