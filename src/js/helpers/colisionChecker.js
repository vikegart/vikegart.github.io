function isCollide(sprite1, sprite2) { //Algorythm two line cross detection
  if (((Math.min(sprite1.posX + sprite1.img.width, sprite2.posX + sprite2.img.width) - Math.max(sprite1.posX, sprite2.posX)) > 0) //collade by X
    && ((Math.min(sprite1.posY + sprite1.img.height, sprite2.posY + sprite2.img.height) - Math.max(sprite1.posY, sprite2.posY)) > 0)) { //by Y
    return true;
  }
  return false;
}

export default isCollide