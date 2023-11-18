const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainEasyBtn = gameModal.querySelector(".play-again-easy");
const playAgainMedBtn = gameModal.querySelector(".play-again-med");
const playAgainHardBtn = gameModal.querySelector(".play-again-hard");


let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = (difficulty) => {
    let wordList;

    switch (difficulty) {
        case 'easy':
            wordList = easyWordList;
            break;
        case 'medium':
            wordList = medWordList;
            break;
        case 'hard':
            wordList = hardWordList;
            break;
        default:
            wordList = medWordList;
            break;
    }

    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'you-win' : 'game-over'}.png`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

const iniGame = (button, clickedLetter) => {

    if (currentWord.includes(clickedLetter)) {

        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {

        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;


    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}


for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.classList.add('btn', 'btn-info', 'm-1', 'shadow');
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => iniGame(e.target, String.fromCharCode(i)));
}

getRandomWord('easy');
playAgainEasyBtn.addEventListener("click", function () {
    getRandomWord('easy');
});

playAgainMedBtn.addEventListener("click", function () {
    getRandomWord('medium');
});

playAgainHardBtn.addEventListener("click", function () {
    getRandomWord('hard');
});