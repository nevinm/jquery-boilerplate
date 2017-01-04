var shortPressApplied = 0;
var isKeyNotActive = true;
var shortKeyPressed;
var lastButtonPressed;

function determineClick(event, longpress) {
  var target = event.currentTarget;
  var button_pressed = $(target).data("value");
  clearTimeout(shortKeyPressed);
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
  if(lastButtonPressed !== button_pressed){
    reset();
  }
  var currentShortKeyArray = calculatorKeys[button_pressed];
  var shortPauseDuration = 150;


  if(isKeyNotActive) {
    isKeyNotActive = false; // Key is active now hence disabled to enter this loop.
    shortKeyPressed = setTimeout(function() {
      resultArea.val(resultArea.val() + currentShortKeyArray[shortPressApplied]);
      shortPressApplied = (shortPressApplied >= currentShortKeyArray.length-1) ? 0 : ++shortPressApplied;
      isKeyNotActive = true;
    }, shortPauseDuration);
  }
}

function reset() {
  shortKeyPressed = 0;
}

function longButtonPress(button_pressed) {
  var resultArea = $("#result");
  resultArea.val(resultArea.val() + button_pressed);
}

$(document).ready(function(){
  butonAddClickListener();
});

function t9(text,button_pressed) {
		var selectedText = Object.keys(calculatorKeys);

    return selectedText;
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
