const holes = document.querySelectorAll('.hole');
//console.log(holes);
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startbutton');
const highScoreBoard = document.querySelector('.highscore');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;
let highScore = localStorage.getItem('game1HighScore') || 0;
highScoreBoard.textContent = 'HIGH SCORE: ' + highScore;

function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole) {
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}
function popOut(){
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){ // !!!!!!!!!!!
        hole.classList.remove('up');
        if (!timeUp) popOut();
    }, time);
}



function startGame() {
    countdown = timeLimit/1000; // or 20 (seconds)
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function(){
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function() {
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if (countdown < 0) {
            countdown = 0;
            clearInterval(startCountdown);
            checkHighScore();
            countdownBoard.textContent = 'Times up';
        }
    }, 1000);
}

startButton.addEventListener('click', startGame);

function whack() {
score++;
this.style.backgroundImage = 'url("images/yoda2.png")';
this.style.pointerEvents ='none';
setTimeout(() => {
    this.style.backgroundImage = 'url("images/yoda1.png")';
    this.style.pointerEvents = 'all';
}, 800);
scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));


// Hoisted function (can placed it anywhere and call it anywhere even
// before it was declared)
function checkHighScore() {
    if (score > localStorage.getItem('game1HighScore')) {
        localStorage.setItem('game1HighScore', score);
        highScore = score;
        highScoreBoard.textContent = 'HIGH SCORE: ' + highScore;
    }
}