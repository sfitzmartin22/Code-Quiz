//global variables used for the project //
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

// event listeners used for the project //
startB.addEventListener("click", startGame)
submitRButton.addEventListener("click", saveR)
HSL.addEventListener("click", ViewHighScores)
startOver.addEventListener("click", reload)

// moving high scores out of local storage and creating list to append to High Score list //
function printHighScores() {
var highScores = JSON.parse(window.localStorage.getItem("highscores")) || {};
highScores.sort(function(a,b) {
    return b.score - a.score;
});    

highScores.forEach(function(scoreObject) {
    var listtag = document.createElement("li");
    listtag.textContent = scoreObject.userID + ": " + scoreObject.score + " seconds";
    highScoreList.appendChild(listtag);
});
}

// saving userID and scores to local storage //
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
     timerEl.setAttribute("class","hide")
     HSL.removeAttribute("class", "hide")
     highScoreList.removeAttribute("class", "hide")
     printHighScores();
     startOver.removeAttribute("class", "hide")
 } 

// formatting for the high score page //
 function ViewHighScores(){
    timerEl.setAttribute("class","hide") // hide timer //
    submitR.setAttribute("class", "hide") // hide submit button //
    HSL.removeAttribute("class", "hide") //unhide High Score Header/
    highScoreList.removeAttribute("class", "hide") // unhide high score list //
    printHighScores(); // printing high score list items to page //
    startOver.removeAttribute("class", "hide") // unhide take quiz again button //
 }

function startGame () {
startB.setAttribute("class", "hide")  // hide start button //
startQ.removeAttribute("class", "hide") // unhide question secton //
timer(); // call timer //
populateQuestion(); // populate question //
}

// reload webpage to start the quiz again //
function reload() {
    location.reload(); 
}

// move to the next question and penalize for missed questions //
function questionClick() {
    if (this.value !== questionBucket[currentQuestionArray].answer && currentQuestionArray < 6) {

    if (secondsLeft < 10) {
        clearInterval(timer);
        secondsLeft = 0;
        timerEl.textContent = secondsLeft + " seconds remaining";
        endQuiz;
        return
    } else {
    secondsLeft-= 10;
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

// end quiz section //
function endQuiz() {
    startQ.setAttribute("class", "hide");
    submitR.removeAttribute("class", "hide");
}


// display selected question on the screen and append info/
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

// list of questions //
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

//timer function //
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

