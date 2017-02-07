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
        self._countMove = 0;
        self._finishToMove = true;

        self.setListenKey(true);
        self._env = env;
        self._changeDir = false;
        self.offset = Agent.direction[Math.floor(Math.random() * 8)];
        self._id = "x" + x + "y" + y;
        window.onkeydown = function (e) {
            self.onKeyDown(e);
        };
    }

    _getType() {
        return this._type;
    }

    updateOpts() {
        var self = this.agent;
        var key = this.key;
        var value = this.input.value;
        self._updateOpts(key, value);
    }

    _updateOpts(key, value) {
        if (!this._opts) {
            this._opts = {};
        }

        if (key == 'size') {
            var size = parseInt(value);
            if (!isNaN(size)) {
                var sizeMax = this.getWidthMax();
                var max = sizeMax.right + 1;
                if (size <= max) {
                    this._opts.size = size;
                }
            }
        }
        else {
            this._opts[key] = value;
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
        if (boolean)
            Agent.selected = this;
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

    dieAgent() {
        var agent = this.agent;
        agent.die();
    };

    die() {
        this._env.killAgent(this);
        this._env._sma._hasChangedPanel = true;
    }

    decide() {
        if (this.constructor.letterBox.direction.x == 0 && this.constructor.letterBox.direction.y == 0) {
            this._countMove = 0;
            Agent.letterBox.nbMove = 0;
            return;
        }

        if (this._listenKey && (Agent.letterBox.nbMove == 0 || this._countMove < Agent.letterBox.nbMove)) {
            this._finishToMove = false;
            var pos = {
                x: this._pos.x + this.constructor.letterBox.direction.x,
                y: this._pos.y + this.constructor.letterBox.direction.y
            };
            var nextPos = this._perception(pos);
            if (nextPos) {
                this._move(nextPos);
            }
            if (Agent.letterBox.nbMove != 0)
                this._countMove++;
        }
        else if (Agent.letterBox.nbMove != 0 && this._countMove >= Agent.letterBox.nbMove) {
            Agent.letterBox = {lastDirection: {x: 0, y: 0}, direction: {x: 0, y: 0}};
            this._finishToMove = true;
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
            if (this._env.isFreePos(pos, this._pos, this._opts.size)) {
                return pos;
            }
            else {
                pos = {
                    x: pos.x + this.constructor.letterBox.direction.x,
                    y: pos.y + this.constructor.letterBox.direction.y
                };
                return this._perception(pos);
            }
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
Agent.letterBox.nbMove = 0;

// Ne peut être utilisé que en lecture sinon on s'ouvre à la possibilité de bug !
Agent.selected = null;