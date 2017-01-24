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
    this._div.appendChild(this._addElements());
  };

  _addElements() {
    var div = document.createElement("div");

    var elementsTypes = [
      {name: 'Button'},
      {name: 'Div'},
      {name: 'Label'},
      {
        name: 'Input',
        opts: {
          type: ['text', 'number']
        }
      }
    ];
    for (var index in elementsTypes) {
      var elementType = elementsTypes[index];
      var element = document.createElement('button');
      element.innerHTML = 'Create ' + elementType.name;
      element.onclick = this._createElement;
      element.env = this._env;
      element.opts = {type : 'number'};
      element.elementType = elementType;
      div.appendChild(element);
    }
    return div;
  }

  _createElement() {
    var env = this.env;
    var type = this.elementType;
    env.addAgent(createAgent(type.name, 0, 0, env, null,null, type.opts));
  }
}
