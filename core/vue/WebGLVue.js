class WebGLVue {
  constructor( HTMLContainer, environment ) {
    this._container = HTMLContainer;
    this._env = environment;
    this._x = config.grid.size.x;
    this._y = config.grid.size.y;
    this._boxSize = config.box.size;
    this._boxSubDiv = Math.max( Math.min( this._boxSize, 12 ), 3 );
    this._refresh = config.refresh || 1;
    this._tick = this._refresh; // for drawing at the first tick
    this._idGenerator = 0;
    this._colorMat = {};
    this.init();
  }

  update( agents, agentToKill ) {
    if ( this._tick == this._refresh ) {
      this._render( agents, agentToKill );
      //requestAnimationFrame(this._repaint);
      this._tick = 0;
    }
    this._tick++;
  };

  init() {
    var scene = new THREE.Scene();
    var width = this._x * this._boxSize;
    var height = this._y * this._boxSize;
    var w = width / 2;
    var h = height / 2;
    var camera = new THREE.OrthographicCamera( -w, w, h, -h, -500, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( config.canvasSize.x, config.canvasSize.y );
    this._container.appendChild( renderer.domElement );

    var geometry = new THREE.PlaneGeometry( width, height );
    var material = new THREE.MeshBasicMaterial( {
      color: 0x555577
    } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.x = w;
    plane.position.y = h;

    scene.add( plane );

    camera.position.z = 10;
    camera.position.x = w;
    camera.position.y = h;

    var render = function ( agents, agentToKill ) {
      agentToKill = agentToKill || [];
      console.log( agentToKill )
      for ( var i = 0; i < agentToKill.length; i++ ) {
        if ( agentToKill[ i ].geometry != null ) {
          this._scene.remove( agentToKill[ i ].geometry );
          console.log( "remove" );
        }
      }
      for ( var i = 0; i < agents.length; i++ ) {
        if ( agents[ i ].geometry == null ) {
          this.createAgent( agents[ i ] );
        } else {
          agents[ i ].geometry.position.x = agents[ i ].x() * this._boxSize;
          agents[ i ].geometry.position.y = agents[ i ].y() * this._boxSize;
          agents[ i ].geometry.material =
            this.getColorMaterial( material, agents[ i ].color() );
        }
      }
      console.log( "render" )
      renderer.render( scene, camera );
    };
    this._render = render;
    this._renderer = renderer;
    this._camera = camera;
    this._scene = scene;
    this._render = render
    render( [], [] );
  };

  /*
   * create agent representation in model
   */
  createAgent( agent ) {
    var geometry = new THREE.SphereGeometry( this._boxSize / 2, 2, 3 );
    var material = this.getColorMaterial( material, agent.color() );
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = agent.x() * this._boxSize;
    sphere.position.y = agent.y() * this._boxSize;
    agent.geometry = sphere;
    this._scene.add( sphere );
  }

  getColorMaterial( material, color ) {
    if ( !this._colorMat[ color ] ) {
      this._colorMat[ color ] = new THREE.MeshBasicMaterial( {
        color: color
      } );
    }
    return this._colorMat[ color ]
  }
}
