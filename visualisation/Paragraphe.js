class Paragraphe extends Agent {
    
    constructor(x, y, env, html, opts) {
        
        if (!opts) {
            opts = {
                name: 'test',
                value: 'test'
            };
        }
        
        if (!opts.className) {
            opts.className = "col-xs-12";
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