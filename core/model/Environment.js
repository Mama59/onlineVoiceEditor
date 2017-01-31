class Environment {
    constructor(x, y, toric) {
        this.init(x, y, toric);
    }
    
    init(x, y, toric) {
        this._x = x || 50;
        this._y = y || 50;
        this._toric = toric;
        this.end = false;
        this.win = false;
        this._plan = [];
        
        this._sma = {
            setChanged: function () {
            }
        }; //mock before set sma
        
        for (var i = 0; i < this.xSize(); i++) {
            this._plan[i] = [];
            for (var j = 0; j < this._y; j++) {
                this._plan[i][j] = {agent: null};
            }
        }
        this.smaSet = false;
    };
    
    resetPlan() {
        for (var i = 0; i < this.xSize(); i++) {
            if (!this._plan[i]) {
                this._plan[i] = [];
            }
            for (var j = 0; j < this._y; j++) {
                if (!this._plan[i][j]) {
                    this._plan[i][j] = {agent: null};
                }
            }
        }
    }
    
    
    _resetAllDistance() {
        for (var i = 0; i < this.xSize(); i++) {
            for (var j = 0; j < this._y; j++) {
                this._plan[i][j].distance = -1;
            }
        }
    };
    
    isToric() {
        return this._toric;
    };
    
    xSize() {
        if (this._x != config.grid.size.x) {
            this._x = config.grid.size.x;
            this.resetPlan();
        }
        
        return this._x;
    };
    
    ySize() {
        if (this._y != config.grid.size.y) {
            this._y = config.grid.size.y;
            this.resetPlan();
        }
        
        return this._y;
    };
    
    setSMA(sma) {
        this._sma = sma;
        this.smaSet = true;
        //sma.addObserver(this);
    };
    
    addAgent(agent) {
        this._plan[agent.x()][agent.y()].agent = agent;
        this._sma.addAgent(agent);
        this.removeAllListenKey();
        agent.setListenKey(true);
        this._sma._hasChangedPanel = true;
    };
    
    removeAllListenKey() {
        var agents = this.getAgents();
        for (var i = 0; i < agents.length; i++) {
            var agentList = agents[i];
            agentList.setListenKey(false);
        }
    };
    
    killAgent(agent) {
        if (!agent.invulnerable) {
            this._plan[agent.x()][agent.y()].agent = null;
            this._sma.killAgent(agent);
            agent.die();
        }
        this._sma._hasChangedPanel = true;
    };
    
    getRandomPos() {
        return {
            x: Math.floor(Math.random() * config.grid.size.x),
            y: Math.floor(Math.random() * config.grid.size.y)
        };
    };
    
    addX() {
        var self = this.env;
        config.grid.size.x++;
        self._sma._hasChangedPanel = true;
    }
    
    getFreeRandomPos() {
        var pos = this.getRandomPos();
        while (!this.isFree(pos)) {
            pos = this.getRandomPos();
        }
        return pos;
    };
    
    /* change position on plan
     * return agent if the newPos is already occuped
     */
    moveAgent(agent, newPos) {
        this._handleBound(newPos, agent._opts.size);
        this._plan[agent.x()][agent.y()].agent = null;
        var res = this._plan[newPos.x][newPos.y];
        this._plan[newPos.x][newPos.y].agent = agent;
        this._sma.setChanged();
        return res;
    };
    
    /* change position on plan
     * erase previous agent if the newPos is already occuped
     */
    setAgentAt(agent, newPos) {
        this._handleBound(newPos);
        this._plan[newPos.x][newPos.y].agent = agent;
        this._sma.setChanged();
    };
    
    _handleBound(newPos) {
        if (this._toric) {
            if (newPos.x >= this.xSize() || newPos.x < 0) {
                newPos.x = ( newPos.x + this.xSize() ) % this.xSize();
            }
            if (newPos.y >= this._y || newPos.y < 0) {
                newPos.y = ( newPos.y + this._y ) % this._y;
            }
        } else {
            if (newPos.x >= this.xSize() || newPos.x < 0) {
                throw new ExceptionBound(newPos.x, "x");
            }
            if (newPos.y >= this._y || newPos.y < 0) {
                throw new ExceptionBound(newPos.y, "y");
            }
        }
    };
    
    _handleBound(newPos, size) {
        if (this._toric) {
            if (newPos.x >= this.xSize() || newPos.x < 0) {
                newPos.x = ( newPos.x + this.xSize() ) % this.xSize();
            }
            if (newPos.y + size - 1 >= this._y || newPos.y < 0) {
                newPos.y = ( newPos.y + this._y ) % this._y;
            }
        } else {
            if (newPos.x >= this.xSize() || newPos.x < 0) {
                throw new ExceptionBound(newPos.x, "x");
            }
            if ((newPos.y + size - 1) >= this._y || newPos.y < 0) {
                throw new ExceptionBound(newPos.y, "y");
            }
        }
    };

// TOP BOTTOM LEFT RIGHT
    getAround(pos) {
        var around = [];
        var aroundNotFree = [];
        var positions = [
            {
                x: pos.x,
                y: pos.y + 1
            },
            {
                x: pos.x,
                y: pos.y - 1
            },
            {
                x: pos.x + 1,
                y: pos.y
            },
            {
                x: pos.x - 1,
                y: pos.y
            },
        ];
        
        for (var index in positions) {
            var position = positions[index];
            try {
                this._handleBound(position);
                if (this.isFree(position)) {
                    around.push(position);
                }
                else {
                    aroundNotFree.push(position);
                }
            } catch (e) {
                //do nothing in this case
            }
        }
        
        return {free: around, notFree: aroundNotFree};
    };
    
    aroundFree(pos) {
        var res = [];
        for (var i = -1; i < 2; i++) {
            this._addToFree({
                x: pos.x + i,
                y: pos.y
            }, res);
            this._addToFree({
                x: pos.x + i,
                y: pos.y + 1
            }, res);
            this._addToFree({
                x: pos.x + i,
                y: pos.y - 1
            }, res);
        }
        return res;
    };
    
    _addToFree(pos, arr) {
        try {
            this._handleBound(pos);
            if (this.isFree(pos)) {
                arr.push(pos);
            }
        } catch (e) {
            //do nothing in this case
        }
    };
    
    getCase(pos) {
        this._handleBound(pos);
        return this._plan[pos.x][pos.y];
    };
    
    isFree(pos) {
        this._handleBound(pos);
        return this._plan[pos.x][pos.y].agent == null;
    };
    
    getFirstLeftAgentOnLine(pos, posAgent) {
        for (var y = pos.y; y > 0; y--) {
            if (y != posAgent.y && this._plan[pos.x][y].agent) {
                return this._plan[pos.x][y].agent;
            }
        }
        return null;
    }
    
    getFirstRightAgentOnLine(pos, posAgent) {
        for (var y = pos.y; y < this.ySize(); y++) {
            if (y != posAgent.y && this._plan[pos.x][y].agent) {
                return this._plan[pos.x][y].agent;
            }
        }
        return null;
    }
    
    isFreePos(pos, posAgent, size) {
        if (!posAgent) {
            return this.isFree(pos);
        }
        
        if (this._plan[pos.x][pos.y].agent == null) {
            var agent = this.getFirstRightAgentOnLine(pos, posAgent);
            if (agent) {
                if (agent._pos.y <= pos.y + size - 1) {
                    return false;
                }
            }
            
            agent = this.getFirstLeftAgentOnLine(pos, posAgent);
            if (agent) {
                if (pos.y <= agent._pos.y + agent._opts.size - 1) {
                    return false;
                }
            }
            
            return true;
        }
        else {
            return false;
        }
        return true;
    }
    
    getNumberOfAgents() {
        if (this.smaSet) {
            return this._sma.getNumberOfAgents();
        }
        return {};
    };
    
    getTick() {
        if (this.smaSet) {
            return this._sma.getTick();
        }
        return 0;
    };
    
    getAgent(pos) {
        return this._sma.getAgent(pos);
    };
    
    getAgents() {
        return this._sma.getAgents();
    };
    
    stop(agent) {
        this._sma.stop(agent);
        this.win = agent.isWin;
        this.end = true;
    };
    
    getWidthMax(agent) {
        var left = 0;
        var right = 0;
        var posRight = {x: agent._pos.x, y: agent._pos.y};
        posRight.y++;
        while (posRight.y < this.ySize() && this.isFree(posRight)) {
            posRight.y++;
            right++;
        }
        
        var posLeft = {x: agent._pos.x, y: agent._pos.y};
        posLeft.y--;
        while (posLeft.y >= 0 && this.isFree(posLeft)) {
            posLeft.y--;
            left++;
        }
        
        var total = left + right;
        return {left: left, right: right, total: total};
    }
}