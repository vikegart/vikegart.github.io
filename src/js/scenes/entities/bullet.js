class Bullet {
  constructor(game, posX, posY, direction, speed) {
    this.game = game;
    this.speed = speed;
    this.posY = posY;
    this.posX = posX;
    this.img = new Image();
    this.direction = direction;
    this.damageVal = 1;
  }

  fly(speed, direction) {
    if (direction == 'up') {
      this.posY -= speed;
    }
    if (direction == 'down') {
      this.posY += speed;
    }
  }

}
export default Bullet