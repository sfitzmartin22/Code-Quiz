var secondsLeft;
var timerEl = document.querySelector(".timer");
var ViewHighScores = document.querySelector("#highscorelink");
var highScores = document.querySelector("#highscore");
var questionSet = document.querySelector(".questions");
var answerSet = document.querySelector("#answer-buttons");
var startQ = document.getElementById("question-container")
var startB = document.getElementById("start-btn")

startB.addEventListener("click", startGame)

function startGame () {
startB.setAttribute("class", "hide")
startQ.removeAttribute("class", "hide")
timer();
}

var questionBucket = [
    {
        question: "What are variables used for in JavaScript",
        choices: [{text: "a. Storing numbers, dates, or other values", correct: true}, {text: "b. Varying randomly", correct: false}, {text: "c. All of the above", correct: false}, {text: "d. None of the above", correct: false}],
    },

    {
        question: "What should appear at the very end of your JavaScript?",
        choices: [{text: "a. The <script>", correct: false}, {text: "b. The END statement", correct: false}, {text: "c. The </script>", correct: true}, {text: "d. None of the above", correct: false}],
    },

    {
        question: "Using _______ statement is how you test for a specific condition.",
        choices: [{text: "a. Select", correct: false}, {text: "b. If", correct: true}, {text: "c. Switch", correct: false}, {text: "d. For", correct: false}],
    },

    {
        question: "The _______ method of an Array object adds and/or removes elements from an array.",
        choices: [{text: "a. Reverse", correct: false}, {text: "b. Shift", correct: false}, {text: "c. Splice", correct: true}, {text: "d. Slice", correct: false}],
    },

    {
        question: "In JavaScript, _________ is an object of the target language data type that encloses an object of the source language.",
        choices: [{text: "a. a wrapper", correct: true}, {text: "b. a link", correct: false}, {text: "c. a cursor", correct: false}, {text: "d. a form", correct: true}]
    },

]

function timer() {
    secondsLeft = 60;
        timerStart = setInterval(function() {
            secondsLeft--;
            timerEl.textContent = secondsLeft + " seconds remaining";
            if (secondsLeft === 0) {
            clearInterval(timerStart);
            timerEl.textContent = "Your time is up!"

        }
    }, 1000);
}

