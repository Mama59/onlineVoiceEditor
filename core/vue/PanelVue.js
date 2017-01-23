class PanelVue {
  constructor(HTMLContainer, environment) {
    
    this._env = environment;
    this._container = HTMLContainer;
    if (this._container) {
      this._style = document.createElement('style');
      
      this._container.appendChild(this._style);
      
      this._div = document.createElement('div');
      this._container.appendChild(this._div);
    }
  }
  
  update(agents) {
    if (this._container) {
      this._repaint(agents);
    }
  };
  
  _repaint() {
    this._div.innerHTML = "";
    var agents = this._env.getAgents();
    for (var i = 0; i < agents.length; i++) {
      var agent = agents[i];
      var div = document.createElement("div");
      div.innerHTML = agent._type + " " + agent._id;
      this._div.appendChild(div);
    }
  };
}
