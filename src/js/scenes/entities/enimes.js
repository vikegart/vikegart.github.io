class Enemy {
  constructor(game) {
    this.game = game;
    this.speed = 2;
    this.posY = 0;
    this.posX = 0;
    this.img = new Image();
    this.health = 1;
    this.direction = 'down';
    this.lvl = 0;
  }

  moveDown() {
    this.posY += this.speed;
  }
  damage(damageVal) {
    this.health -= damageVal;
  }
  spawnRandom(frame) {
    this.posX = Math.random() * (frame.width - this.img.width);
  }
}
export default Enemy