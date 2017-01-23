/* This agent exchange position if position is already occuped
 */

class Wall extends Agent {

  constructor(x, y, env, style) {
    style = "url('../images/wall.png')";
    super(x, y, env, style);
  };

  decide() {
  };
}
