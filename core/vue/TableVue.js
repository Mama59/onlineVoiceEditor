class TableVue {
    constructor(HTMLContainer, environment) {
        this._env = environment;
        this._container = HTMLContainer;
        this._style = document.createElement('style');
        this._refresh = config.refresh || 1;
        this._tick = this._refresh; // for drawing at the first tick
        this.removeAllChilds();
        this._container.appendChild(this._style);

        this._repaint();
    }

    setGame(game) {
        this._game = game;
    }

    removeAllChilds() {
        var childNodes = this._container.childNodes;
        for (var index = childNodes.length - 1; index >= 0; index--) {
            this._container.removeChild(childNodes[index]);
        }
    }

    update(agents) {

        if (this._env._sma._hasChangedPanel) {
            this._repaint(agents);
        }
    };

    _repaint() {
        //drawing
        var style = "";


        var oldTable = this._canvas;

        this._canvas = document.createElement('div');

        for (var x = 0; x < this._env.xSize(); x++) {
            var tr = document.createElement('div');
            tr.className = "col-xs-12";

            this._canvas.appendChild(tr);

            for (var y = 0; y < this._env.ySize(); y++) {
                var agent = this._env.getCase({x: x, y: y}).agent;
                var id = this._env.getIdFromPos({x: x, y: y});
                var td;

                td = document.createElement('div');
                td.className = "col-xs-1";
                var style = "";

                if (this._env._drawBorder) {
                    style += " border-right:1px; border-top:1px; border-right-style:solid;  border-top-style:solid; border-right-color:gainsboro; border-top-color:gainsboro;";
                }


                td.id = id;
                if (agent) {
                    var element = document.createElement(agent._getType());
                    if (agent._opts && agent._opts.taille) {
                        element.className = agent._opts.classe.value + " col-xs-12";
                        td.className = "col-xs-" + agent._opts.taille.value;
                        y += agent._opts.taille.value - 1;
                    }
                    element.innerHTML = agent._html;
                    element.onclick = agent.onclick;
                    element.agent = agent;
                    element.id = agent._opts.nom.value;

                    if (agent._opts) {
                        for (var name in agent._opts) {
                            var opt = agent._opts[name];
                            element[opt.attribute] = opt.value;
                        }
                    }

                    td.appendChild(element);

                }
                else {
                    if (this._env._drawCase) {
                        td.innerHTML = id + '&nbsp;';
                    }
                    else {
                        td.innerHTML = '&nbsp;';
                    }
                    style += " color:gainsboro;";
                }

                td.style = style;

                if (agent && agent._listenKey) {
                    td.style = "box-shadow: 2px 2px 2px 2px orange ";
                }
                tr.appendChild(td);

            }
        }

        if (config.canvasDisplay) {
            if (oldTable == null) {
                this._container.appendChild(this._canvas);
            } else {
                this._container.replaceChild(this._canvas, oldTable);
            }
        }

        this._style.innerHTML = style;

    };
}
