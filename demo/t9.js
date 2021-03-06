var alphabetIndex = -1;
var displayShortKeyPressed;
var lastButtonPressed;
var shortDuration = 300;
var longDuration = 700;
var resultArea;
var short = {
  firstShortButtonPress: null,
  counter: 0,
};

function determineClick(event, longpress) {
  var target = event.currentTarget;
  var button_pressed = $(target).data("value");

  // If last button pressed is not the current button pressed
  if (lastButtonPressed !== button_pressed){
    resetShortKeyPress();
  }

  longpress ? longButtonPress(button_pressed) : shortButtonPress(button_pressed);
}

function butonAddClickListener() {
    var longpress = false;
	  var startTime, endTime;

    $("button")
    .on('mousedown', function (event) {
        startTime = new Date().getTime();
    })
    .on('mouseup', function (event) {
        endTime = new Date().getTime();
        longpress = (endTime - startTime < longDuration) ? false : true;
        determineClick(event, longpress);
    });
}

function shortButtonPress(button_pressed) {
  var currentAlphabetArray = calculatorKeys[button_pressed];
  lastButtonPressed = button_pressed;
  clearTimeout(displayShortKeyPressed);
  alphabetIndex = (alphabetIndex +1 >= currentAlphabetArray.length) ? 0 : ++alphabetIndex;

  if(short.counter !== 0 && short.firstShortButtonPress === button_pressed) {
    resultArea.val(resultArea.val().slice(0, -1));
  }

  // Resetting
  short.counter++;
  short.firstShortButtonPress = button_pressed;

  //Setting the value
  resultArea.val(resultArea.val() + currentAlphabetArray[alphabetIndex]);
  displayShortKeyPressed = setTimeout(function() {
    resetShortKeyPress();
  }, shortDuration);
}

function resetShortKeyPress() {
  alphabetIndex = -1;
  short = {
    firstShortButtonPress: null,
    counter: 0,
  };
}

function longButtonPress(button_pressed) {
  resultArea.val(resultArea.val() + button_pressed);
}

$(document).ready(function(){
  resultArea = $("#result");
  butonAddClickListener();
});

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
  '9': ['w','x','y','z'],
  '0': [' '],
  '*': ['*'],
  '#': ['#']
}
