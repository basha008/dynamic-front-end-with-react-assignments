import React from "react";
import './react_timer.css';

class Timer extends React.Component {
    constructor() {
        super();
        this.state = { time: 0, isRunning: false };
        this.timerId = null;
    }

    startTimer = () => {
        if (!this.state.isRunning) {
            this.timerId = setInterval(() => {
                this.setState(prevState => ({ time: prevState.time + 1 }));
            }, 1000);
            this.setState({ isRunning: true });
        }
    };

    stopTimer = () => {
        if (this.state.isRunning) {
            clearInterval(this.timerId);
            this.setState({ isRunning: false });
        }
    };

    resetTimer = () => {
        clearInterval(this.timerId);
        this.setState({ time: 0, isRunning: false });
    }

    render() {
        return (
            <div className="timer-div">
                <div className="timer-heading">
                    <h1 className="timer">{Math.floor(this.state.time / 3600) < 10 ? '0' : ''}{Math.floor(this.state.time / 3600)}:{Math.floor(this.state.time % 3600 / 60) < 10 ? '0' : ''}{Math.floor(this.state.time % 3600 / 60)}:{this.state.time % 60 < 10 ? '0' : ''}{this.state.time % 60}</h1>
                </div>
                <div className="timer-buttons">
                    <button onClick={this.startTimer} className="btn start-btn">Start</button>
                    <button onClick={this.stopTimer} className="btn stop-btn">Stop</button>
                    <button onClick={this.resetTimer} className="btn reset-btn">Reset</button>
                </div>
            </div>
        );
    }


}

export default Timer;