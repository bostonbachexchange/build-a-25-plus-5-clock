import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import React, { useState, useEffect } from 'react';
import { faArrowUp, faArrowDown, faPlay, faPause, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const breakSeconds = 300; 
  const sessionSeconds = 1500; 

  const [breakLength, setBreakLength] = useState(breakSeconds);
  const [sessionLength, setSessionLength] = useState(sessionSeconds);
  const [onBreak, setOnBreak] = useState(false);
  const [timerIsRunning, setTimerIsRunning] = useState(false);


  
 function playSoundFile() {
  // const beep = new Audio("http://soundjay.com/buttons/sounds/beep-01a.mp3")
  const beep = document.getElementById('beep')
  beep.currentTime = 0;
  beep.play()
 }

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        if (timerIsRunning && sessionLength > 0) {
          setSessionLength(sessionLength - 1);
        } 
        // if (timerIsRunning && sessionLength === 0) {

          if (timerIsRunning && sessionLength === 0) {
            if (!onBreak) {
              playSoundFile();
              const intervalId = setInterval(() => {
                setOnBreak(true);
              }, 1000);
          
              // Clear the interval after 1000ms
              setTimeout(() => {
                clearInterval(intervalId);
              }, 1000);
            }

          if (breakLength > 0) {
            setBreakLength(breakLength - 1);
          }
        }
        if (breakLength === 0 && sessionLength === 0){
          playSoundFile()
          reset()
        }
      } catch (error) {
        console.error("Error in timer interval:", error);
      }
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, [sessionLength, breakLength, timerIsRunning, onBreak]);
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
  };
  const formatDisplay = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedTime = `${minutes}`;
    return formattedTime;
  };

  function reset() {
    setTimerIsRunning(false);
    setBreakLength(breakSeconds);
    setSessionLength(sessionSeconds);
    setOnBreak(false);
    const audioStop = document.getElementById("beep")
    audioStop.pause()
    audioStop.currentTime = 0
  }

  function startCountdown() {
    setTimerIsRunning(!timerIsRunning);
  }

  function breakTimeSet(upcheck) {
    if(breakLength > 60) {
      !upcheck && setBreakLength(breakLength - 60)
    }
    if(breakLength < 3600) {
      upcheck && setBreakLength(breakLength + 60)
    }
  }

  function sessionTimeSet(upcheck) {
    if(sessionLength > 60) {
      !upcheck && setSessionLength(sessionLength - 60)
    }
    if(sessionLength < 3600) {
      upcheck && setSessionLength(sessionLength + 60)
    }
  }

  return (
    <div id='container' className='p-5'>
      <div className='text-center pt-5 m-4'>
        <h1 className='p-2 mt-5'>25 + 5 Clock</h1>

        <div className='d-inline-flex'>

          <div className='m-3'>

            <h2 id="break-label">Break Length</h2>
            <div className='d-inline-flex'>
              <div id="break-increment" className='p-2'
                onClick={() => breakTimeSet(true)}
              >
                <FontAwesomeIcon icon={faArrowUp} /></div>
              <div id="break-length" className='p-2'>{formatDisplay(breakLength)}</div>
              <div id="break-decrement" className='p-2'
                onClick={() => breakTimeSet(false)}>
              <FontAwesomeIcon icon={faArrowDown} />
              </div>
            </div>
          </div>

          <div className='m-3'> 
            <h2 id="session-label">Session Length</h2>
            <div className='d-inline-flex' >
              <div id="session-increment" className='p-2'
              onClick={() => sessionTimeSet(true)}>
                <FontAwesomeIcon icon={faArrowUp} />              
              </div>

              <div id="session-length" className='p-2'>{formatDisplay(sessionLength)}</div>

              <div id="session-decrement" className='p-2'
              onClick={() => sessionTimeSet(false)}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </div>
            </div>
          </div>

        </div>
          <div className='m-auto border border-5 p-4 w-25 border-dark '>
            <h2 id="timer-label">{!onBreak? `Session` : "Break"}</h2>
            {!onBreak ? 
            <>
              <p id="time-left"> {formatTime(sessionLength)} </p>
            </>
            :
            <>
              <p id="time-left"> {formatTime(breakLength)}</p>
            </>
}
          </div>

        <div >
          <div className='d-inline-flex'>
            <div id="start_stop" className='m-2'
            onClick={startCountdown}>
              {!timerIsRunning && <FontAwesomeIcon icon={faPlay} />}
              {timerIsRunning && <FontAwesomeIcon icon={faPause} /> }
            </div>
            <div id="reset" className='m-2' onClick={reset}> 
            <FontAwesomeIcon icon={faRotateLeft} />
            </div>
          </div>
            {/* <div id="toggle" className='m-2' onClick={() => {setOnBreak(!onBreak)}}> 
            <FontAwesomeIcon icon={faRotateLeft} />
            </div> */}
        </div>
      </div>
      {/* <audio id="beep" src="http://soundjay.com/buttons/sounds/beep-01a.mp3"></audio> */}
      <audio id="beep" src="https://assets.mixkit.co/active_storage/sfx/918/918-preview.mp3"></audio>
 
    </div>
  );
}

export default App;
