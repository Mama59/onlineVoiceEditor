/* This agent exchange position if position is already occuped
 */

class Button extends Agent {

  constructor(x, y, env, style, html, opts) {
    if (!style) {
      style = "btn btn-danger btn-xs";
    }

    super(x, y, env, style, html, opts);
    this._type = 'button';
    this._html = 'button';
  };
}

