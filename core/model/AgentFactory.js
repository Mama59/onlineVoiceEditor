function createAgent( agentClass, x, y, env, opts ) {
  return new( window.eval( agentClass ) )( x, y, env, opts );
};
