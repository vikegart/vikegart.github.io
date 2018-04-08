function loadRes() {
  var playerSprite = {
    dmg0: new Image(),
    dmg1: new Image(),
    dmg2: new Image(),
    dmg3: new Image(),
    dmg4: new Image(),
    shadow: new Image()
  }
  playerSprite.dmg0 = './src/res/sprites/player/P38_lvl_1_d0.png';
  playerSprite.dmg1 = './src/res/sprites/player/P38_lvl_1_d1.png';
  playerSprite.dmg2 = './src/res/sprites/player/P38_lvl_1_d2.png';
  playerSprite.dmg3 = './src/res/sprites/player/P38_lvl_1_d3.png';
  playerSprite.dmg4 = './src/res/sprites/player/P38_lvl_1_d4.png';
  playerSprite.shadow.src = './src/res/sprites/player/P38_shadow.png';

  var enemySprite = {
    lvl1: new Image(),
    lvl2: new Image()
  }
  enemySprite.lvl1.src = './src/res/sprites/enemy/enemy.png';
  enemySprite.lvl2.src = './src/res/sprites/enemy/enemy2.png';

  var bulletSprite = new Image();
  bulletSprite.src = './src/res/sprites/bullet/bullet_1.png';

  var background = new Image();
  background.src = './src/res/sprites/backdrop/beach.jpg'
  //TODO: если я тут напишу onload()? => функция сделает ретурн только после подгрузки всех?
  return {
    playerSprite,
    enemySprite,
    bulletSprite,
    background
  }
}

export default loadRes