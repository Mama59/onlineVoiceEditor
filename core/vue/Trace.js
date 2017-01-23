function Trace( HTMLContainer, environment ) {

  var self = this; //useful for event;

  this.root = document.createElement( 'div' );
  this.root.id = 'trace';
  this._textFilename = document.createElement( 'input' );
  this._trigger = document.createElement( 'button' );
  this._trigger.innerHTML = "refresh trace";

  this._trigger.addEventListener( "click", function () {
    self.saveFiche();
  } );
  this._env = environment;
  var numberOfAgents = this._env.getNumberOfAgents();
  var keys = Object.keys( numberOfAgents );
  this._trace = 'ACTION;' + keys.join( ";" ) + "\r\n";

  this.root.appendChild( this._textFilename );
  this.root.appendChild( this._trigger );
  var panel = document.getElementById( "panel" );
  if(panel) {
    panel.appendChild(this.root);
  }
  if ( Trace.initialized !== true ) {

    Trace.prototype.update = function ( agents, killed ) {
      if ( this._env ) {
        var numberOfAgents = this._env.getNumberOfAgents();
        var keys = Object.keys( numberOfAgents );
        var tick = "TICK;";

        for ( var i = 0; i < keys.length; i++ ) {
          var agentName = keys[ i ];
          tick += numberOfAgents[ agentName ] + ";";
        }
        this._trace += tick + ";";

      }
      var agentActions = {
        DIE: {},
        NEW: {}
      };
      for ( var index in agents ) {
        var agent = agents[ index ];

        if ( agent.age == 1 ) {
          if ( !agentActions[ 'NEW' ][ agent.constructor.name ] ) {
            agentActions[ 'NEW' ][ agent.constructor.name ] = 0;
          }
          agentActions[ 'NEW' ][ agent.constructor.name ]++;
        }
      }

      for ( var i = 0; i < killed.length; i++ ) {
        var agent = killed[ i ];
        if ( !agentActions[ 'DIE' ][ agent.constructor.name ] ) {
          agentActions[ 'DIE' ][ agent.constructor.name ] = 0;
        }
        agentActions[ 'DIE' ][ agent.constructor.name ]++;
      }

      var actions = "";
      for ( var action in agentActions ) {
        actions += action + ";";
        for ( var i = 0; i < keys.length; i++ ) {
          var agentName = keys[ i ];
          if ( agentActions[ action ][ agentName ] ) {
            actions += agentActions[ action ][ agentName ] + ";";
          } else {
            actions += "0;";
          }
        }
        actions += ";";
      }
      this._trace += actions + "\r\n";
    };

    Trace.prototype.saveFiche = function () {
      var name = this._textFilename.value || this._textFilename.placeholder;
      var data = this._trace;
      saveAs(
        new Blob( [ data ], {
          type: "text/plain;charset=" + document.characterSet
        } ), name + ".csv"
      );
    };


    Trace.initialized = true;
  }
}
