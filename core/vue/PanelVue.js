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
        if (this._env._sma._hasChangedPanel) {
            this._elementList(agents);
        }
    };
    
    _elementDetails(agent) {
        var detailsSelected = document.getElementById("detailsSelected");
        detailsSelected.innerHTML = "";
        var form = document.createElement('form');
        
        for (var key in agent._opts) {
            this._addToForm(form, agent, agent._opts[key], key, agent.updateOpts);
        }
        
        detailsSelected.appendChild(form);
    }
    
    
    keyUp(e) {
        var event = e || window.event;
        var charCode = event.which || event.keyCode;
        if (charCode == '13') {
            var agent = this.agent;
            agent._updateOpts(this.id, this.value);
        }
        
    };
    
    _addToForm(form, agent, value, key, update) {
        var div = document.createElement('div');
        div.className = "input-group";
        var label = document.createElement('label');
        label.innerHTML = key + ": ";
        var input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.id = key;
        input.agent = agent;
        input.onkeydown = this.keyUp;
        var button = document.createElement('button');
        button.innerHTML = 'Change';
        button.agent = agent;
        button.key = key;
        button.input = input;
        button.onclick = update;
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(button);
        form.appendChild(div);
        
    }
    
    
    _elementList(agents) {
        var elementList = document.getElementById("elementList");
        elementList.innerHTML = "";
        for (var index = 0; index < agents.length; index++) {
            var agent = agents[index];
            if (agent._listenKey) {
                this._elementDetails(agent);
            }
            
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
