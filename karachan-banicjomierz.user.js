// ==UserScript==
// @name        Karaczan Banicjomierz
// @match       *://karachan.org/*
// @grant       none
// @version     1.0
// @author      cccpaluch
// @description 22.01.2022, 00:58:00
// ==/UserScript==

var bannedText = '<title>Banned</title>';
var checkInterval = 10000; //sekundy
var div = null;

function changeDiv (banned) {
  if (banned) {
    div.innerHTML = "Jest ban";
    div.style.background = "red";
  } else {
    div.innerHTML = "Nie ma bana";
    div.style.background = "green";
  }
}

function fetchAndSetDiv () {
		fetch('https://karachan.org/banned.php').then(
        	function (u) { 
            return u.text(); 
          }
      	).then(
        	function (text) { 
            //console.log(text)
            if (text.includes(bannedText)) {
              changeDiv(true);
            } else {
              changeDiv(false);
            }
          }
      	);
}

function createDiv() {
  div = document.createElement("div");
  div.style.width = "60px";
  div.style.height = "10px";
  div.style.background = "green";
  div.style.color = "white";
  div.innerHTML = "Nie ma bana";
  div.classList += 'group';

  document.getElementById("tab-boardlink").appendChild(div);
}

function main() {
  createDiv();
  setInterval(fetchAndSetDiv, checkInterval);
}

window.addEventListener('load', function() {
    main();
}, false);
