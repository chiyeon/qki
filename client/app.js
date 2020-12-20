const input = document.getElementById("input");
const passage = document.getElementById("passage");
const timer = document.getElementById("timer");
const results =  document.getElementById("results");
//"Do you like monkeys? I particularily enjoy the company of monkeys, in fact I much prefer them over that of the human touch.";
var passageText = "I like men.";
var words = passageText.split(" ");
var currentWord = 0;
var timerRunning = false;
var currentTime = 0;

var startTime = Date.now();

var interval = setInterval(function() {
    
}, 100);

function CompletePassage() {
   input.placeholder = "";

   results.innerHTML = `passage length: ${words.length} words<br>time: ${currentTime} seconds<br>score: ${Math.round(words.length/(currentTime/60))} wpm`
}

function Update() {
   if(currentWord == words.length) {
      timerRunning = false;
      clearInterval(interval);
      CompletePassage();
      return;
   }

   var nextWord =  words[currentWord];
   if(currentWord != words.length -  1)
      nextWord += " ";

   if(currentWord == 0 && !timerRunning) {
      if(input.value != "") {
         timerRunning = true;
         startTime = Date.now();
      }
   }

   if(timerRunning) {
      var elapsedTime = Date.now() - startTime;
      currentTime = (elapsedTime / 1000).toFixed(3)
      timer.innerHTML = currentTime;
   }

   if(input.value == nextWord) {
      NextWord();
   }
}

function NextWord() {
   currentWord++;
   input.placeholder = words[currentWord];
   input.value = "";
}

input.placeholder = words[currentWord];
passage.textContent = passageText;
setInterval(Update, 1000/100);