var secondsLeft;
var timerEl = document.querySelector(".timer");
var highScoreList = document.querySelector("#highscore");
var answersEl = document.querySelector("#answers");
var startQ = document.querySelector("#question-container")
var startB = document.querySelector("#start-btn")
var currentQuestionArray = 0
var submitR = document.querySelector("#results");
var finalS = document.querySelector("#final-score")
var submitRButton = document.querySelector("#submit");
var userIDEl = document.querySelector("#userid")
var HSL = document.querySelector("#highscorelink")
var startOver = document.querySelector("#startover")

startB.addEventListener("click", startGame)
submitRButton.addEventListener("click", saveR)
HSL.addEventListener("click", ViewHighScores)
startOver.addEventListener("click", reload)


function saveR() {
    userID = userIDEl.value 
    var highScores = JSON.parse(localStorage.getItem("highscores"))  || [];
     var scoreObject = {
         score: secondsLeft,
         userID: userID
     };

     highScores.push(scoreObject);
     localStorage.setItem("highscores", JSON.stringify(highScores));
     submitR.setAttribute("class", "hide")
     HSL.removeAttribute("class", "hide")
    highScoreList.removeAttribute("class", "hide")
    startOver.removeAttribute("class", "hide")

 } 

 function ViewHighScores(){

    HSL.removeAttribute("class", "hide")
    highScoreList.removeAttribute("class", "hide")
    startOver.removeAttribute("class", "hide")
 }

function startGame () {
startB.setAttribute("class", "hide")
startQ.removeAttribute("class", "hide")
timer();
populateQuestion();
}

function reload() {
    location.reload();
}

function questionClick() {
    if (this.value !== questionBucket[currentQuestionArray].answer && currentQuestionArray < 6) {

    if (secondsLeft < 10) {
        clearInterval(secondsLeft);
        secondsLeft = 0;
        timerEl.textContent = secondsLeft + " seconds remaining";
        endQuiz;
        return
    } else {
    secondsLeft-= 30;
    }
    }
    timerEl.textContent = secondsLeft + " seconds remaining"; 
 

    currentQuestionArray++;

    if (currentQuestionArray === questionBucket.length) {  
        clearInterval(timerStart);
        endQuiz();
    } else {
        populateQuestion();
    }
}        

function endQuiz() {
    startQ.setAttribute("class", "hide");
    submitR.removeAttribute("class", "hide");
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
        choices: ["Storing numbers, dates, or other values", "Varying randomly", "All of the above", "None of the above"],
        answer: "Storing numbers, dates, or other values"
    },

    {
        question: "What should appear at the very end of your JavaScript?",
        choices: ["The <script>", "The END statement", "The </script>", "None of the above"],
        answer: "The </script>"
    },

    {
        question: "Using _______ statement is how you test for a specific condition.",
        choices: ["Select", "If", "Switch", "For"],
        answer: "If"
    },

    {
        question: "The _______ method of an Array object adds and/or removes elements from an array.",
        choices: ["Reverse", "Shift", "Splice", "Slice"],
        answer: "Splice"
    },

    {
        question: "In JavaScript, _________ is an object of the target language data type that encloses an object of the source language.",
        choices: ["a wrapper", "a link", "a cursor", "a form"],
        answer: "a form"
    },

]

function timer() {
    secondsLeft = 60;
        timerStart = setInterval(function() {
            secondsLeft--;
            timerEl.textContent = secondsLeft + " seconds remaining";
            if (secondsLeft === 0 || secondsLeft < 0 ) {
            clearInterval(timerStart);
            endQuiz();
        }
    }, 1000);
}

