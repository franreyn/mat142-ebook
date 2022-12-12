

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