/* This agent exchange position if position is already occuped
 */

class Div extends Agent {
    
    constructor(x, y, env, style, html, opts) {
        if (!style) {
            style = "col-xs-12";
        }
        
        if (!opts) {
            opts = {
                name: 'test',
                value: 'test'
            };
        }
        
        if (!opts.class) {
            opts.class = "col-xs-2";
        }
        
        super(x, y, env, style, html, opts);
        this._type = 'div';
        this._html = 'div';
    };
    
    _updateOpts(key, value) {
        super._updateOpts(key, value);
        if (key == 'value') {
            this._html = value;
        }
    };
}
