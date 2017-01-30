/* This agent exchange position if position is already occuped
 */

class Button extends Agent {
    
    constructor(x, y, env, style, html, opts) {
        if (!style) {
            style = "btn btn-danger btn-xs col-xs-12";
        }
        
        if (!opts) {
            opts = {
                name: 'test',
                value: 'test'
            };
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

