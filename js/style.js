$(document).ready(function() {
    function setImgHeight() {
        imgHeight = ($(window).innerHeight() - $("#lowcontainer").outerHeight()) * 0.8;
        $('#hangman').css('height', imgHeight);
    }
    
    setImgHeight();
    
    $(window).resize(function() {
        setImgHeight();
    });
});

function hoverColor(event) {
    var hoverLetter = event.target;
    var colorHue = Math.floor(Math.random() * 361);
    hoverLetter.style.color = "hsl(" +colorHue+ ",100%,50%)";
}

guessContainer.addEventListener('mouseover', hoverColor, false);
guessContainer.addEventListener('mouseout', (function () {
    var hoverLetter = event.target;
    hoverLetter.style.color = "#000";
}), false);