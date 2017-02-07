class Titre extends Agent {
    
    constructor(x, y, env, html, opts) {
        
        if (!opts) {
            opts = {
                name: 'test',
                value: 'test',
                hSize: 1,
                width: '',
                height: '',
            };
        }

        if (!opts.className) {
            opts.className = "";
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
    
    _getType() {
        return this._type + "" + this._opts.hSize;
    }
}
