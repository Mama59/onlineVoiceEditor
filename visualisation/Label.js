class Label extends Agent {

    constructor(x, y, env, html, opts) {

        if (!opts) {
            opts = {
                nom: {attribute: 'name:', value: 'test'},
                valeur: {attribute: 'value', value: 'test'},
                largeur: {attribute: 'width', value: ''},
                hauteur: {attribute: 'height', value: ''}
            };
        }

        if (!opts.valeur) {
            opts.valeur = {value: "test", attribute: "value"};
        }


        if (!opts.classe) {
            opts.classe = {value: "", attribute: "className"};
        }

        super(x, y, env, html, opts);

        this._html = opts.valeur.value;  
        this._type = 'label';
    };

    _updateOpts(key, value) {
        super._updateOpts(key, value);
        if (key == 'valeur') {
            this._html = value;
        }
    };
}
