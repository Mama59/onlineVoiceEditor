/* This agent exchange position if position is already occuped
 */

class Button extends Agent {
  
  constructor(x, y, env, style, html, opts) {
    if (!style) {
      style = "btn btn-danger btn-xs";
    }
    
    if (!opts) {
      opts = {
        name: 'test',
        value: 'test',
      };
    }
    
    super(x, y, env, style, html, opts);
    this._type = 'button';
    this._html = opts.value;
  };
  
  updateOpts() {
    super.updateOpts();
    var self = this.agent;
    var key = this.key;
    var value = this.input.value;
    if (key == 'value') {
      self._html = value;
    }
  }
}

