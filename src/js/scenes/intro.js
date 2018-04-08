class IntroScene {
  constructor(game) {
    this.logoRevealTime = 2;
    this.textTypingTime = 5;
    this.sceneDisplayTime = 10;

    this.elapsedTime = 0;
    this.bigText = 'Tempest Shadow 🛩';
    this.infoText = 'Use WASD for move and SPACE for shoot... ';
    this.game = game;
  }
  update(dt) {
    this.elapsedTime += dt;

    // switch to next scene (by timer or if user want to skip it)
    if (this.elapsedTime >= this.sceneDisplayTime || this.game.checkKeyPress(13)) {
      this.game.setScene(this.game.MenuScene);
    }
  }
  render(dt, ctx, canvas) {
    // fill background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw big logo text
    ctx.globalAlpha = Math.min(1, this.elapsedTime / this.logoRevealTime);
    ctx.font = '80px Helvetica';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.bigText, (canvas.width - ctx.measureText(this.bigText).width) / 2, canvas.height / 2);

    // draw typing text
    if (this.elapsedTime >= this.logoRevealTime) {
      let textProgress = Math.min(1, (this.elapsedTime - this.logoRevealTime) / this.textTypingTime);
      ctx.font = '20px Helvetica';
      ctx.fillStyle = '#bbb';
      ctx.fillText(this.infoText.substr(0, Math.floor(this.infoText.length * textProgress)), (canvas.width - ctx.measureText(this.infoText).width) / 2, canvas.height / 2 + 80);
    }
  }
}

export default IntroScene