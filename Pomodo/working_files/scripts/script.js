const buttons = document.querySelectorAll(".button");
const sessionTime = document.querySelector(".session-time");
const breakTime = document.querySelector(".break-time");
const countdownTime = document.querySelector(".countdown-time");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

let sessionNum = 25;
let breakNum = 5;
let sessionMs = 1500000;
let breakMs = 60000;
let countdownRunning = false;
let sessionBreakSwitch = "session";
let intervalID = null;

sessionTime.textContent = sessionNum;
breakTime.textContent = breakNum;
minutes.textContent = sessionNum;

//Click events for the buttons
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    switch (button.dataset.key) {
      case "session-plus":
        if (countdownRunning == false) {
          SessionBreakTime.sessionPlus();
        };
        break;
      case "session-minus":
        if (countdownRunning == false) {
          SessionBreakTime.sessionMinus();
        };
        break;
      case "break-plus":
        if (countdownRunning == false) {
          SessionBreakTime.breakPlus();
        };
        break;
      case "break-minus":
        if (countdownRunning == false) {
          SessionBreakTime.breakMinus();
        };
        break;
      case "start":
        if (countdownRunning == false) {
          start();
        };
        break;
      case "stop":
        stop();
        break;
    };
  });
});

function sessionMilliseconds() {
  //sessionTime to milliseconds
  const milliseconds = sessionNum * 60000;
  sessionMs = milliseconds;
};

function breakMilliseconds() {
  //sessionTime to milliseconds
  const milliseconds = breakNum * 60000;
  breakMs = milliseconds;
};

function toSecondsMinutesHours(input) {
  //Milliseconds
  let milliseconds = input / 1000;
  //Seconds
  let seconds = Math.floor( (input/1000) % 60 );
  //Minutes
  let minutes = Math.floor( (input/1000/60) % 60 );
  //Hours
  let hours = Math.floor( (input/(1000*60*60)) % 24 );

  return {
    "hours": hours,
    "minutes": minutes,
    "seconds": seconds
  };
}

//Countdown Function
function start() {
  intervalID = setInterval(countdown, 1000);

  function countdown() {
    if (sessionBreakSwitch == "session") {
      if (sessionMs >= 1000) {
        left.classList.add("white-border");
        Countdown.sessionStart();
      } else {
        left.classList.remove("white-border");
        sessionBreakSwitch = "break";
        sessionMilliseconds();
        console.log(sessionBreakSwitch);
      }
    };

    if (sessionBreakSwitch == "break") {
      if (breakMs >= 1000) {
        right.classList.add("white-border");
        Countdown.breakStart();
      } else {
        right.classList.remove("white-border");
        sessionBreakSwitch = "session";
        breakMilliseconds();
        console.log(sessionBreakSwitch);
      }
    };
  };
};

function stop() {
  countdownRunning = false;
  clearInterval(intervalID);
}

//Set session/break numbers
const SessionBreakTime = {
  sessionPlus: function() {
    sessionNum++;
    sessionMilliseconds();
    session();
  },
  sessionMinus: function() {
    if (sessionNum > 1) {
      sessionNum--;
      sessionMilliseconds(sessionNum, sessionMs);
      session();
    }
  },
  breakPlus: function() {
    breakNum++;
    breakTime.textContent = breakNum;
    breakMilliseconds();
  },
  breakMinus: function() {
    if (breakNum > 1) {
      breakNum--;
      breakTime.textContent = breakNum;
      breakMilliseconds();
    }
  }
};

//Update session time
function session() {
  sessionTime.textContent = sessionNum;
  minutes.textContent = sessionNum;
  seconds.textContent = "";
  hours.textContent = "";
};

//Update timer display
const Countdown = {
  sessionStart: function() {
    countdownRunning = true;
    sessionBreakSwitch = "session";
    sessionMs -= 1000;
    let t = toSecondsMinutesHours(sessionMs);
    hours.textContent = (`0${t.hours}`).slice(-2);
    minutes.textContent = (`0${t.minutes}`).slice(-2);
    seconds.textContent = (`0${t.seconds}`).slice(-2);
  },
  breakStart: function() {
    countdownRunning = true;
    sessionBreakSwitch = "break";
    breakMs -= 1000;
    let t = toSecondsMinutesHours(breakMs);
    hours.textContent = (`0${t.hours}`).slice(-2);
    minutes.textContent = (`0${t.minutes}`).slice(-2);
    seconds.textContent = (`0${t.seconds}`).slice(-2);
  }
};
