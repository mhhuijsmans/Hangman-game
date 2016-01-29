/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

var wrongGuesses = 0;

function pickAWord() {
    var i = Math.floor(Math.random() * wordList.length);
    return wordList[i];
}
var word = pickAWord().toLowerCase();
console.log("Het woord is: " + word);
console.log(word.length);

var letterArray = [];
(function() {
    var i;
    for (i = 0; i < word.length; i++) {
        letterArray.push(" ");
    }
}());

var wordContainer = document.querySelector("#wordcontainer");
function updateWordGuess() {
    wordContainer.innerHTML = "";
    var i = 0;
    for (i = 0; i < letterArray.length; i++) {
        wordContainer.innerHTML += '<span class="letter">' + letterArray[i] + '</span> ';
    }
}
updateWordGuess();

var clickedLetter;
var allLetters = document.querySelectorAll("button.letter");
var guessContainer = document.querySelector("#guesscontainer");
var charIndex;
var previousCharIndex = 0;
var message = document.querySelector("#message");
var hangman = document.querySelector("#hangman");

function disableLetters() {
    var i;
    for (i = 0; i < allLetters.length; i++) {
        allLetters[i].disabled = true;
    }
}

function whichLetter(event) {
    clickedLetter = event.target;
    if (clickedLetter.disabled === false) {
        charIndex = word.indexOf(clickedLetter.innerHTML);
        if (charIndex !== -1) {
            while (charIndex !== -1) {
                charIndex = word.indexOf(clickedLetter.innerHTML, previousCharIndex);
                previousCharIndex = charIndex + 1;
                letterArray[charIndex] = clickedLetter.innerHTML;
                updateWordGuess();
            }
        }
        else {
            wrongGuesses++;
            hangman.src = "img/" + wrongGuesses + ".png";
            if (wrongGuesses == 10) {
                message.innerHTML = "Je bent dood :( Het woord was: " + word + ".";
                disableLetters();
            }
        }
        
        if (letterArray.indexOf(" ") == -1) {
            message.innerHTML = "Gefeliciteerd! Je hebt gewonnen!";
            disableLetters();
            }
        event.target.disabled = true;
        var i = Math.floor(Math.random() * 3);
        console.log(i);
        event.target.classList.add("disabled"+i);
    }
    event.preventDefault();
}

guessContainer.addEventListener('click', whichLetter, false);