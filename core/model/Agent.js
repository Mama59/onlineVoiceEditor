/* This agent exchange position if position is already occuped
 */
class Agent {
    
    constructor(x, y, env, html, opts) {
        var self = this;
        
        self._pos = {
            x: x,
            y: y
        };
        
        self._opts = opts || {};
        self._opts.name = 'test' + this.constructor.name;
        self._opts.size = self._opts.size > 0 && self._opts.size < 13 ? self._opts.size : 1;
        
        self.setListenKey(true);
        self._env = env;
        self._changeDir = false;
        self.offset = Agent.direction[Math.floor(Math.random() * 8)];
        
        self._id = "x" + x + "y" + y;
        window.onkeydown = function (e) {
            self.onKeyDown(e);
        };
    }
    
    updateOpts() {
        var self = this.agent;
        var key = this.key;
        var value = this.input.value;
        self._updateOpts(key, value);
    }
    
    _updateOpts(key, value) {
        if (this._opts) {
            this._opts[key] = value;
        }
        else {
            this._opts = {key: value};
        }
        
        if (key == 'size') {
            this._opts.size = parseInt(this._opts.size);
        }
        
        this._env._sma._hasChangedPanel = true;
    };
    
    onclick() {
        var self = this.agent;
        self._env.removeAllListenKey();
        self.setListenKey(true);
        self._env._sma._hasChangedPanel = true;
    }
    
    setListenKey(boolean) {
        this._listenKey = boolean;
        this.constructor.letterBox.direction = {x: 0, y: 0};
    };
    
    x() {
        return this._pos.x;
    };
    
    y() {
        return this._pos.y;
    };
    
    getWidthMax() {
        return this._env.getWidthMax(this);
    }
    
    pos() {
        return this._pos;
    };
    
    setPos(pos) {
        this._env.setAgentAt(this, pos);
        this._pos = pos;
    };
    
    changeDir() {
        return this._changeDir;
    };
    
    onKeyDown(e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (this.constructor.CODE[code]) {
            this.constructor.letterBox.lastDirection = this.constructor.letterBox.direction;
            this.constructor.letterBox.direction = this.constructor.CODE[code];
        }
    }
    
    decide() {
        if (this._listenKey) {
            var pos = {
                x: this._pos.x + this.constructor.letterBox.direction.x,
                y: this._pos.y + this.constructor.letterBox.direction.y
            };
            if (this._perception(pos)) {
                this._move(pos);
            }
        }
    };
    
    _move(pos) {
        try {
            this._env.moveAgent(this, pos);
            this.lastPos = this._pos;
            this._pos = pos;
            this._id = "x" + pos.x + "y" + pos.y;
            if (this._env) {
                this._env._sma._hasChangedPanel = true;
            }
        } catch (e) {
            //do nothing in this case
        }
    };
    
    _perception(pos) {
        try {
            return this._env.isFreePos(pos, this._pos, this._opts.size);
        }
        catch (e) {
            return false;
        }
    }
}

Agent.init = {};

Agent.direction = [
    {
        x: 1,
        y: 1
    },
    {
        x: 1,
        y: 0
    },
    {
        x: 1,
        y: -1
    },
    {
        x: -1,
        y: 1
    },
    {
        x: 0,
        y: 1
    },
    {
        x: 0,
        y: -1
    },
    {
        x: -1,
        y: 0
    },
    {
        x: -1,
        y: -1
    }
];

Agent.CODE = {38: {x: -1, y: 0}, 39: {x: 0, y: 1}, 40: {x: 1, y: 0}, 37: {x: 0, y: -1}, 32: {x: 0, y: 0}};
Agent.letterBox = {lastDirection: {x: 0, y: 0}, direction: {x: 0, y: 0}};