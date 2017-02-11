class Paragraphe extends Agent {
    
    constructor(x, y, env, html, opts) {
        
        if (!opts) {
            opts = {
                nom: {attribute: 'name:', value: 'test'},
                valeur: {attribute: 'value', value: 'test'},
                largeur: {attribute: 'width', value: ''},
                hauteur: {attribute: 'height', value: ''}
            };
        }

        if (!opts.classe) {
            opts.classe = {value: "", attribute: "className"};
        }
        
        super(x, y, env, html, opts);
        this._type = 'p';
        this._html = this._opts.valeur.value || 'p';
    };
    
    _updateOpts(key, value) {
        super._updateOpts(key, value);
        if (key == 'valeur') {
            this._html = value;
        }
    };
}
