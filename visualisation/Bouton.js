class Bouton extends Agent {

    constructor(x, y, env, html, opts) {
        if (!opts) {
            opts = {
                nom: {value: 'test', attribute: 'name'},
                valeur: {value: 'test', attribute: 'value'},
                largeur: {value: '', attribute: 'weight'},
                hauteur: {value: '', attribute: 'height'}
            };
        }

        if (!opts.className) {
            opts.classe = {value: "btn btn-danger btn-xs", attribute: "className"};
        }

        super(x, y, env, html, opts);
        this._type = 'button';
        this._html = opts.valeur.value;
    };

    _updateOpts(key, value) {
        super._updateOpts(key, value);
        if (key == 'valeur') {
            this._html = value;
        }
    };
}

