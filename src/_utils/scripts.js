

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