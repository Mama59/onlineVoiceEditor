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
                value: 'test'
            };
        }
        
        if (!opts.class) {
            opts.class = "col-xs-2";
        }
        
        super(x, y, env, style, html, opts);
        this._type = 'button';
        this._html = opts.value;
    };
    
    _updateOpts(key, value) {
        super._updateOpts(key, value);
        if (key == 'value') {
            this._html = value;
        }
    };
}

