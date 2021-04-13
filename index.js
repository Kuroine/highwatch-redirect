const Vec3 = require('tera-vec3');

module.exports = function HwRedirect(mod) {
  const highwatchRedeem = new Vec3(22205, 4870, 6191);
  const highwatchBanker = new Vec3(22438, 1605, 5857);
  const highwatchBush = new Vec3(19702,4052,6228);
  const highwatchTG = new Vec3(21405, 4629, 6190);
  const bahaarTP = new Vec3(115023, 90044, 6377);

  let enabled = true;
  let CDBlue, CDDP = 0;

  mod.hook('S_PLAYER_STAT_UPDATE', 14, event=>{
    if(event.adventureCoins < 200){
      CDBlue = CDDP = 0;
    }
  });

  mod.hook('S_START_COOLTIME_SKILL', 3 , event =>{
    if(event.skill == 'A290100'){
      CDBlue = Date.now() + event.cooldown;
    }
    if(event.skill == 'A300100'){
      CDDP = Date.now() + event.cooldown;
    }
  });

  mod.hook('S_SPAWN_ME', 3, event => {
    if (enabled && mod.game.me.zone == 7031 && event.loc.equals(highwatchRedeem)) {
      if(CDBlue > Date.now() || CDDP > Date.now()){
        event.loc = highwatchTG;
      } 
      else event.loc = highwatchBush;
    };
    if (mod.game.me.zone == 7004 && bahaarTP.dist3D(event.loc) <= 5) {
      event.loc = new Vec3(115321, 96917, 7196);
    };
    return true;
  })

  mod.command.add('hw', () => {
    enabled = !enabled;
    mod.command.message(enabled ? 'Highwatch Redirect enabled.' : 'Highwatch Redirect disabled.');
  });

  mod.command.add('lb', {
    $none() { mod.send('C_RETURN_TO_LOBBY', 1, {}); } 
  });
  
  this.destructor = function() {
    mod.command.remove('hw');
  }
}
