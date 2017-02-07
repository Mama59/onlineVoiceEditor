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
            documentationList();
        }

        var updateBtn = document.getElementById('updateOpts');
        if (this._env._showOpts) {
            updateBtn.innerHTML = "Cacher les options";
            updateBtn.onclick = this._env.hideUpdateOpts;
        }
        else {
            updateBtn.innerHTML = "Montrer les options";
            updateBtn.onclick = this._env.showUpdateOpts;
        }
        updateBtn.env = this._env;
    };

    _elementDetails(agent) {
        var detailsSelected = document.getElementById("detailsSelected");
        detailsSelected.innerHTML = "";
        if (this._env._showOpts) {
            var form = document.createElement('div');
            form.className = 'form-horizontal';

            for (var key in agent._opts) {
                this._addToForm(form, agent, agent._opts[key], key, agent.updateOpts);
            }
            var divDeplace = this._getDivForm(agent, agent._env.getIdFromPos(agent._pos), 'case', agent.moveToId, 'deplace', "Déplacer");
            form.appendChild(divDeplace);


            var showCase = document.createElement('button');
            if (agent._env._drawCase) {
                showCase.onclick = agent._env.hideCase;
                showCase.innerHTML = 'Masquer les N° de cases';
            }
            else {
                showCase.onclick = agent._env.showCase;
                showCase.innerHTML = 'Afficher les N° de cases';
            }
            showCase.className = 'btn btn-primary col-xs-offset-5';
            showCase.env = agent._env;

            form.appendChild(showCase);

            var showCase = document.createElement('button');
            if (agent._env._drawBorder) {
                showCase.onclick = agent._env.hideBorder;
                showCase.innerHTML = 'Masquer la grille';
            }
            else {
                showCase.onclick = agent._env.showBorder;
                showCase.innerHTML = 'Afficher la grille';
            }
            showCase.className = 'btn btn-primary col-xs-offset-1';
            showCase.env = agent._env;

            form.appendChild(showCase);

            var button = document.createElement('button');
            button.onclick = agent.dieAgent;
            button.innerHTML = 'Supprimer';
            button.className = 'btn btn-danger col-xs-offset-1';
            button.agent = agent;

            form.appendChild(button);


            var hr = document.createElement('hr');
            hr.style = " height: 12px;border: 0;box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);";

            form.appendChild(hr);

            detailsSelected.appendChild(form);

        }
    }

    keyUp(e) {
        var event = e || window.event;
        var charCode = event.which || event.keyCode;
        if (charCode == '13') {
            if (this.checkValidity()) {
                if (this.id === 'case') {
                    document.getElementById(this.idButton).click();
                }
                else {
                    var agent = this.agent;
                    agent._updateOpts(this.id, this.value);
                }
            }
        }
    };


    _getDivForm(agent, value, key, func, idButton, textButton) {
        var divForm = document.createElement('div');
        divForm.className = "form-group";
        var label = document.createElement('label');
        label.innerHTML = key + ": ";
        label.className = "control-label col-sm-2";
        label.for = key;

        var input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.id = key;
        input.agent = agent;
        input.onkeydown = this.keyUp;
        input.className = 'form-control';
        input.idButton = idButton;
        input.onclick = function () {
            Agent.selected.setListenKey(false);
        };

        input.onblur = function () {
            Agent.selected.setListenKey(true);
        };

        var button = document.createElement('button');
        button.innerHTML = textButton;
        button.className = 'btn btn-success';
        button.agent = agent;
        button.key = key;
        button.input = input;
        button.onclick = func;
        button.id = idButton;

        var div = document.createElement('div');
        div.className = "col-sm-8";
        div.appendChild(input);

        if (key == 'size') {
            input.type = 'number';
            input.min = 1;
            var sizeMax = agent.getWidthMax();
            input.max = sizeMax.right + 1;
        }

        divForm.appendChild(label);
        divForm.appendChild(div);
        divForm.appendChild(button);

        return divForm;
    }

    _addToForm(form, agent, value, key, update) {
        var divForm = document.createElement('div');
        divForm.className = "form-group";
        var label = document.createElement('label');
        label.innerHTML = key + ": ";
        label.className = "control-label col-sm-2";
        label.for = key;

        var input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.id = key;
        input.agent = agent;
        input.onkeydown = this.keyUp;
        input.className = 'form-control';

        input.onclick = function () {
            Agent.selected.setListenKey(false);
        };

        input.onblur = function () {
            Agent.selected.setListenKey(true);
        };

        var button = document.createElement('button');
        button.innerHTML = 'Modifier';
        button.className = 'btn btn-success';
        button.agent = agent;
        button.key = key;
        button.input = input;
        button.onclick = update;
        button.id = "change_button_" + key;

        var div = document.createElement('div');
        div.className = "col-sm-8";
        div.appendChild(input);

        if (key == 'size') {
            input.type = 'number';
            input.min = 1;
            var sizeMax = agent.getWidthMax();
            input.max = sizeMax.right + 1;
        }

        divForm.appendChild(label);
        divForm.appendChild(div);
        divForm.appendChild(button);

        form.appendChild(divForm);
    }


    _elementList(agents) {
        var elementList = document.getElementById("elementList");
        elementList.innerHTML = "";
        var detailsSelected = document.getElementById("detailsSelected");
        detailsSelected.innerHTML = "";
        for (var index = 0; index < agents.length; index++) {
            var agent = agents[index];
            if (agent._listenKey) {
                this._elementDetails(agent);
            }

            var li = document.createElement("li");
            var element = document.createElement('a');
            element.agent = agent;
            element.innerHTML = agent._opts.name;
            element.id = agent._opts.name;
            element.href = '#';
            element.onclick = agent.onclick;
            li.appendChild(element);
            elementList.appendChild(li);
        }
    }

    _addElements() {
        var elementsTypes = [
            {name: 'Bouton'},
            {name: 'Div'},
            {name: 'Label'},
            {name: 'Image'},
            {name: 'TextArea'},
            {name: 'Paragraphe'},
            {name: 'Titre'},
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
            element.innerHTML = 'Créer ' + elementType.name;
            element.href = '#';
            element.id = 'idCreate' + elementType.name;
            element.onclick = this._createElement;
            element.env = this._env;
            element.opts = {type: 'number'};
            element.elementType = elementType;
            li.appendChild(element);
            addElement.appendChild(li);
        }

        var li = document.createElement("li");
        var element = document.createElement('a');
        element.innerHTML = 'Ajouter ligne';
        element.id = 'idAddLine';
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

    _createSpecifiedElement(elementType) {
        var agent = createAgent(elementType, 0, 0, this._env, null, null, elementType.opts);
        this._env.addAgent(agent);
        return agent;
    }
}


function documentationList() {
    var elementList = document.getElementById("documentationList");
    elementList.innerHTML = "";
    for (var i = 0; i < dict.length; i++) {
        for (var j = 0; j < dict[i].phrases.length; j++) {
            var li = document.createElement("li");
            var element = document.createElement('a');
            element.innerHTML = dict[i].phrases[j];
            element.href = '#';
            li.appendChild(element);
            elementList.appendChild(li);
        }
    }
}