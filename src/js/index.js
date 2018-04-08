
import Game from "./frames/game";

let canvasEl = document.querySelector('canvas');
// Main Game Wrapper/Toggler
document.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 84) { // t
    toggleFullscreen();
  }
});

function toggleFullscreen() {
  if (document.webkitIsFullScreen) {
    document.webkitCancelFullScreen();
  }
  else {
    if (canvasEl.webkitRequestFullScreen) {
      canvasEl.webkitRequestFullScreen();
    }
    else {
      canvasEl.mozRequestFullScreen();
    }
  }
}

// launch game
let game = new Game(canvasEl);
