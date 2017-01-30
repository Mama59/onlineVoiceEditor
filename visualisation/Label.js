Div.js
/* This agent exchange position if position is already occuped
 */

class Label extends Agent {
  
  constructor(x, y, env, style, html, opts) {
    if (!style) {
      style = "col-xs-1";
    }
    
    if (!opts) {
      opts = {
        name: 'test',
        value: 'test'
      };
    }
    if (!opts.value) {
      opts.value = 'test';
    }
    
    super(x, y, env, style, html, opts);
    
    this._html = opts.value;
    this._type = 'label';
  };
  
  updateOpts() {
    super.updateOpts();
    var self = this.agent;
    var key = this.key;
    var value = this.input.value;
    console.log(value);
    if (key == 'value') {
      self._html = value;
    }
  }
}
