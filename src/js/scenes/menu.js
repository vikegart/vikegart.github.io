class MenuScene {
  constructor(game) {
    // set default values
    this.game = game;
    this.opacityDirection = 1;
    this.menuActiveOpacity = 0;
    this.menuIndex = 0;
    this.menuTitle = 'Game Menu';
    this.menuItems = [
      'Start',
      'Intro',
      'Exit'
    ];
  }
  update(dt) {
    // calculate active menu item opacity
    let opacityValue = this.menuActiveOpacity + dt * this.opacityDirection;
    if (opacityValue > 1 || opacityValue < 0) this.opacityDirection *= -1;
    this.menuActiveOpacity += dt * this.opacityDirection;

    // menu navigation
    if (this.game.checkKeyPress(40) || this.game.checkKeyPress(83)) { // DOWN arrow or S
      this.menuIndex++;
      this.menuIndex %= this.menuItems.length;
    } else if (this.game.checkKeyPress(38) || this.game.checkKeyPress(87)) { // UP arrow or W
      this.menuIndex--;
      if (this.menuIndex < 0) this.menuIndex = this.menuItems.length - 1;
    }

    // menu item selected
    if (this.game.checkKeyPress(13) || this.game.checkKeyPress(32)) { //enter or space
      switch (this.menuIndex) {
        case 0: this.game.setScene(this.game.GameScene); break;
        case 1: this.game.setScene(this.game.IntroScene); break;
        case 2: this.game.setScene(this.game.EndScene); break;
      }
    }
  }
  render(dt, ctx, canvas) {
    // fill menu background
    ctx.fillStyle = '#0277bd';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw menu title
    ctx.font = '60px Helvetica';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.menuTitle, (canvas.width - ctx.measureText(this.menuTitle).width) / 2, 20);

    // draw menu items
    const itemHeight = 50, fontSize = 30;
    ctx.font = fontSize + 'px Helvetica';
    for (const [index, item] of this.menuItems.entries()) {
      if (index === this.menuIndex) {
        ctx.globalAlpha = this.menuActiveOpacity;
        ctx.fillStyle = '#089cd3';
        ctx.fillRect(0, canvas.height / 2 + index * itemHeight, canvas.width, itemHeight);
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = '#fff';
      ctx.fillText(item, (canvas.width - ctx.measureText(item).width) / 2, canvas.height / 2 + index * itemHeight + (itemHeight - fontSize) / 2);
    }
  }
}

export default MenuScene