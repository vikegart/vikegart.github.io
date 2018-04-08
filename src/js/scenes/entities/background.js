class Background {
  constructor(game) {
    this.game = game;
    this.speed = 1;
    this.posY = 0;
    this.posX = 0;
    this.img = new Image();
  }

  reDraw(speed, frame, context, game) {
    this.posY += speed;
    context.drawImage(game.resourses.background, this.posX, this.posY);

    // Draw another image at the top edge of the first image
    context.drawImage(game.resourses.background, this.posX, this.posY - frame.height);

    // If the image scrolled off the screen, reset
    if (this.posY >= frame.height)
      this.posY = 0;
  }

}
export default Background