const panel = document.getElementById("panel");
const input = document.getElementById("input");
const passage = document.getElementById("passage");
const timer = document.getElementById("timer");
const results =  document.getElementById("results");
//"Do you like monkeys? I particularily enjoy the company of monkeys, in fact I much prefer them over that of the human touch.";
var passageText = "While we were having fun, we didn't realize what we were really doing: making memories we'd look back upon.";
var passageAuthor;
var words;
var currentWord = 0;
var timerRunning = false;
var currentTime = 0;
var startTime;

function CompletePassage() {
   input.placeholder = "";
   panel.style.opacity = 0;
   results.style.opacity = 1;

   results.innerHTML = `passage length: ${words.length} words<br>time: ${currentTime} seconds<br>score: ${Math.round(words.length/(currentTime/60))} wpm<br>quote by ${passageAuthor}.<br>courtesy of type.fit/api/quotes`;
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

   for(var i = 0; i < input.value.length; i++) {
      if(input.value[i] != nextWord[i]) {
         // change color of mark to red
         passage.getElementsByTagName("mark")[0].style.backgroundColor = "#e05141";
      } else {
         passage.getElementsByTagName("mark")[0].style.backgroundColor = "#ffd369";
      }
   }

   if(input.value == nextWord) {
      NextWord();
   }
}

function HighlightCurrentWord() {
   passage.innerHTML = "";
   for(var i = 0; i < words.length; i++) {
      if(i == currentWord)
         passage.innerHTML += `<mark>${words[i]}</mark>`;
      else {
         passage.innerHTML += words[i];
      }
      if(i != words.length - 1)
         passage.innerHTML += " ";
   }
}

function NextWord() {
   currentWord++;
   input.placeholder = words[currentWord];
   input.value = "";
   HighlightCurrentWord();
}

function NewQuote() {
   fetch('https://type.fit/api/quotes')
   .then(response => response.json())
   .then(function(data) {
      var quote = data[Math.floor(Math.random() * data.length)];

      panel.style.opacity = 1;
      results.style.opacity = 0;
      passageAuthor = quote.author;
      passageText = quote.text;
      words = passageText.split(" ");
      currentWord = 0;
      input.value = "";
      input.placeholder = words[currentWord];
      results.textContent = "";
      timerRunning = false;
      currentTime = 0;
      timer.textContent = "0.0";
      HighlightCurrentWord();
      interval = setInterval(Update, 1000/100);
   });
}

NewQuote();