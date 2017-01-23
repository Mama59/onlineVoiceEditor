var expect = chai.expect;

describe( "Environment", function () {
  describe( "#style", function () {
    it( "baby style at creation", function () {
      fish = new Fish( 1, 1 );
      expect( fish.style() ).to.equal( Fish.style.baby );
    } );

    it( "adult style after breed", function () {
      e = new Environment( 3, 3, true );
      sma = new SMA( [], {
        Fish: 0
      } );
      e.setSMA( sma );
      fish = new Fish( 1, 1, e );
      e.addAgent( fish );
      fish.decide();
      fish.decide();
      expect( fish._style ).to.equal( Fish.style.adult );
    } );
  } );

  describe( "#breed", function () {

    it( "no breed at first time", function () {
      e = new Environment( 3, 3, true );
      sma = new SMA( [], {
        Fish: 0
      } );
      e.setSMA( sma );
      fish = new Fish( 1, 1, e );
      e.addAgent( fish );
      fish.decide();
      expect( sma.getNumberOfAgents().Fish ).to.equal( 1 );
    } );


    it( " breed at the 3th time", function () {
      e = new Environment( 3, 3, true );
      sma = new SMA( [], {
        Fish: 0
      } );
      e.setSMA( sma );
      fish = new Fish( 1, 1, e );
      e.addAgent( fish );
      fish.decide();
      fish.decide();
      expect( sma.getNumberOfAgents().Fish ).to.equal( 2 );
    } );


    it( " can't breed if no place", function () {
      e = new Environment( 1, 1, true );
      sma = new SMA( [], {
        Fish: 0
      } );
      e.setSMA( sma );
      fish = new Fish( 0, 0, e );
      e.addAgent( fish );
      fish.decide();
      fish.decide();
      expect( sma.getNumberOfAgents().Fish ).to.equal( 1 );
    } );
  } );
} );
