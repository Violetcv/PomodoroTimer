// PomodoroTimer.js
import React, { useState, useEffect } from "react";
import "./PomodoroTimer.css";

const PomodoroTimer = () => {
  // State variables
  const [sessionLength, setSessionLength] = useState(30);
  const [breakLength, setBreakLength] = useState(5);
  const [countdown, setCountdown] = useState(0);
  const [remainingTime, setRemainingTime] = useState(sessionLength * 60);
  const [countType, setCountType] = useState(undefined);

  // Effect for starting or resetting the timer
  useEffect(() => {
    if (countType === undefined) {
      setRemainingTime(sessionLength * 60);
    }
  }, [countType, sessionLength]);

  // Effect for updating the countdown
  useEffect(() => {
    let interval;
    if (countType !== undefined) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            if (countType === "session") {
              startBreak();
            } else {
              startSession();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countType]);

  // Function to start a session
  const startSession = () => {
    setCountType("session");
    setCountdown(sessionLength * 60);
  };

  // Function to start a break
  const startBreak = () => {
    setCountType("break");
    setCountdown(breakLength * 60);
  };

  // Function to pause the timer
  const pause = () => {
    setCountType(undefined);
    setRemainingTime(remainingTime);
  };

  // Function to reset the timer
  const reset = () => {
    setCountType(undefined);
    setRemainingTime(sessionLength * 60);
  };

  // Function to update session length
  const updateSession = (num) => {
    setSessionLength(num);
    reset();
  };

  // Function to update break length
  const updateBreak = (num) => {
    setBreakLength(num);
    reset();
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
          <div
            id="controls"
            className={
              countType === undefined ? "reset" : countType.toLowerCase()
            }
          >
            <div id="start" onClick={startSession}>
              <i className="fas fa-play"></i> Start
            </div>
            <div id="pause" onClick={pause}>
              <i className="fas fa-pause"></i> Pause
            </div>
            <div id="reset" onClick={reset}>
              <i className="fas fa-sync-alt"></i> Reset
            </div>
          </div>
        </div>
      </div>
      {/* <div id="options">
        <div id="session">
          <i
            id="incrSession"
            className="fas fa-angle-double-up"
            onClick={incrSession}
          ></i>
          <span className="option-title">Session</span>
          <input
            id="sessionInput"
            type="number"
            value={sessionLength}
            max="60"
            min="5"
            onChange={(e) => updateSession(e.target.value)}
          />
          <i
            id="decrSession"
            className="fas fa-angle-double-down"
            onClick={decrSession}
          ></i>
        </div>
        <div id="break">
          <i
            id="incrBreak"
            className="fas fa-angle-double-up"
            onClick={incrBreak}
          ></i>
          <span className="option-title">Break</span>
          <input
            id="breakInput"
            type="number"
            value={breakLength}
            max="10"
            min="1"
            onChange={(e) => updateBreak(e.target.value)}
          />
          <i
            id="decrBreak"
            className="fas fa-angle-double-down"
            onClick={decrBreak}
          ></i>
        </div>
      </div> */}
    </div>
  );
};

export default PomodoroTimer;
