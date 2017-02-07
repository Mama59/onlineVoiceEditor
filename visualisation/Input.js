class Input extends Agent {
    
    constructor(x, y, env, html, opts) {
        
        if (!opts) {
            opts = {
                name:'test',
                type: 'text', 
                placeholder: '',
                width: '',
                height: ''
            };
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
