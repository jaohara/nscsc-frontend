// stylesheets for bundler
import '../src/style/style.scss';

import '@fortawesome/fontawesome-free';

// setup glide carousel
import Glide from '@glidejs/glide';
new Glide('.glide', {autoplay: 10000}).mount();

// some DOM constants
const body           = document.getElementsByTagName("body")[0];
const pageWrapper    = document.getElementById("page-wrapper")!;
const pageBody       = document.getElementById("page-body-wrapper")!;

const darkModeToggle = document.getElementById("darkmode-toggle");
const fadeOutToggle  = document.getElementById("fadeout");
const navLinks       = document.getElementsByClassName("nav-link");
const logoLink       = document.getElementById("logo-link") as HTMLAnchorElement;

// wait until everything is loaded
window.addEventListener("load", () => {
  pageWrapper.style.opacity = "1";
});




// setup nav transitions
for (let link of navLinks) {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    let link = <HTMLAnchorElement> event.target;

    let pageWrapperCallback = () => {
      fetch(link.href)
      .then(response => response.text())
      .then(data =>  data)
      .then(data => {
        pageWrapper.removeEventListener("transitionend", pageWrapperCallback);
        pageBody.innerHTML = data;
        pageWrapperOpacityToggle();
      });
    }

    pageWrapperOpacityToggle();
    pageWrapper.addEventListener("transitionend", pageWrapperCallback);
  });
}

logoLink?.addEventListener("click", (event) => {
  event.preventDefault();

  // man, I don't like how this is reused, but I don't know how else to do this.
  let pageWrapperCallback = () => {
    fetch(logoLink.href)
    .then(response => response.text())
    .then(data =>  data)
    .then(data => {
      pageWrapper.removeEventListener("transitionend", pageWrapperCallback);
      pageBody.innerHTML = data;
      new Glide('.glide', {autoplay: 10000}).mount();

      setTimeout(() => pageWrapperOpacityToggle(), 500);
    });
  }

  pageWrapperOpacityToggle();
  pageWrapper.addEventListener("transitionend", pageWrapperCallback);
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

fadeOutToggle?.addEventListener("click", (event) => {
  event.preventDefault();

  console.log(pageWrapper.style.opacity);

  pageWrapperOpacityToggle();
});

function pageWrapperOpacityToggle() {
  pageWrapper.style.opacity = pageWrapper.style.opacity === "1" ? "0" : "1";
}