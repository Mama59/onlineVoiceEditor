createVue = function () {
  var create={
    TraceVue: function(HTMLContainer, environment){return new TraceVue(HTMLContainer, environment);},
    TableVue: function(HTMLContainer, environment){return new TableVue(HTMLContainer, environment);},
    WebGLVue: function(HTMLContainer, environment){return new WebGLVue(HTMLContainer, environment);},
    none: function(){return new NulVue()}
  };
  
  return function (vueClass,HTMLContainer, environment, opts) {
    return create[vueClass](HTMLContainer, environment,opts);
  };
}();