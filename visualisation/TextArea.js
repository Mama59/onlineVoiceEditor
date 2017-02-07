class TextArea extends Agent {

    constructor(x, y, env, html, opts) {

        if (!opts) {
            opts = {
                nom: {attribute: 'name:', value: 'test'},
                valeur: {attribute: 'value', value: 'test'},
                largeur: {attribute: 'width', value: ''},
                marqueur: {attribute: 'placeholder', value: ''},
                hauteur: {attribute: 'height', value: ''}
            };
        }

        if (!opts.classe) {
            opts.classe = {value: "", attribute: "form-control"};
        }

        if (!opts.taille) {
            opts.taille = {attribute: 'size', value: 2};
        }

        opts.value = 123;

        super(x, y, env, html, opts);
        this._type = 'textarea';
    };
}
