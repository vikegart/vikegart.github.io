import IntroScene from '../scenes/intro';
import MenuScene from '../scenes/menu';
import GameScene from '../scenes/mainGame';
import EndScene from '../scenes/endGame';
import loadRes from '../../js/helpers/resourseManager'

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.fps = 60; //можно читать с конфига

    this.IntroScene = IntroScene;
    this.MenuScene = MenuScene;
    this.GameScene = GameScene;
    this.EndScene = EndScene;
    this.resourses = loadRes();

    this.setScene(IntroScene);
    this.initInput();
    this.start();
  }

  initInput() {
    // save keys state
    this.keys = {};
    document.addEventListener('keydown', e => { this.keys[e.which] = true; });
    document.addEventListener('keyup', e => { this.keys[e.which] = false; });
  }
  checkKeyPress(keyCode) {
    // handle key press + release
    let isKeyPressed = !!this.keys[keyCode];
    this.lastKeyState = this.lastKeyState || {};

    // disallow key event from previous scene
    if (typeof this.lastKeyState[keyCode] === 'undefined') {
      this.lastKeyState[keyCode] = isKeyPressed;
      return false;
    }

    // allow press only when state was changed
    if (this.lastKeyState[keyCode] !== isKeyPressed) {
      this.lastKeyState[keyCode] = isKeyPressed;
      return isKeyPressed;
    } else {
      return false;
    }
  }
  setScene(Scene) {
    this.activeScene = new Scene(this);
  }
  update(dt) {
    this.activeScene.update(dt);
  }
  render(dt) {
    this.ctx.save();
    this.activeScene.render(dt, this.ctx, this.canvas);
    this.ctx.restore();
  }
  start() {
    let last = performance.now(),
      step = 1 / this.fps,
      dt = 0,
      now;

    let frame = () => {
      now = performance.now();
      dt = dt + (now - last) / 1000;
      while (dt > step) {
        dt = dt - step;
        this.update(step);
      }
      last = now;

      this.render(dt);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
}


export default Game