// Define all the variables / Оголошення змінних
let countdown;

// Session & break variables / Змінні сесії та перерви
let sessionSpan = 25; // Starts at 25 minutes / Починаючи з 25 хвилин
let breakSpan = 5; // Starts at 5 minutes / Починаючи з 5 хвилин
let sessionTimeSpan = sessionSpan * 60; // Session time will be multiplied by 60 seconds / Час сесії будет помножений на 60 секунд
let breakTimeSpan = breakSpan * 60; // Break time will be multiplied by 60 seconds / Час перерви будет помножений на 60 секунд

// Pomodoro timer / Помодоро годинник
let pomodoro = document.getElementById('pomodoro');

// Session variables / Змінні сесії
let sessionLength = document.getElementById('sessionLength');
let sessionTimeAdd = document.getElementById('sessionTimeAdd');
let sessionTimeSubstract = document.getElementById('sessionTimeSubstract');

// Break variables / Змінні переви
let breakLength = document.getElementById('breakLength');
let breakAddTime = document.getElementById('breakAddTime');
let breakSubTime = document.getElementById('breakSubTime');


// Session buttons controls / Кнопки для контролю сесії
let sessionStartButton = document.getElementById('sessionStart');
let sessionPauseButton = document.getElementById('sessionPause');
let sessionResetButton = document.getElementById('sessionReset');
showSessionButtons('', 'none', 'none');

// Break buttons controls / Кнопки для контролю перерви
let breakStartButton = document.getElementById('breakStart');
let breakPauseButton = document.getElementById('breakPause');
let breakResetButton = document.getElementById('breakReset');
showBreakButtons('none', 'none', 'none');

// Implementation in the DOM of the session, break and pomodoro elements
// Реалізація сесії, перерви та елементів помодоро в DOM
sessionLength.innerHTML = ' ' + sessionSpan + ' ';
breakLength.innerHTML = ' ' + breakSpan + ' ';
pomodoro.innerHTML = sessionSpan + ':00';

// Main function for minutes/seconds system
// Головна функція для системи хвилин/секунд
function countdownOn(seconds) {
  var minutes = parseInt(seconds / 60);
  var timeLeft = seconds % 60;
  if (timeLeft < 10) timeLeft = '0' + timeLeft;
  pomodoro.innerHTML = minutes + ':' + timeLeft;
}

// Two methods are used for Pomodoro Clock: setInterval() to repeat the functions every second and clearInterval() to launch the next session or break
// Для помодоро таймера використовуються два методи: setInterval() щоб повторювати функцію кожну секундоку та clearInterval() для запуску нової сесію або перерви

//  Main function for session countdown / Головна функція для таймера сесії
function sessionOn() {
  clearInterval(countdown); // clear the countdown / очистити таймер
  countdown = setInterval(function() { // set the countdown to the setInterval() method / встановити таймер в setInterval() метод
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
  }, 1000); // 1000 = 1 second
  showSessionButtons('none', '', ''); // show session pause and reset buttons
}
sessionStartButton.addEventListener('click', sessionOn); // event listener for session start button

// Secondary function to pause session
function sessionPause() {
  clearInterval(countdown); // clear countdown
  showSessionButtons('', 'none', 'none'); // show session start button
  sessionStartButton.innerHTML = 'Продовжити';
}
sessionPauseButton.addEventListener('click', sessionPause); // event listener for session pause button

// Secondary function to reset session
function sessionReset() {
  sessionPause(); // pause the session
  sessionTimeSpan = sessionSpan * 60; // total session length in seconds
  pomodoro.innerHTML = sessionSpan + ':00'; // session length in the DOM
  sessionStartButton.innerHTML = 'Почати новую сесію';
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

// +++++ Main function for break countdown +++++
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
  startBreakButton.innerHTML = 'Продовжити';
}
breakPauseButton.addEventListener('click', breakPause);

function breakReset() {
  breakPause();
  breakTimeSpan = rest * 60;
  pomodoro.innerHTML = rest + ':00';
  startBreakButton.innerHTML = 'Почати';
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
