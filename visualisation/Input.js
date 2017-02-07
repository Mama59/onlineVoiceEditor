class Input extends Agent {

    constructor(x, y, env, html, opts) {

        if (!opts) {
            opts = {
                nom: {attribute: 'name', value: 'test'},
                type: {attribute: 'type', value: 'text'},
                marqueur: {attribute: 'placeholder', value: 'number'},
                largeur: {attribute: 'width', value: ''},
                hauteur: {attribute: 'height', value: ''}
            };
        }

        if (!opts.classe) {
            opts.classe = {value: "form-control", attribute: "className"};
        }

        if (!opts.taille) {
            opts.taille = {attribute: 'size', value: 2};
        }

        opts.valeur = {attribute: 'value', value: 123};

        super(x, y, env, html, opts);
        this._type = 'input';
    };
}
