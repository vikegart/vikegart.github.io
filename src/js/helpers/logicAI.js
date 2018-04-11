var logicAI = {
  canIShoot() {
    let shoot = false;
    let percentFire = .01;
    let chance = Math.floor(Math.random() * 101);
    if (chance / 100 < percentFire) {
      shoot = true;
    }
    return shoot;
  },

  canIClone(percent) {
    let percentClone = .007 + (percent / 10000);
    let cloneChance = Math.floor(Math.random() * 1001);
    if (cloneChance / 1000 < percentClone) {
      return true;
    }
    return false;
  },

  canICloneBoss(percent) {
    let percentBoss = .0005 + (percent / 10000);
    let cloneChance = Math.floor(Math.random() * 10001);
    if (cloneChance / 10000 < percentBoss) {
      return true;
    }
    return false;
  }
}
export default logicAI