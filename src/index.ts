// stylesheets for bundler
import '../src/style/style.scss';

import '@fortawesome/fontawesome-free';

// setup glide carousel
import Glide from '@glidejs/glide';

new Glide('.glide', {autoplay: 10000}).mount();

// some DOM constants
const body           = document.getElementsByTagName("body")[0];
const darkModeToggle = document.getElementById("darkmode-toggle");

// wait until everything is loaded
// this isn't working how I'd like
document.addEventListener("load", () => {
  body.style.opacity = "1";
});


// setup darkmode
let darkModeActive = localStorage.getItem("darkModeActive") == "true";

body.classList.add(darkModeActive ? "dark-mode" : "light-mode");

darkModeToggle?.addEventListener("click", (event) => {
  event.preventDefault();

  if (body.classList.contains("dark-mode")) {
    body.classList.replace("dark-mode", "light-mode");
  }
  else {
    body.classList.replace("light-mode", "dark-mode");
  }

  darkModeActive = !darkModeActive;
  localStorage.setItem("darkModeActive", `${darkModeActive}`);
});

