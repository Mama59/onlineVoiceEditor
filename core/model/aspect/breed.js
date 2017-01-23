( function () {
  var keys = Object.keys( config.breed );

  for ( var i = 0; i < keys.length; i++ ) {
    var classObject = window.eval( window.eval( keys[ i ] ) );

    classObject.breedTime = config.breed[ keys[ i ] ] || 20;

    classObject.initValues.age = 0;

    classObject.endTurn.push( function () {
      if ( classObject.breedTime % this.age == 0 ) {
        new classObject( this._previousPos.x,
          this.lastPos.y,
          this.style );
      }
      this.age++;
    } )
  }
}() )
