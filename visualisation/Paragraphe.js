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
        this._type = 'h';
        this._html = this._opts.value || 'h';
    };
    
    _updateOpts(key, value) {
        super._updateOpts(key, value);
        if (key == 'value') {
            this._html = value;
        }
    };
}
