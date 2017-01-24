/* This agent exchange position if position is already occuped
 */

class Div extends Agent {

  constructor(x, y, env, style, html, opts) {
    if (!style) {
      style = "col-xs-1";
    }
    super(x, y, env, style, html, opts);
    this._type = 'div';
    this._html = 'div';

  };
}
