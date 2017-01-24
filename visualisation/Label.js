Div.js/* This agent exchange position if position is already occuped
 */

class Label extends Agent {

  constructor(x, y, env, style, html, opts) {
    if (!style) {
      style = "col-xs-1";
    }

    super(x, y, env, style, html, opts);
    var self = this;
    this._type = 'label';
    this._html = 'label';
  };
}
