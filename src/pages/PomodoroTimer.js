// PomodoroTimer.js
import React, { useState, useEffect } from "react";
import "./PomodoroTimer.css";

const PomodoroTimer = () => {
  const [countdown, setCountdown] = useState(0);
  const [sessionLength, setSessionLength] = useState(30);
  const [remainingTime, setRemainingTime] = useState(sessionLength * 60);
  const [countType, setCountType] = useState(undefined);
  const [breakLength, setBreakLength] = useState(5);

  // useEffect for starting and resetting the timer
  useEffect(() => {
    if (countType === undefined) {
      setRemainingTime(sessionLength * 60);
    }
  }, [countType, sessionLength]);

 // useEffect for counting down the seconds
useEffect(() => {
    if (countType !== undefined) {
      const interval = setInterval(() => {
        setRemainingTime((prevRemainingTime) => {
          if (prevRemainingTime <= 0) {
            if (countType === "session") {
              startBreak();
            } else {
              startSession();
            }
            return 0;
          }
          return prevRemainingTime - 1;
        });
      }, 1000);
  
      // Cleanup the interval on component unmount or when countType changes
      return () => clearInterval(interval);
    }
  }, [countType]);
  

  const startBreak = () => {
    setCountType("break");
    setCountdown(breakLength * 60);
  };

  const startSession = () => {
    setCountType("session");
    setCountdown(sessionLength * 60);
  };

  const pause = () => {
    setCountType(undefined);
    // setRemainingTime(remainingTime);
  };

  const reset = () => {
    setCountType(undefined);
    setRemainingTime(sessionLength * 60);
  };

  return (
    <div className="pomodoro-timer">
      <div id="clock">
        <div id="timer">
          <div id="title">Ready?</div>
          <div id="countdown">
            <span id="minutes">{Math.floor(remainingTime / 60)}</span>
            <span id="seconds">
              {(remainingTime % 60).toString().padStart(2, "0")}
            </span>
          </div>
          <div id="controls">
            <div id="start" onClick={startSession}>
              Start
            </div>
            <div id="pause" onClick={pause}>
              Pause
            </div>
            <div id="reset" onClick={reset}>
              Reset
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
