Div.js
/* This agent exchange position if position is already occuped
 */

class Input extends Agent {
    
    constructor(x, y, env, style, html, opts) {
        if (!style) {
            style = "form-control";
        }
        
        if (!opts) {
            opts = {type: 'number'};
        }
        
        html = 'input';
        
        opts.value = 123;
        
        super(x, y, env, style, html, opts);
        this._type = 'input';
    };
}
