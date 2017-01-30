class PanelVue {
  constructor(HTMLContainer, environment) {
    
    this._env = environment;
    this._container = HTMLContainer;
    if (this._container) {
      this._style = document.createElement('style');
      this._container.appendChild(this._style);
      this._div = document.createElement('div');
      this._container.appendChild(this._div);
      this._addElements();
      this._sizeList = 0;
    }
  }
  
  update(agents) {
    if (this._container) {
      this._repaint(agents);
    }
  };
  
  _repaint() {
    var agents = this._env.getAgents();
    
    if (this._sizeList != agents.length) {
      this._sizeList = agents.length;
      this._elementList(agents);
    }
  };
  
  _elementList(agents) {
    var elementList = document.getElementById("elementList");
    elementList.innerHTML = "";
    for (var index = 0; index < agents.length; index++) {
      var agent = agents[index];
      var li = document.createElement("li");
      var element = document.createElement('a');
      element.agent = agent;
      var id = "x" + agent.x() + "y" + agent.y();
      element.innerHTML = id + " " + agent._type;
      element.id = id;
      element.href = '#';
      element.onclick = agent.onclick;
      li.appendChild(element);
      elementList.appendChild(li);
    }
  }
  
  _addElements() {
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
    
    var addElement = document.getElementById("addElement");
    addElement.innerHTML = "";
    for (var index in elementsTypes) {
      var li = document.createElement("li");
      var elementType = elementsTypes[index];
      var element = document.createElement('a');
      element.innerHTML = 'Create ' + elementType.name;
      element.href = '#';
      element.onclick = this._createElement;
      element.env = this._env;
      element.opts = {type: 'number'};
      element.elementType = elementType;
      li.appendChild(element);
      addElement.appendChild(li);
    }
    
    var li = document.createElement("li");
    var element = document.createElement('a');
    element.innerHTML = 'Add line';
    element.href = '#';
    element.onclick = this._env.addX;
    element.env = this._env;
    li.appendChild(element);
    addElement.appendChild(li);
  }
  
  _createElement() {
    var env = this.env;
    var type = this.elementType;
    env.addAgent(createAgent(type.name, 0, 0, env, null, null, type.opts));
  }
}
