class Input extends Agent {
    
    constructor(x, y, env, html, opts) {
        
        if (!opts) {
            opts = {type: 'number', placeholder: ''};
        }
        
        if (!opts.className) {
            opts.className = "form-control";
        }
        
        if (!opts.size) {
            opts.size = 2;
        }
        
        html = 'input';
        
        opts.value = 123;
        
        super(x, y, env, html, opts);
        this._type = 'input';
    };
}
