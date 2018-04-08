class EndScene {
    update(dt) {

  }
  render(dt, ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gameOverText = 'Game Over';
    ctx.textBaseline = 'top';
    ctx.font = '100px Helvetica';
    ctx.fillStyle = '#ee4024';
    ctx.fillText(gameOverText, (canvas.width - ctx.measureText(gameOverText).width) / 2, canvas.height / 2 - 50);
  }
}

export default EndScene