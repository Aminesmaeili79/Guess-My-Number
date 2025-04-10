'use strict';

const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
var guessInput = document.querySelector('.guess');
var resultText = document.querySelector('.message');
var scoreText = document.querySelector('.score');
var scoreValue = Number(document.querySelector('.score').innerText);
var numberValue = document.querySelector('.number');
var highScoreValue = Number(document.querySelector('.highscore').innerText);
var highScoreText = document.querySelector('.highscore');
var highestNumberValue = Number(document.querySelector('.max')) || 20;
var highestNumberText = document.querySelector('.max');
var highestNumberButton = document.querySelector('.between');

var maxNumbers = [20, 50, 100];
var currentMaxIndex = 0;
var previousGuess = -1;

function generateRandomNumber(max) {
    return randomNumber = Math.ceil(Math.random() * max);
}

var randomNumber = generateRandomNumber(highestNumberValue);

console.log(randomNumber);

guessInput.setAttribute('max', highestNumberValue);
guessInput.setAttribute('min', 1);

const handleChangeBetweenNumbers = () => {
    currentMaxIndex++;
    currentMaxIndex = currentMaxIndex % 3;
    highestNumberValue = maxNumbers[currentMaxIndex];
    highestNumberText.innerText = String(highestNumberValue);
    generateRandomNumber(highestNumberValue);

    guessInput.setAttribute('max', highestNumberValue);
    console.log(randomNumber);
}

const handleAgain = () => {
    guessInput.value = '';
    resultText.innerText = 'Start guessing...';
    scoreValue = 20;
    scoreText.innerText = String(scoreValue);
    generateRandomNumber(highestNumberValue);
    numberValue.innerText = "?";
    checkButton.disabled = false;
    document.querySelector("body").style.backgroundColor = "#222";
}

const handleCheckClick = () => {
    var guess = Number(guessInput.value);

    if (guess != previousGuess) {
        previousGuess = guess;
        if (!guess) {
            resultText.innerText = "Invalid guess";
        } else if (guess < randomNumber) {
            updateTextAndScore("Too low...");
        } else if (guess > randomNumber) {
            updateTextAndScore("Too high...");
        }
        if (scoreValue <= 0) {
            resultText.innerText = "You lose :(";
            document.querySelector('body').style.backgroundColor = "#CC3522";
            checkButton.disabled = true;
            numberValue.innerText = String(randomNumber);
        } else {
            resultText.innerText = "That's correct!";
            document.querySelector("body").style.backgroundColor = "#539911";
            numberValue.innerText = String(guess);
            checkButton.disabled = true;

            if (scoreValue > highScoreValue) {
                highScoreValue = scoreValue;
                highScoreText.innerText = String(highScoreValue);
            }
        }
    }
}

const updateTextAndScore = (text) => {
    resultText.innerText = text;
    scoreValue -= 1;
    scoreText.innerText = String(scoreValue);
}

checkButton.addEventListener('click', handleCheckClick);
againButton.addEventListener('click', handleAgain);
highestNumberButton.addEventListener('click', handleChangeBetweenNumbers);