var inFrame = {
  leftBorder(frame, sprite) {
    if (sprite.posX < 0) {
      return true;
    }
    return false;
  },
  rightBorder(frame, sprite) {
    if (sprite.posX + sprite.img.width > frame.width) {
      return true;
    }
    return false;
  },
  topBorder(frame, sprite) {
    if (sprite.posY < 0) {
      return true;
    }
    return false;
  },
  bottomBorder(frame, sprite) {
    if (sprite.posY + sprite.img.height > frame.height) {
      return true;
    }
    return false;
  },
  onScreen(frame, sprite) {
    if (this.bottomBorder(frame, sprite)
      || this.topBorder(frame, sprite)
      || this.rightBorder(frame, sprite)
      || this.leftBorder(frame, sprite)
    ) {
      return false;
    }
    return true;
  }
}

export default inFrame