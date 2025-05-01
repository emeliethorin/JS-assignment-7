//Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

//Array of words
const words = [
    "dependent",
    "dog",
    "superficial",
    "admit",
    "juice",
    "javascript",
    "developer",
    "airplane",
    "great",
    "fun",
    "manipulate",
    "cat",
    "transition",
    "school",
    "computer",
    "programming",
    "drag",
    "loving",
    "north",
  ];

  //GAME
let randomWord;
let score = 0;
let time = 10;
let difficulty =
    localStorage.getItem("difficulty") !== null 
    ? localStorage.getItem("difficulty") 
    : "medium";

difficultySelect.value = difficulty;

text.focus();

function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
    time--;
    timeEl.innerHTML = time + "s";
    
    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
 }

 text.addEventListener("input", (event) => {
    const typedText = event.target.value.trim();
    if (typedText === randomWord) {
        addWordToDOM();
        updateScore();

        if (difficulty === "hard") {
            time += 3;
        
        } else if (difficulty === "medium") {
            time += 4;

        } else {
            time += 5;
        }

        updateTime();
        event.target.value = "";
    }
 })

 settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hide");
 });

 settingsForm.addEventListener("change", (event) => {
    difficulty = event.target.value;
    localStorage.setItem("difficulty", difficulty);
 });

//Game over
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out!</h1> 
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Start over</button>
    `;
    endgameEl.style.display = "flex";
}


addWordToDOM();