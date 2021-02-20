var secondsLeft;
var timerEl = document.querySelector(".timer");
var ViewHighScores = document.querySelector("#highscorelink");
var highScores = document.querySelector("#highscore");
var questionSet = document.querySelector(".questions");
var answersEl = document.querySelector("#answers");
var startQ = document.querySelector("#question-container")
var startB = document.querySelector("#start-btn")
var currentQuestionArray = 0


startB.addEventListener("click", startGame)

function startGame () {
startB.setAttribute("class", "hide")
startQ.removeAttribute("class", "hide")
timer();
populateQuestion();
}


function questionClick() {
    if (this.value !== questionBucket[currentQuestionArray].answer && currentQuestionArray < 6) {

    secondsLeft -= 10;

    if (secondsLeft <0) {
        secondsLeft === 0;
    }
    timerEl.textContent = secondsLeft + " seconds remaining"; 
    }

    currentQuestionArray++;

    if (currentQuestionArray === questionBucket.length) {  
        endQuiz();
    } else {
        populateQuestion();
    }        
    }

function endQuiz() {
    clearInterval(secondsLeft);
    startQ.setAttribute("class", "hide");
}



function populateQuestion(){
    var questionScreen = questionBucket[currentQuestionArray];
    var titleEl = document.querySelector("#questions");
    titleEl.textContent = questionScreen.question
    answersEl.innerHTML = "";

    questionScreen.choices.forEach(function (choice, i) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);
        choiceButton.textContent = i + 1 + ". " + choice;
        choiceButton.addEventListener("click", questionClick);

        answersEl.appendChild(choiceButton);
    });

}

var questionBucket = [
    {
        question: "What are variables used for in JavaScript",
        choices: ["a. Storing numbers, dates, or other values", "b. Varying randomly", "c. All of the above", "d. None of the above"],
        answer: "a. Storing numbers, dates, or other values"
    },

    {
        question: "What should appear at the very end of your JavaScript?",
        choices: ["a. The <script>", "b. The END statement", "c. The </script>", "d. None of the above"],
        answer: "c. The </script>"
    },

    {
        question: "Using _______ statement is how you test for a specific condition.",
        choices: ["a. Select", "b. If", "c. Switch", "d. For"],
        answer: "b. If"
    },

    {
        question: "The _______ method of an Array object adds and/or removes elements from an array.",
        choices: ["a. Reverse", "b. Shift", "c. Splice", "d. Slice"],
        answer: "c. Splice"
    },

    {
        question: "In JavaScript, _________ is an object of the target language data type that encloses an object of the source language.",
        choices: ["a. a wrapper", "b. a link", "c. a cursor", "d. a form"],
        answer: "d. a form"
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

