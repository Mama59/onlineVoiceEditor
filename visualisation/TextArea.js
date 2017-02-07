class TextArea extends Agent {
    
    constructor(x, y, env, html, opts) {
        
        if (!opts) {
            opts = {
                name:'test',
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
        
        opts.value = 123;
        
        super(x, y, env, html, opts);
        this._type = 'textarea';
    };
}
