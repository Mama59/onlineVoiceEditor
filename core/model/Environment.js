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
    for (var i = 0; i < this._x; i++) {
      this._plan[i] = [];
      for (var j = 0; j < this._y; j++) {
        this._plan[i][j] = {agent: null};
      }
    }
    this.smaSet = false;
  }

  _resetAllDistance() {
    for (var i = 0; i < this._x; i++) {
      for (var j = 0; j < this._y; j++) {
        this._plan[i][j].distance = -1;
      }
    }
  }

  isToric() {
    return this._toric;
  };

  xSize() {
    return this._x;
  };

  ySize() {
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
  }

  killAgent(agent) {
    if(! agent.invulnerable) {
      this._plan[agent.x()][agent.y()].agent = null;
      this._sma.killAgent(agent);
      agent.die();
    }
  }

  getRandomPos() {
    return {
      x: Math.floor(Math.random() * config.grid.size.x),
      y: Math.floor(Math.random() * config.grid.size.y)
    };
  }

  getFreeRandomPos() {
    var pos = this.getRandomPos();
    while (!this.isFree(pos)) {
      pos = this.getRandomPos();
    }
    return pos;
  }

  /* change position on plan
   * return agent if the newPos is already occuped
   */
  moveAgent(agent, newPos) {
    this._handleBound(newPos);
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
      if (newPos.x >= this._x || newPos.x < 0) {
        newPos.x = ( newPos.x + this._x ) % this._x;
      }
      if (newPos.y >= this._y || newPos.y < 0) {
        newPos.y = ( newPos.y + this._y ) % this._y;
      }
    } else {
      if (newPos.x >= this._x || newPos.x < 0) {
        throw new ExceptionBound(newPos.x, "x");
      }
      if (newPos.y >= this._y || newPos.y < 0) {
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
  }

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

  getNumberOfAgents() {
    if (this.smaSet) {
      return this._sma.getNumberOfAgents();
    }
    return {};
  }

  getTick() {
    if (this.smaSet) {
      return this._sma.getTick();
    }
    return 0;
  }

  getAgent(pos) {
    return this._sma.getAgent(pos);
  }
  
  getAgents() {
    return this._sma.getAgents();
  }

  stop(agent) {
    this._sma.stop(agent);
    this.win = agent.isWin;
    this.end = true;
  }
}