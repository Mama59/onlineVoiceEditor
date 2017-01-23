/* This agent exchange position if position is already occuped
 */

class Button extends Agent {
  
  constructor(x, y, env, style, html, size) {
    if (!style) {
      style = "btn btn-danger btn-xs";
    }
    
    super(x, y, env, style, html, size);
    var self = this;
    this.letterBox = {lastDirection: {x: 0, y: 0}, direction: {x: 0, y: 0}};
    this._id = "x" + x + "y" + y;
    window.onkeydown = function (e) {
      self.onKeyDown(e);
    };
  };
  
  onKeyDown(e) {
    if (this._listenKey) {
      var code = e.keyCode ? e.keyCode : e.which;
      if (this.constructor.CODE[code]) {
        this.letterBox.lastDirection = this.letterBox.direction;
        this.letterBox.direction = this.constructor.CODE[code];
      }
    }
  }
  
  decide() {
    var pos = {
      x: this._pos.x + this.letterBox.direction.x,
      y: this._pos.y + this.letterBox.direction.y
    };
    if (this._perception(pos)) {
      this._move(pos);
    }
  };
  
  _move(pos) {
    this._env.moveAgent(this, pos);
    this.lastPos = this._pos;
    this._pos = pos;
    this._id = "x" + pos.x + "y" + pos.y;
  };
  
  _perception(pos) {
    try {
      return this._env.isFree(pos);
    }
    catch (e) {
      return false;
    }
  }
}

Button.CODE = {38: {x: -1, y: 0}, 39: {x: 0, y: 1}, 40: {x: 1, y: 0}, 37: {x: 0, y: -1}, 32: {x: 0, y: 0}};