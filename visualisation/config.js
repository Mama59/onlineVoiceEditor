var config = {
  grid: {
    toric: true,
    size: {
      x: 12,
      y: 12 //default 50
    }
  },
  canvasDisplay: true,
  canvasSize: {
    x: 1000,
    y: 600,
    unit: 'px'
  },
  box: {
    size: 20,
    unit: 'px'
  },
  delay: 500, //if delay null, manual refresh
  sheduling: "fair", //value radom, sequential,fair
  nbTicks: 0, //infinite if 0
  panel: true,
  seed: 'any string', //radom if null
  refresh: 1, //if(tick%refresh == 0)
  particules: {
    Button: 2
  },
  render: "TableVue" // WebGLVue or TableVue
};
