import Player from './entities/player'
import Bullet from './entities/bullet'
import Enemy from './entities/enimes'
import Background from './entities/background'

import inFrame from '../helpers/inFrameChecker'
import isCollade from '../helpers/colisionChecker'
import logicAI from '../helpers/logicAI'

class GameScene {
  constructor(game) {
    this.game = game;
    this.height = game.canvas.height;
    this.width = game.canvas.width;
    this.frame = {
      width: this.width,
      height: this.height
    }
    this.player = new Player(game);
    this.background = new Background(game);

    this.bullets = [];
    this.enemies = [];
    this.spawn();
    this.lvl = 0;
    this.kills = 0;

    if (process.env.NODE_ENV !== 'production') {
      console.log(this.player);
    }

    this.isPause = false;
  }
  spawn() {
    this.player.posX = this.width / 2; //centure
    this.player.posY = this.height - this.height / 100 * 10; //centure
    this.player.img.src = this.game.resourses.playerSprite.dmg0;
  }

  togglePause() {
    if (this.isPause) {
      this.isPause = false;
    } else {
      this.isPause = true;
    }
  }

  update(dt) {
    if (this.game.checkKeyPress(80)) {
      this.togglePause();
    }
    if (!this.isPause) {
      this.lvl = this.kills;
      let player = this.player;
      //check collision between enemies and bullets\player
      for (let i = 0; i < this.enemies.length; i++) {
        let enemy = this.enemies[i];
        for (let j = 0; j < this.bullets.length; j++) {
          let bullet = this.bullets[j];
          if (isCollade(bullet, enemy)) {
            this.kills += 1;
            if (j == 0) {
              this.bullets.shift();
            }
            this.bullets.splice(j, j);
            if (i == 0) {
              this.enemies.shift();
            }
            this.enemies.splice(i, i);
          }
          if (inFrame.bottomBorder(this.frame, enemy)) {
            this.enemies.splice(i, i);
            if (i == 0) {
              this.enemies.shift();
            }
          }
        }
        if (isCollade(player, enemy)) {
          this.kills += 1;
          if (i == 0) {
            this.enemies.shift();
          }
          this.enemies.splice(i, i);
          player.damage(enemy.lvl);
        }

        //shoot enemy
        if (logicAI.canIShoot()) {
          let bullet = new Bullet(
            this.game,
            enemy.posX + enemy.img.width / 2 - 8, //original sprite isn't centered
            enemy.posY + enemy.img.height + 14, //to provide self kill
            enemy.direction,
            enemy.speed * 3);
          bullet.img.src = this.game.resourses.bulletSprite.src;
          this.bullets.push(bullet);
        }
        enemy.moveDown(enemy.speed);
      }

      //enemies spawn
      if (logicAI.canIClone(this.lvl)) {
        let enemy = new Enemy(this.game);
        enemy.lvl = 1;
        enemy.img = this.game.resourses.enemySprite.lvl1;
        enemy.spawnRandom(this.frame);
        this.enemies.push(enemy);
      }

      if (logicAI.canICloneBoss(this.lvl)) {
        let enemy = new Enemy(this.game);
        enemy.lvl = 2;
        enemy.img.src = this.game.resourses.enemySprite.lvl2.src;
        enemy.spawnRandom(this.frame);
        this.enemies.push(enemy);
      }

      //user controls
      this.game.keys['27'] && this.game.setScene(this.game.MenuScene); // ESC to menu
      if (this.game.checkKeyPress(13)) { //cheatButton (enter)
        player.health = 5;
      }
      if (!inFrame.leftBorder(this.frame, player)) {
        this.game.keys['65'] && player.moveLeft(player.speed); // A
      }
      if (!inFrame.rightBorder(this.frame, player)) {
        this.game.keys['68'] && player.moveRight(player.speed); // D
      }
      if (!inFrame.topBorder(this.frame, player)) {
        this.game.keys['87'] && this.player.moveUp(player.speed); // W
      };
      if (!inFrame.bottomBorder(this.frame, player)) {
        this.game.keys['83'] && this.player.moveDown(player.speed); // S
      };
      if (this.game.checkKeyPress(32)) {
        let bullet = new Bullet(
          this.game,
          player.posX + player.img.width / 2 - 8, //original sprite isn't centered
          player.posY - 18, //to provide self kill
          player.direction,
          player.speed * 1.2); //for debagging, TODO: player.speed*2;
        bullet.img.src = this.game.resourses.bulletSprite.src;
        this.bullets.push(bullet);
      };

      //check collision between player and bullets
      if (this.bullets.length > 0) {
        for (let i = 0; i < this.bullets.length; i++) {
          let bullet = this.bullets[i];
          if (inFrame.onScreen(this.frame, bullet)) {
            bullet.fly(bullet.speed, bullet.direction);
            if (isCollade(player, bullet)) {
              player.damage(bullet.damageVal);
              this.bullets.splice(i, i);
              if (i == 0) {
                this.bullets.shift()
              }

              //swithc player costume
              switch (player.health) {
                case 6:
                  break;
                case 5:
                  player.img.src = this.game.resourses.playerSprite.dmg1;
                  player.speed = 5;
                  break;
                case 4:
                  player.img.src = this.game.resourses.playerSprite.dmg2;
                  player.speed = 4;
                  break;
                case 3:
                  player.img.src = this.game.resourses.playerSprite.dmg3;
                  player.speed = 3;
                  break;
                case 2:
                  player.img.src = this.game.resourses.playerSprite.dmg4;
                  player.speed = 2;
                  break;
                case 1:
                  player.speed = 1;
                  break;
                case 0:
                  this.game.setScene(this.game.EndScene);
                  break;
                default:
                  this.game.setScene(this.game.EndScene);
              }
            }
          } else {
            this.bullets.splice(i, i);
            if (i == 0) {
              this.bullets.shift()
            }
          }
        }
      }
    }
  }
  render(dt, ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!this.isPause) {
      this.background.reDraw(1, this.frame, ctx, this.game);
    } else {
      const pauseText = 'Game Paused';
      ctx.textBaseline = 'top';
      ctx.font = '100px Helvetica';
      ctx.fillStyle = '#ff4024';
      ctx.fillText(pauseText, (canvas.width - ctx.measureText(pauseText).width) / 2, canvas.height / 2 - 50);
    }
    //render player
    ctx.drawImage(this.player.img, this.player.posX, this.player.posY);
    ctx.drawImage(this.game.resourses.playerSprite.shadow, this.player.posX, this.player.posY + this.player.speed * 3);
    //render enemies
    if (this.enemies.length > 0) {
      for (let i = 0; i < this.enemies.length; i++) {
        let enemy = this.enemies[i];
        ctx.drawImage(enemy.img, enemy.posX, enemy.posY);
      };
    }
    //render bullets
    if (this.bullets.length > 0) {
      for (let i = 0; i < this.bullets.length; i++) {
        let bullet = this.bullets[i];
        ctx.drawImage(bullet.img, bullet.posX, bullet.posY);
      };
    }
    //render GUI
    ctx.font = '48px serif';
    ctx.fillText('your hits: ' + this.kills, 0, 48);
    const health = 'your health: ' + this.player.health;
    ctx.fillText(health, this.frame.width - ctx.measureText(health).width, 48);
  }
}

export default GameScene