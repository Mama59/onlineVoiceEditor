class Div extends Agent {

    constructor(x, y, env, html, opts) {

        if (!opts) {
            opts = {
                nom: {value: 'test', attribute: 'name'},
                valeur: {value: 'test', attribute: 'value'},
                largeur: {value: '', attribute: 'width'},
                hauteur: {value: '', attribute: 'height'}
            };
        }

        if (!opts.classe) {
            opts.classe = {value: "", attribute: "className"};
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
