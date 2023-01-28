"use strict"

let btnText = "Light/Dark";
let ereaderDisplay = document.querySelector(".ereader-display");
let readerHeader = document.createElement("header");
let navWrapper = document.createElement("div");

let nav = document.createElement("nav");
let ul = document.createElement("ul");
let tocUrl = "http://127.0.0.1:5500/api/toc.json";
// let tocUrl = "https://raw.githubusercontent.com/franreyn/mat142-ebook/main/api/toc.json";
// let tocUrl = "https://api.github.com/repos/franreyn/mat142-ebook/contents/api/toc.json";


// Fetch table of contents data via api
const getToc = async () => {
  let tocRes = await fetch(tocUrl);
  let tocData = await tocRes.json();
  return tocData
};

// Dynamically create and add Navigation bar

/// prepend <header>
ereaderDisplay.prepend(readerHeader); 

/// append wrapping <div id="header-wrapper"> to <header>
readerHeader.append(navWrapper);
navWrapper.id = "header-wrapper";

// append show/hide button to <div id="header-wrapper">
let menuBtn = document.createElement("button");
menuBtn.type = "button";
menuBtn.id = "menu-btn";
menuBtn.innerHTML = "Menu";
navWrapper.append(menuBtn);
// show-hide button logic

/// append light/dark button to <div id="header-wrapper">
let lightButton = document.createElement("button");
lightButton.type = "button";
lightButton.id = "light-dark-mode";
lightButton.innerHTML = btnText;
navWrapper.append(lightButton);

//// Dark and light modes
const docBody = document.querySelector("body");
const button = document.querySelector("#light-dark-mode");
let isDarkMode = false;
//// dark-light mode logic
if(button){
button.addEventListener("click", () => {
  docBody.toggleAttribute("darkmode");
}); }

// append <nav> to <div id="header-wrapper">
navWrapper.append(nav);

// append <ul> to <nav>
nav.append(ul);

// display links
const appendElements = async () => {
  const payload = await getToc();
  payload.map((list, index) => {
    let li = document.createElement("li");
    li.innerHTML = `Chapter ${index}`;
    ul.append(li);

    let _ul = document.createElement("ul");
    li.append(_ul);

    list.map((path, index) => {
      let _li = document.createElement("li");
      _ul.append(_li);
      let a = document.createElement("a");
      a.href = path;
      // remove 'chapters' and 'chapters-0-9
      let rmChapters = path.replace(/\/chapters\/chapter-[0-9]\//gi, "");
      let rmHtml = rmChapters.replace(".html", "");

      a.innerHTML = rmHtml;
      _li.append(a);
    });
  });
}
appendElements();

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
  if(toggleBtns[toggleBtn].innerHTML == "[Show Footnotes]") {
    toggleBtns[toggleBtn].innerHTML = "[Hide Footnotes]";
  } else {
    toggleBtns[toggleBtn].innerHTML = "[Show Footnotes]";
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