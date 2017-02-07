class Image extends Agent {
    
    constructor(x, y, env, html, opts) {
        if (!opts) {
            opts = {
                nom : {attribute : 'name', value : 'image'},
                source : {attribute : 'src', value : 'http://www.w3schools.com/css/trolltunga.jpg'},
                largeur : {attribute :'width', value: ''},
                hauteur : {attribute : 'height', value : ''}
            };
        }

        if (!opts.classe) {
            opts.classe = {value: "", attribute: "className"};
        }

        super(x, y, env, html, opts);
        this._type = 'img';
        this._html = opts.value;
    };
    
    _updateOpts(key, value) {
        super._updateOpts(key, value);
        if (key == 'value') {
            this._html = value;
        }
    };
}

