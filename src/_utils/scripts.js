"use strict"

// Variables
const btnContent = "<div class=\"light-dark-icons\"><i class=\"fa-solid fa-sun icon-lrg\"></i><i class=\"fa-solid fa-moon icon-lrg\"></i></div>";
const navToggleText = "<div id=\"nav-icon\"><span></span><span></span><span></span></div>";
const backButtonContent = "<i class=\"fa-solid fa-chevron-left\"></i>";
const forwardButtonContent = "<i class=\"fa-solid fa-chevron-right\"></i>";
const fontAwesomeCdn = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css";
const localTocUrl = "http://127.0.0.1:5500/api/toc.json";
const tocUrl = "https://raw.githubusercontent.com/franreyn/mat142-ebook/main/api/toc.json";
const docBody = document.querySelector("body");
const docHead = document.querySelector("head");
const ereaderArea = document.querySelector(".ereader-display");

// (0) Fetch table-of-contents data via api
const getToc = async () => {
  let tocRes = await fetch(tocUrl);
  let tocData = await tocRes.json();
  return tocData
};

// (1) create and prepend <header>
const ereaderDisplay = document.querySelector(".ereader-display");
const readerHeader = document.createElement("header");
ereaderDisplay.prepend(readerHeader); 

// (2) create and append <div id="navigation">
const navWrapper = document.createElement("div");
navWrapper.id = "navigation";
readerHeader.append(navWrapper);

// (3) create and append <div class="page-controller">
const pageController = document.createElement("div");
pageController.classList.add("page-controller");
pageController.classList.add("no-print");
navWrapper.append(pageController);

// (3a) create and append <div class="nav-controls">
const navControls = document.createElement("div");
navControls.classList.add("nav-controls");
pageController.append(navControls);

// (4) create and append menu-toggle button
const menuBtn = document.createElement("button");
menuBtn.type = "button";
menuBtn.classList.add("nav-toggle");
menuBtn.innerHTML = navToggleText;
navControls.append(menuBtn);

// (4a) logic for menu-toggle button
menuBtn.addEventListener("click", () => {
  navWrapper.toggleAttribute("expanded");
  nav.toggleAttribute("expanded");
});

// (5) create and append "dark mode" button
const lightButton = document.createElement("button");
lightButton.type = "button";
lightButton.classList.add("darkmode-toggle");
lightButton.innerHTML = btnContent;
navControls.append(lightButton);

// (5a) darkmode logic
const darkModeBtn = document.querySelector(".darkmode-toggle");
const darkMode = localStorage.getItem("isDarkMode");
// if "isDarkMode" is null, make it false
if (darkMode === null) {
  localStorage.setItem("isDarkMode", "false");
};
// if "isDarkMode" is true, add attribute
if (localStorage.getItem("isDarkMode") === "true") {
  docBody.setAttribute("darkmode", "");
}
// (5b) click event for darkmode button
darkModeBtn.addEventListener("click", () => {
  // if "isDarkMode" is false 
  if (localStorage.getItem("isDarkMode") === "false") {
    localStorage.setItem("isDarkMode", "true");
    docBody.toggleAttribute("darkmode");
    // if "isDarkMode" is true
  } else {
    localStorage.setItem("isDarkMode", "false");
    docBody.toggleAttribute("darkmode");
 }
});

// (6) create and append resizing button
const resizer = document.createElement("button");
resizer.type = "button";
resizer.setAttribute("data-text", "Adjust page width");
resizer.classList.add("resizer");
navControls.append(resizer);

const widthLarge = localStorage.getItem("isWidthLarge");
// if "isWidthLarge" is null, make it false
if (widthLarge === null) {
  localStorage.setItem("isWidthLarge", "false");
};

// if "isWidthLarge" is true, add attribute
if (localStorage.getItem("isWidthLarge") === "true") {
  ereaderArea.setAttribute("widthLarge", "");
  resizer.toggleAttribute("resized");
}

// (6b) click event for darkmode button
resizer.addEventListener("click", () => {
  // if "isWidthLarge" is false 
  if (localStorage.getItem("isWidthLarge") === "false") {
    localStorage.setItem("isWidthLarge", "true");
    ereaderArea.toggleAttribute("widthLarge");
    resizer.toggleAttribute("resized");

    // if "isWidthLarge" is true
  } else {
    localStorage.setItem("isWidthLarge", "false");
    ereaderArea.toggleAttribute("widthLarge");
    resizer.toggleAttribute("resized");
 }
});

// (6b) add tooltip to resizer 
const resizerTooltip = document.createElement("span");
resizerTooltip.innerText = "Adjust page width";
resizerTooltip.classList.add("tooltip");
navControls.append(resizerTooltip);

const showTooltip = () => {
  let tooltip = document.querySelector(".tooltip");
  tooltip.style.opacity = "1";
  tooltip.style.transition = "opacity .5s";
}

const hideTooltip = () => {
  let tooltip = document.querySelector(".tooltip");
  tooltip.style.opacity = "0";
  tooltip.style.transition = "opacity .5s";
}

resizer.addEventListener("mouseover", showTooltip);
resizer.addEventListener("mouseout", hideTooltip);




// (7) create and append <nav> to <div id="navigation">
const nav = document.createElement("nav");
navWrapper.append(nav);

// (7a) create and append <ul> to <nav>
const ul = document.createElement("ul");
nav.append(ul);

// (7b) append navigation from toc.json
const appendNavigation = async () => {
  // import toc data
  const toc = await getToc();
  const homePage = document.createElement("li");
  homePage.innerHTML = '<a href="/" class="chapter-btn"> Introduction</a>';
  ul.append(homePage);
  // loop through toc
  toc.forEach((list, index) => {
    const li = document.createElement("li");
    // chapter buttons
    li.innerHTML = `<h3 class="chapter-btn">Chapter ${index}</h3>`;
    ul.append(li);
    const _ul = document.createElement("ul");
    li.append(_ul);
    // loop through individual lists of toc
    list.forEach((path) => {
      const _li = document.createElement("li");
      _li.classList.add("chapter")
      _ul.append(_li);
      const a = document.createElement("a");
      a.href = path;
      // remove 'chapters' 
      const rmChapters = path.replace(/\/chapters\/chapter-[0-9]\//gi, "");
      // remove '.html'
      const rmHtml = rmChapters.replace(".html", "");
      // replace '-' with '.'
      const rmDash = rmHtml.replace(/-/g, ".");
      // replace '_' with ' '
      const finalOutput = rmDash.replace(/_/g, " ");
      // add file name (plus above changes) as text for <a>
      a.innerHTML = finalOutput;
      _li.append(a);
    });
  }); 
  // (7c) loop through all nav chapter-buttons, when clicked toggle attribute on next-sibling
  const navChaptBtn = document.querySelectorAll(".chapter-btn");
  navChaptBtn.forEach((btn) => {
    btn.addEventListener("click", function() {
      const __ul = this.nextElementSibling;
      __ul.toggleAttribute("expanded");
    });
  });
}
appendNavigation();

// (8) add font-awesome to <head>
const fontAwesome = document.createElement("link");
fontAwesome.setAttribute("rel", "stylesheet");
fontAwesome.setAttribute("href", fontAwesomeCdn);
docHead.appendChild(fontAwesome);

// (9) accordions - show/hide script
const getAccords = document.querySelectorAll(".accordion");
getAccords.forEach((accord) => {
  let accordBtn = accord.querySelector("button");
  let accordBody = accordBtn.nextElementSibling;
  accordBtn.addEventListener("click", () => {
    accordBody.toggleAttribute("hidden");
  });
});

// (10) footnotes toggle
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

// (11) Get location of current URL to highlight active link 
let fullUrl = window.location.href;
let currentUrl = fullUrl.split("/").pop();
currentUrl = currentUrl + ".html";

window.onload = () => {

  // (11a) Parse and find URL in navigation that matches that link 
  const links = document.querySelectorAll("nav a");
  const chapters = document.querySelectorAll(".chapter-btn");

  // Convert node list into array
  const linkList = Array.prototype.slice.call(links);
  const chapterList = Array.prototype.slice.call(chapters);

  //If it is the home page highlight the first page
  if(fullUrl == "https://pimaonline-mat142-ebook.netlify.app/") {
    chapterList[0].classList.add("activeChapter")
  } else {

  // Cut off end of URL
  let navHrefs = [];
  for(let linkIndex = 0; linkIndex < linkList.length;linkIndex++){
    let  newLinkHref = linkList[linkIndex].href.split("/").pop();
    navHrefs.push(newLinkHref);

    //Convert hrefs to lowercase
    let lowerCaseHrefs = navHrefs.map(url => url.toLowerCase());

    // Add class to chapter heading
    if(currentUrl.charAt(0) == lowerCaseHrefs[linkIndex].charAt(0)) {
      let activeChapter = Number(currentUrl.charAt(0)) + 1;
      chapterList[activeChapter].classList.add("activeChapter")
    }

    // Add class to chapter
    if(lowerCaseHrefs[linkIndex] == currentUrl) {
      links[linkIndex].classList.add("activeUrl");
    }
   }
  }
  
  
  // (12) Expand or collapse navigation
  let navIsOpen = false;
  const menuNav = document.querySelector(".nav-toggle");
  menuNav.addEventListener("click", () => {
    
  removeTabbing();

  if(navIsOpen) {
    navIsOpen = !navIsOpen;
    menuNav.toggleAttribute("open");
  } else {
    navIsOpen = !navIsOpen;
    menuNav.toggleAttribute("open");
  }
  });
  menuNav.addEventListener("keypress", (e) => {
    if(e.key== "Enter"){

      removeTabbing();

      if(navIsOpen) {
        navIsOpen = !navIsOpen;
        menuNav.toggleAttribute("open");
      } else {
        navIsOpen = !navIsOpen;
        menuNav.toggleAttribute("open");
      }
    }
  });
 
  // (12b) Remove tabbing from navigation if closed
  const navLinks = document.querySelectorAll("#navigation a"); 
  const removeTabbing = () => {
    if(!navIsOpen) {
      navLinks.forEach((link) => {
        link.tabIndex = 0;
      });
    } else {
      navLinks.forEach((link) => {
        link.tabIndex = -1;
      });
    }
  }
} // End of onload functions

// (13) toggle hints and answers
const toggleHints = async () => {
  const toggleHints = document.querySelectorAll(".js-expandmore");
  
  toggleHints.forEach((toggle) => {

    toggle.tabIndex = 0;

    toggle.addEventListener("click", function() {
      const toggleContent = this.nextElementSibling;
      toggleContent.toggleAttribute("show");
    });

    toggle.addEventListener("keydown", function(e) {
      if(e.key == "Enter") {
      const toggleContent = this.nextElementSibling;
      toggleContent.toggleAttribute("show");
      }
    });
  });
} 
toggleHints();

// (14) add back and forwards buttons
const pageSwitch = document.createElement("div");
pageSwitch.classList.add("page-switch")
pageController.append(pageSwitch); 


// (14a) create and append back and forward buttons
const backButton = document.createElement("button");
backButton.type = "button";
backButton.classList.add("back-btn");
backButton.innerHTML = backButtonContent;
pageSwitch.append(backButton); 

const forwardButton = document.createElement("button");
forwardButton.type = "button";
forwardButton.classList.add("forward-btn");
forwardButton.innerHTML = forwardButtonContent;
pageSwitch.append(forwardButton); 


// (14a) call function when one of the buttons are clicked

const changePage = (direction) => {

  let links = document.querySelectorAll("nav a");

  // Convert node list into array
  let linkList = Array.prototype.slice.call(links);

  if(currentUrl == ".html") {
    if(direction == "forward") {
      window.location.href = "https://pimaonline-mat142-ebook.netlify.app/chapters/chapter-0/0-0_introduction";
    } else {
    }
  } else {

    // Cut off end of URL
    let navHrefs = [];
    for(let linkIndex = 0; linkIndex < linkList.length;linkIndex++){
      let  newLinkHref = linkList[linkIndex].href.split("/").pop();
      navHrefs.push(newLinkHref);

      //Convert hrefs to lowercase
      let lowerCaseHrefs = navHrefs.map(url => url.toLowerCase());


      // If the page matches the current one
      if(lowerCaseHrefs[linkIndex] == currentUrl) {

        // Go back or forwards one link in navigation
        if(direction == "back") {
          window.location.href = links[linkIndex - 1];
        } else {
          window.location.href = links[linkIndex + 1];
        }
      }
    }
  }
}

backButton.addEventListener("click", () => {
  let direction = "back"
  changePage(direction)

})

forwardButton.addEventListener("click", () => {

  let direction = "forward"
  changePage(direction)

});
