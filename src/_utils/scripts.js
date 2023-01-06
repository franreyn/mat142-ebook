

// Dark and light modes
const docBody = document.querySelector("body");
const button = document.querySelector("#light-dark-mode");
let isDarkMode = false;
button.addEventListener("click", () => {
  docBody.toggleAttribute("darkmode");
});

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