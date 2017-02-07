class Image extends Agent {
    
    constructor(x, y, env, html, opts) {
        if (!opts) {
            opts = {
                name: 'image',
                src: 'http://www.w3schools.com/css/trolltunga.jpg',
                width: '',
                height: ''
            };
        }

        if (!opts.className) {
            opts.className = "";
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

