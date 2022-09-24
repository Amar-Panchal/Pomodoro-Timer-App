import React from 'react';


class Pomodro_timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        breakLength: 5,
        sessionLength:  25,
        timerSeconds: 1500,
        currTimer: "Work Time",
        timerState: 'STOPPED',
      }
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
      this.toggleTimerRUNNING = this.toggleTimerRUNNING.bind(this);
      this.reset = this.reset.bind(this);
      this.formatTime = this.formatTime.bind(this);
    }
    
    // +/- buttons in the lengthCard components
    // increment and decrement both adjust the length in the state
    // and then call adjustCurrentTimer()
    increment = (whichToInc) => {
      if (whichToInc==="Break Time") {
        if (this.state.breakLength < 60) { // length control
          this.setState({
            breakLength: this.state.breakLength + 1,
          })        
        }   
      }
      else if (whichToInc==="Work Time") {
        if (this.state.sessionLength < 60) {
          this.setState({
            sessionLength: this.state.sessionLength + 1,
          })
        }     
      }
      if(this.state.timerSeconds<3600){
        this.adjustCurrTimer(whichToInc, 'inc');  
      }    
    }
    decrement = (whichToDec) => {
      if (whichToDec==="Break Time") {
        if (this.state.breakLength > 1) { // length control
          this.setState({
            // perform decrements
            breakLength: this.state.breakLength - 1,
          })
        }
      }
      else if (whichToDec==="Work Time") {
        if (this.state.sessionLength > 1) {
          this.setState({
            sessionLength: this.state.sessionLength - 1,
          })
        }     
      }
      if(this.state.timerSeconds>60){
        this.adjustCurrTimer(whichToDec, 'dec');
      }   
    }
    
    // changes the timer to reflect the changed break/session lengths
    adjustCurrTimer(whichToAdjust, adjustType) {
      // gets called whenever the inc/dec buttons are pressed
      // adds/subtracts 60 seconds from the current timer
      if (this.state.currTimer === whichToAdjust) {
        if (adjustType === 'dec') {
          this.setState({
            timerSeconds: this.state.timerSeconds - 60,
          })
        } else if (adjustType === 'inc') {
          this.setState({
            timerSeconds: this.state.timerSeconds + 60,
          })
        }      
      }
    }
    
    // changes RUNNING/STOPPED timer state
    // when RUNNING, uses Window setInterval() method
    toggleTimerRUNNING = () => {
      if (this.state.timerState === 'STOPPED') {
        this.setState({timerState: 'RUNNING'})
        setInterval(() => {this.countdown()}, 1000);
      }
      else if (this.state.timerState === 'RUNNING') {
        this.setState({timerState: 'STOPPED'})
      }
    }
    
    // setInterval in toggleTimerRUNNING() fires this once per second
    // calls the controller to see if the session/break is over
    countdown() {
      this.timerController()
      if (this.state.timerSeconds>0 && this.state.timerState==='RUNNING') {
        this.setState({
          timerSeconds: this.state.timerSeconds - 1,
        });
      }
    }
    
    timerController() {
      // fires whenever the timer counts down to check if the timer needs switching
      if (this.state.timerSeconds === 0) {
        this.playBeep.play();
        // flips the timer: Session <=> Break
        if (this.state.currTimer === "Work Time") {
          this.setState({
            currTimer: "Break",
            timerSeconds: this.state.breakLength*60 + 1,
          })
        } else if (this.state.currTimer === "Break Time") {
          this.setState({
            currTimer: "Session",
            timerSeconds:this.state.sessionLength*60 + 1,
          })
        }
      }
    }
    
    // resets to default, resets the beep
    reset() {
      this.setState({
        breakLength: 5,
        sessionLength: 25,
        timerSeconds: 1500,
        currTimer: "Work Time",
        timerState: 'STOPPED',
      });
      this.playBeep.pause();
      this.playBeep.currentTime = 0;
    }  
    
    // mm:ss format
    formatTime() {
      // timer is denoted in seconds, so for mm:ss format we calculate the
      // minutes remaining and the seconds remaining in each minute
      let min = Math.floor(this.state.timerSeconds / 60);
      let sec = this.state.timerSeconds - min * 60;
      // keep them double digits
      min = min < 10 ? '0'+min : min;
      sec = sec < 10 ? '0'+sec : sec;
      // nicely formatted
      return min + ':' + sec;
    }
    
    render() {
      return (
        <div id="wrapper">
          <h1 className='text-center heading py-3'>Pomodoro Timer App </h1>
          <div id="cardBox" className='d-flex justify-content-evenly py-3'>
          
            <LengthCard 
              labelId="break-label"
              cardHeader="Break Time"
              length={this.state.breakLength}
              lengthId="break-length" 
              decId="break-decrement"
              dec = {()=>{this.decrement("Break Time")}}
              incId="break-increment"
              inc = {()=>{this.increment("Break Time")}}  />
              <Timer 
              currentTimer={this.state.currTimer}
              timerStatus={this.state.timerState}
              startStop={this.toggleTimerRUNNING}
              timerSecondsLeft={this.formatTime(this.state.timerSeconds)}
              reset={this.reset}
              />
            <LengthCard 
              labelId="session-label"
              cardHeader="Work Time"
              length={this.state.sessionLength}
              lengthId="session-length"
              decId="session-decrement"
              dec = {()=>{this.decrement("Work Time")}}
              incId="session-increment"
              inc = {()=>{this.increment("Work Time")}}  />
          </div>
          
          <audio
            id="beep"
            preload="auto"
            ref={(audio) => {
              this.playBeep = audio;
            }}
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />
        </div>
      );
    };
  };
  

const Timer = (props) => {
    return (
      <div >
        <p id="timer-label">{props.currentTimer} </p>
        <p id="time-left">{props.timerSecondsLeft}</p>
        <p className='action'> {props.timerStatus}</p>
        <div id="buttons" className='d-flex justify-content-center'>
          <h1 id="start-stop" className='btn-timer' onClick={props.startStop }>Start</h1>
          <h1 id="start-stop" className='btn-timer' onClick={props.startStop }>Pause</h1>
          <h1 id="reset" className='btn-timer' onClick={props.reset}>Reset</h1>
        </div>
      </div>
    )
}

const LengthCard = (props) => {
  return (
    <div id="length-card" className="">
      <span id={props.labelId} className="px-2 ">{props.cardHeader}</span>
      <div className=''>
        <button id={props.decId} className='btn-timer my-2' onClick={props.dec}> - </button>
        <span id={props.lengthId} className="time-seter">{props.length}</span>
        <button id={props.incId} className='btn-timer my-2' onClick={props.inc}> + </button>
      </div>
    </div>
  )
}

export default Pomodro_timer;
