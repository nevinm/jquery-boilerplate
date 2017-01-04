var alphabetIndex = -1;
var isKeyNotActive = true;
var setShortKeyPressed;
var lastButtonPressed;

function determineClick(event, longpress) {
  var target = event.currentTarget;
  var button_pressed = $(target).data("value");

  if (lastButtonPressed !== button_pressed){
    reset();
  }

  longpress ? longButtonPress(button_pressed) : shortButtonPress(button_pressed);
}

function butonAddClickListener() {
	    var longpress = false;
      var humanHoldDuration = 700;
 		  var startTime, endTime;

    $("button")
    .on('mousedown', function (event) {
        startTime = new Date().getTime();
    })
    .on('mouseup', function (event) {
        endTime = new Date().getTime();
        longpress = (endTime - startTime < humanHoldDuration) ? false : true;
        determineClick(event, longpress);
    });
}

function shortButtonPress(button_pressed) {
	var resultArea = $("#result");
  var currentAlphabetArray = calculatorKeys[button_pressed];
  var shortPauseDuration = 300;
  lastButtonPressed = button_pressed;
  clearTimeout(setShortKeyPressed);
  alphabetIndex = (alphabetIndex >= currentAlphabetArray.length) ? 0 : ++alphabetIndex;
  console.log('OUTSIDE SetTIMEUT alphabetIndex-->', alphabetIndex);

  setShortKeyPressed = setTimeout(function() {
    console.log('inside SetTIMEUT alphabetIndex-->', alphabetIndex);
    resultArea.val(resultArea.val() + currentAlphabetArray[alphabetIndex]);
    alphabetIndex++;
  }, shortPauseDuration);
}

function reset() {
  alphabetIndex = -1;
}

function longButtonPress(button_pressed) {
  var resultArea = $("#result");
  resultArea.val(resultArea.val() + button_pressed);
}

$(document).ready(function(){
  butonAddClickListener();
});

function t9(text,button_pressed) {
  resultArea.val(resultArea.val() + currentAlphabetArray[alphabetIndex]);
}

var calculatorKeys = {
  '1': ['.', ',', '!'],
  '2': ['a', 'b', 'c'],
  '3': ['d','e','f'],
  '4': ['g','h','i'],
  '5': ['j','k','l'],
  '6': ['m','n','o'],
  '7': ['p','q','r','s'],
  '8': ['t','u','v'],
  '9': ['w','x','y','z'],
  '0':[' ']
}
