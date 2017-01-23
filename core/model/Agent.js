/* This agent exchange position if position is already occuped
 */
class Agent {
  
  constructor(x, y, env, style, html, size) {
    this._pos = {
      x: x,
      y: y
    };
    
    this._size = size || 1;
    this._type = "button";
    this._html = "test";
    this._style = style || "col-xs-1";
    this._html = html || "Text";
    this._listenKey = true;
    
    this._env = env;
    this._changeDir = false;
    this.offset = Agent.direction[Math.floor(Math.random() * 8)];
  }
  
  x() {
    return this._pos.x;
  };
  
  y() {
    return this._pos.y;
  };
  
  pos() {
    return this._pos;
  };
  
  style() {
    return this._style;
  };
  
  color() {
    return this._style;
  };
  
  decide() {
    throw new SubClassesResponsability("decide");
  };
  
  setPos(pos) {
    this._env.setAgentAt(this, pos);
    this._pos = pos;
  };
  
  changeDir() {
    return this._changeDir;
  };
}

Agent.init = {};

Agent.direction = [
  {
    x: 1,
    y: 1
  },
  {
    x: 1,
    y: 0
  },
  {
    x: 1,
    y: -1
  },
  {
    x: -1,
    y: 1
  },
  {
    x: 0,
    y: 1
  },
  {
    x: 0,
    y: -1
  },
  {
    x: -1,
    y: 0
  },
  {
    x: -1,
    y: -1
  }
];
