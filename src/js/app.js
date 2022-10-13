// GETTING CONTENT FROM PAGE
const startBtn = document.querySelector('.start-info__btn');
const resetBtn = document.querySelector('.reset-info__btn');
const resetAllGame = document.querySelector('.reset');
const usernameField = document.querySelector('.reset-info__username');
const resetFinalScore = document.querySelector('.reset-info__score');
const scoreField = document.querySelector('.stats__item-score');
const timeField = document.querySelector('.stats__item-time');
const squares = document.querySelectorAll('.grid__square');
const container = document.querySelector('.container');

// GLOBAL CONSTS
const DEFAULT_USERNAME = 'PLAYER';
const INIT_SCORE = 0;
const EASY = 900;
const MEDIUM = 600;
const HARD = 400;
const HARDCORE = 250;

// GAME CONTROLS
let score = INIT_SCORE;
let countdownTimer = null;
let randomSquareTimer = null;
let randNum;

// DATA FROM INPUTS DECLARATIONS
let usernameData;
let difficulty;
let countToEnd;
let countToEndToDefault;

// GET DATA FROM INPUTS
const getInputs = () => {
  usernameData = document.querySelector('.username-input').value.toUpperCase();
  if (usernameData === '') {
    usernameData = DEFAULT_USERNAME;
  }
  difficulty = document.querySelector("input[name='difficulty']:checked").value;
  if (difficulty === 'easy') {
    difficulty = EASY;
  } else if (difficulty === 'medium') {
    difficulty = MEDIUM;
  } else if (difficulty === 'hard') {
    difficulty = HARD;
  } else if (difficulty === 'hardcore') {
    difficulty = HARDCORE;
  }
  countToEnd = document.querySelector('.time input').value;
  countToEndToDefault = countToEnd;
};

// REMOVE HITABLE FIELDS
const resetMole = () => {
  squares.forEach((square) => square.classList.remove('mole'));
};

// INVOKE WHEN PLAYER CLICK HITABLE FIELD AND ADD 1 POINT TO SCORE
const hitMole = (e) => {
  const userClicked = parseInt(e.target.id, 10) - 1;
  if (randNum === userClicked) {
    score += 1;
    scoreField.textContent = score;
    resetMole();
  }
};

// REMOVE LISTENERS AND SHOW END MESSAGE
const endGame = () => {
  clearInterval(countdownTimer);
  clearInterval(randomSquareTimer);
  squares.forEach((square) => {
    square.removeEventListener('mousedown', hitMole);
  });
  resetMole();
  usernameField.textContent = usernameData;
  resetFinalScore.textContent = score;
  resetBtn.closest('div').style.display = 'block';
  container.classList.add('blur');
};

// GAME TIMER
const countdown = () => {
  countToEnd -= 1;
  timeField.textContent = countToEnd;
  if (countToEnd <= 0) {
    endGame();
  }
};

// GENERATE RANDOM POSITION OF HITABLE ELEMENT
const moveMole = () => {
  resetMole();
  randNum = Math.floor(Math.random() * 9);
  squares[randNum].classList.add('mole');
};

// STARTING GAME
const startGame = () => {
  getInputs();
  squares.forEach((square) => square.addEventListener('mousedown', hitMole));
  container.classList.remove('blur');
  startBtn.closest('div').style.display = 'none';
  timeField.textContent = countToEnd;
  scoreField.textContent = INIT_SCORE;
  countdownTimer = setInterval(countdown, 1000);
  randomSquareTimer = setInterval(moveMole, difficulty);
};

// RESET AND START AGAIN
const resetGame = () => {
  resetBtn.closest('div').style.display = 'none';
  score = INIT_SCORE;
  countToEnd = countToEndToDefault;
  scoreField.textContent = INIT_SCORE;
  startGame();
};

// ALL GAME AGAIN
const refreshPage = () => window.location.reload();

// LISTENERS
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
resetAllGame.addEventListener('click', refreshPage);
