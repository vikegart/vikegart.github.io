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
    let percentClone = .008 + (percent / 1000);
    let cloneChance = Math.floor(Math.random() * 1001);
    if (cloneChance / 1000 < percentClone) {
      return true;
    }
    return false;
  },

  canICloneBoss(percent) {
    let percentBoss = .001 + (percent / 1000);
    let cloneChance = Math.floor(Math.random() * 1001);
    if (cloneChance / 1000 < percentBoss) {
      return true;
    }
    return false;
  }
}
export default logicAI