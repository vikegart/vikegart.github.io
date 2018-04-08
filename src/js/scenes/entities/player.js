class Player {
  constructor(game) {
    this.game = game;
    this.speed = 6;
    this.posY = 0;
    this.posX = 0;
    this.img = new Image();
    this.health = 6;
    this.direction = 'up';
  }

  moveLeft(speed) {
    this.speed = speed;
    this.posX -= this.speed;
  }
  moveRight(speed) {
    this.speed = speed;
    this.posX += this.speed;
  }
  moveUp(speed) {
    this.speed = speed;
    this.posY -= this.speed;
  }
  moveDown(speed) {
    this.speed = speed;
    this.posY += this.speed;
  }
  damage(damageVal) {
    this.health -= damageVal;
  }
}
export default Player