let btnText = "Light/Dark";
let ereaderDisplay = document.querySelector(".ereader-display");
let readerHeader = document.createElement("header");
let navWrapper = document.createElement("div");
let lightButton = document.createElement("button");
let nav = document.createElement("nav");
let ul = document.createElement("ul");
let li = document.createElement("li");

// Add topnav
// prepend <header>
ereaderDisplay.prepend(readerHeader); 

// append wrapping <div>
readerHeader.append(navWrapper);
navWrapper.id = "header-wrapper";

// append nav
navWrapper.append(nav);

// append <ul>
nav.append(ul);

// append <li>
// ul.append(li);

// Update this to when you add for-loop for nav links
let tempCode = `
<li><a href="/index.html">Home</a></li>
<li><a href="/chapters/chapter-1/Chapter1-CollectingData.html">Ch. 1</a></li>
<li><a href="/chapters/chapter-1/1-1-BasicConcepts.html">1-1</a></li>
<li><a href="/chapters/chapter-1/1-2-SamplingMethods.html">1-2</a></li>
<li><a href="/chapters/chapter-1/1-3-Experiments.html">1-3</a></li>
  `;

ul.innerHTML = tempCode;
//==//

// append light/dark button
navWrapper.append(lightButton);
lightButton.type = "button";
lightButton.id = "light-dark-mode";
lightButton.innerHTML = btnText;

// Dark and light modes
const docBody = document.querySelector("body");
const button = document.querySelector("#light-dark-mode");
let isDarkMode = false;

if(button){
button.addEventListener("click", () => {
  docBody.toggleAttribute("darkmode");
}); }

//Add Font Awesome 
const docHead = document.querySelector("head");
  const fontAwesomeCdn = document.createElement("link");
  fontAwesomeCdn.setAttribute("rel", "stylesheet");
  fontAwesomeCdn.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css");
  docHead.appendChild(fontAwesomeCdn);


// Accordions - show/hide script
const getAccords = document.querySelectorAll(".accordion");
getAccords.forEach((accord) => {
  let btn = accord.querySelector("button");
  let body = btn.nextElementSibling;
  btn.addEventListener("click", () => {
    body.toggleAttribute("hidden");
  });
});

// Footnotes toggle
const toggleBtns = document.querySelectorAll(".toggle-btn, .toggle-footnotes");

const changeFootnotesText = (toggleBtns,toggleBtn) => {
  if(toggleBtns[toggleBtn].innerHTML == "[Show Attributions]") {
    toggleBtns[toggleBtn].innerHTML = "[Hide Attributions]";
  } else {
    toggleBtns[toggleBtn].innerHTML = "[Show Attributions]";
  }
}

if (document.querySelector(".toggle-btn") || document.querySelector(".toggle-footnotes")) {

  for (let toggleBtn = 0; toggleBtn < toggleBtns.length; toggleBtn++) {
    // Add tabindex
    toggleBtns[toggleBtn].setAttribute("tabindex", "0");

    // Show/hide on click
    toggleBtns[toggleBtn].addEventListener("click", () => {      
      toggleBtns[toggleBtn].nextElementSibling.classList.toggle("show");      
      changeFootnotesText(toggleBtns,toggleBtn)
    })

    // Show/hide on enter for users who use tab
    toggleBtns[toggleBtn].addEventListener("keydown", (enter) => {
      if (enter.keyCode === 13) {
        toggleBtns[toggleBtn].nextElementSibling.classList.toggle("show");
        changeFootnotesText(toggleBtns,toggleBtn)
      }
    })
  }
}