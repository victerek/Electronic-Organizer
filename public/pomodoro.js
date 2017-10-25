// Define all variables
let countdown;

// Session & break variables
let sessionSpan = 25; // Starts at 25 minutes
let breakSpan = 5; // Starts at 5 minutes
let sessionTimeSpan = sessionSpan * 60; // Session time will be multiplied by 60 seconds
let breakTimeSpan = breakSpan * 60; // Break time will be multiplied by 60 seconds

// Pomodoro timer
let pomodoro = document.getElementById('pomodoro');

// Session variables
let sessionLength = document.getElementById('sessionLength');
let sessionTimeAdd = document.getElementById('sessionTimeAdd');
let sessionTimeSubstract = document.getElementById('sessionTimeSubstract');

// Session buttons controls
let sessionStartButton = document.getElementById('sessionStart');
let sessionPauseButton = document.getElementById('sessionPause');
let sessionResetButton = document.getElementById('sessionReset');
showSessionButtons('', 'none', 'none');

// Break variables
let breakLength = document.getElementById('breakLength');
let breakAddTime = document.getElementById('breakAddTime');
let breakSubTime = document.getElementById('breakSubTime');

// Break buttons controls
let breakStartButton = document.getElementById('breakStart');
let breakPauseButton = document.getElementById('breakPause');
let breakResetButton = document.getElementById('breakReset');
showBreakButtons('none', 'none', 'none');

// Implementation of the session, break and pomodoro elements
sessionLength.innerHTML = ` ${sessionSpan} `;
breakLength.innerHTML = ` ${breakSpan} `;
pomodoro.innerHTML = sessionSpan + ':00';

// Main function for minutes/seconds
function countdownOn(seconds) {
  const minutes = parseInt(seconds / 60);
  const timeLeft = seconds % 60;
  if (timeLeft < 10) timeLeft = '0' + timeLeft;
  pomodoro.innerHTML = minutes + ':' + timeLeft;
}

// Two methods are used for Pomodoro Clock: setInterval() to repeat the functions every second and clearInterval() to launch the next session or break
//  Main function for session countdown 
function sessionOn() {
  clearInterval(countdown); // clear the countdown
  countdown = setInterval(function() { // set the countdown to the setInterval() method
    countdownOn(sessionTimeSpan);
    // if the timer hits 0, the break time will come next
    if (sessionTimeSpan === 0) {
      clearInterval(countdown); // clear the countdown
      breakTimeSpan = breakSpan * 60; // show the break time length
      showSessionButtons('none', 'none', 'none'); // no session buttons
      breakOn(); // start the break time function
    }

    // else the session countdown continues
    else sessionTimeSpan--; // session time decrease by 1 second
  }, 1000);
  showSessionButtons('none', '', ''); // show session pause and reset buttons
}
sessionStartButton.addEventListener('click', sessionOn); // event listener for session start button

// Secondary function to pause session
function sessionPause() {
  clearInterval(countdown); // clear countdown
  showSessionButtons('', 'none', 'none'); // show session start button
  sessionStartButton.innerHTML = 'Continue';
}
sessionPauseButton.addEventListener('click', sessionPause); // event listener for session pause button

// Secondary function to reset session
function sessionReset() {
  sessionPause(); // pause the session
  sessionTimeSpan = sessionSpan * 60; // total session length in seconds
  pomodoro.innerHTML = sessionSpan + ':00'; // session length in the DOM
  sessionStartButton.innerHTML = 'Start new session';
}
sessionResetButton.addEventListener('click', sessionReset); // event listener for session reset button

// Secondary function to add time to session
function sessionAddSpan() {
  sessionSpan++; // session + 1 minute
  sessionTimeSpan = sessionSpan * 60; // total session length in seconds
  sessionLength.innerHTML = sessionSpan; // session length in the DOM
}
sessionTimeAdd.addEventListener('click', sessionAddSpan); // event listener for adding time to session

// Secondary function so subtract time to session
function sessionSubSpan() {
  sessionSpan--; // session - 1 minute
  if (sessionSpan < 2) sessionSpan = 1; // Set the minimum to 1 minute
  sessionTimeSpan = sessionSpan * 60; // tptal session length in seconds
  sessionLength.innerHTML = sessionSpan; // session length in the DOM
}
sessionTimeSubstract.addEventListener('click', sessionSubSpan); // event listener for subtracting time to session

// Tertiary function to show session buttons
function showSessionButtons(start, pause, reset) {
  sessionStartButton.style.display = start; // display start session button
  sessionPauseButton.style.display = pause; // display start pause button
  sessionResetButton.style.display = reset; // display start reset button
}

// Main function for break countdown
function breakOn() {
  clearInterval(countdown);
  countdown = setInterval(function() {
    countdownOn(breakTimeSpan);

    if (breakTimeSpan === 0) {
      clearInterval(countdown);
      sessionTimeSpan = sessionSpan * 60;
      showBreakButtons('none', 'none', 'none');
      sessionOn();
    } else breakTimeSpan--;
  }, 1000);
  showBreakButtons('none', '', '');
}
breakStartButton.addEventListener('click', breakOn);

function breakPause() {
  clearInterval(countdown);
  showBreakButtons('', 'none', 'none');
  startBreakButton.innerHTML = 'Continue';
}
breakPauseButton.addEventListener('click', breakPause);

function breakReset() {
  breakPause();
  breakTimeSpan = rest * 60;
  pomodoro.innerHTML = rest + ':00';
  startBreakButton.innerHTML = 'Start';
}
breakResetButton.addEventListener('click', breakReset);

function breakAddSpan() {
  breakSpan++;
  breakTimeSpan = breakSpan * 60;
  breakLength.innerHTML = breakSpan;
}
breakAddTime.addEventListener('click', breakAddSpan);

function breakSubSpan() {
  breakSpan--;
  if (breakSpan < 2) breakSpan = 1;
  breakTimeSpan = breakSpan * 60;
  breakLength.innerHTML = breakSpan;
}
breakSubTime.addEventListener('click', breakSubSpan);

function showBreakButtons(start, pause, reset) {
  breakStartButton.style.display = start;
  breakPauseButton.style.display = pause;
  breakResetButton.style.display = reset;
}
