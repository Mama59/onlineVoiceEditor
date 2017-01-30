Div.js/* This agent exchange position if position is already occuped
 */

class Label extends Agent {

  constructor(x, y, env, style, html, opts) {
    if (!style) {
      style = "col-xs-1";
    }
  
    if (!opts) {
      opts = {
        name: 'test',
        value : 'test'
      };
    }

    super(x, y, env, style, html, opts);
    this._type = 'label';
  };
}
