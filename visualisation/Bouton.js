class Bouton extends Agent {

    constructor(x, y, env, html, opts) {
        if (!opts) {
            opts = {
                name: 'test',
                value: 'test'
            };
        }

        if (!opts.className) {
            opts.className = "btn btn-danger btn-xs col-xs-12";
        }

        super(x, y, env, html, opts);
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

