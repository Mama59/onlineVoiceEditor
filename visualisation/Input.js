Div.js
/* This agent exchange position if position is already occuped
 */

class Input extends Agent {

    constructor(x, y, env, html, opts) {

        if (!opts) {
            opts = {type: 'number'};
        }

        if (!opts.style) {
            opts.style = "form-control";
        }

        if (!opts.size) {
            opts.size = 2;
        }

        html = 'input';

        opts.value = 123;

        super(x, y, env, html, opts);
        this._type = 'input';
    };
}
