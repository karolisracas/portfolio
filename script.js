// NAVBAR SCROLL
// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};
hamburgerToggle();

function scrollFunction() {
  let navbar = document.querySelector('.navbar');

  if (navbar) {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.style.height = "60px";
        navbar.style.fontSize = "1.2em";
        navbar.style.backgroundColor = "#492d15"
      } else {
        navbar.style.height = "100px";
        navbar.style.fontSize = "1.4em";
        navbar.style.backgroundColor = "transparent";
      }
    }
  }
}

function hamburgerToggle() {
  let hamburger = document.querySelector('.hamburger');
  let menu = document.querySelector('.menu-container');

  if (hamburger && menu) {
    hamburger.addEventListener("click", function(){
      menu.classList.toggle('menu-container--active');
    });
  }
}