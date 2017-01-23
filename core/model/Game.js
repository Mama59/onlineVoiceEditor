class Game {
  constructor() {
    Game.play();
  }
}

Game.createAgents = function (particules, agents) {
  var keys = Object.keys(particules);

  for (var i = 0; i < keys.length; i++) {
    for (var j = particules[keys[i]]; j > 0; j--) {
      var pos = Game.env.getFreeRandomPos();
      agents.push(createAgent(keys[i], pos.x, pos.y, Game.env));
      Game.env.moveAgent(agents[agents.length - 1], {
        x: pos.x,
        y: pos.y
      });
    }
  }

  Game.sma = new SMA(agents, config.particules);
  var vue = createVue(config.render || "TableVue", document.getElementById('view'), Game.env);
  Game.env.setSMA(Game.sma);
  Game.sma.addObserver(vue);
  vue.update(agents);
  vue.setGame(Game);
  return Game.sma;
};

Game.createTrace = function () {
  if (config.trace) {
    var trace = new Trace(null, Game.env);
    Game.sma.addObserver(trace);
  }
};

Game.createPanel = function () {
  if (config.panel) {
    var panel = new PanelVue(document.getElementById('panel'), Game.env);
    Game.sma.addObserver(panel);
  }
};

Game.play = function () {
  Game.env = new Environment(config.grid.size.x, config.grid.size.y, config.grid.toric);
  var agents = [];
  Math.seedrandom(config.seed || Math.random() + '');
  Game.sma = Game.createAgents(config.particules, agents);
  Game.createTrace();
  Game.createPanel();
  Game.sma.run();
};