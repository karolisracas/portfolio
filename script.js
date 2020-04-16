// NAVBAR SCROLL
// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  let navbar = document.querySelector('.navbar');

  if (navbar) {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      navbar.style.height = "60px";
      navbar.style.fontSize = "1.2em";
      navbar.style.backgroundColor = "#d7ccc8";
    } else {

      navbar.style.height = "100px";
      navbar.style.fontSize = "1.4em";
      navbar.style.backgroundColor = "transparent";
    }
  } 
}