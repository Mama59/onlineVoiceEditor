class Div extends Agent {

    constructor(x, y, env, html, opts) {

        if (!opts) {
            opts = {
                name: 'test',
                value: 'test',
                width: '',
                height: ''
            };
        }

        if (!opts.className) {
            opts.className = "";
        }

        super(x, y, env, html, opts);
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
