// (5a) darkmode logic
let darkModeSetting = localStorage.getItem("isDarkMode");
// if "isDarkMode" is null, make it false
if (darkModeSetting === null) {
  localStorage.setItem("isDarkMode", "false");
};
// if "isDarkMode" is true, add attribute
if (localStorage.getItem("isDarkMode") === "true") {
  document.documentElement.setAttribute("darkmode", "");
}