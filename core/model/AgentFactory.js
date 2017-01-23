function createAgent( agentClass, x, y, env, style, opts ) {
  return new( window.eval( agentClass ) )( x, y, env, style, opts );
};
