/* This agent exchange position if position is already occuped 
 */
class AgentRandom extends Agent {
  decide() {
    var offset = {
      x: Math.floor(Math.random() * 3 - 1),
      y: Math.floor(Math.random() * 3 - 1)
    };
    var pos = {
      x: this._pos.x + offset.x,
      y: this._pos.y + offset.y
    };
    this._move(pos, offset);
  };

  _move(pos, offset) {
    var agent;
    try {
      agent = this._env.moveAgent(this, pos);
    } catch (e) {
      if (offset == null) {
        throw e;
      }
      pos[e.direction()] = this["_" + e.direction()] - offset[e.direction()];
      agent = this._env.moveAgent(this, pos);
    }
    if (agent != null) {
      agent.setPos(this._pos);
    }
    if (offset != null) {
      this._changeDir = !( this.offset == offset );
      this.offset = offset;
    }
    this._pos = pos;
  };
}
