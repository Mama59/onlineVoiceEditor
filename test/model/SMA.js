var expect = chai.expect;

describe( "SMA", function () {
  it( "add Agent", function () {
    a1 = new Agent( 1, 1 );
    var sma = new SMA( [], {
      Agent: 0
    } )
    sma.addAgent( a1 );
    expect( sma.getNumberOfAgents().Agent ).to.equal( 1 );
  } );

  it( "killAgent", function () {
    a1 = new Agent( 1, 1 );
    a2 = new Agent( 1, 2 );
    a3 = new Agent( 1, 3 );
    var sma = new SMA( [ a1, a2, a3 ], {
      Agent: 3
    } )
    sma.killAgent( a2 );
    sma._killAgents();
    expect( sma.getNumberOfAgents().Agent ).to.equal( 2 );
  } );

  it( "kill multiple Agents", function () {
    a1 = new Agent( 1, 1 );
    a2 = new Agent( 1, 2 );
    a3 = new Agent( 1, 3 );
    var sma = new SMA( [ a1, a2, a3 ], {
      Agent: 3
    } )
    sma.killAgent( a3 );
    sma.killAgent( a2 );
    sma.killAgent( a1 );
    sma._killAgents();
    expect( sma.getNumberOfAgents().Agent ).to.equal( 0 );
  } );

  it( "kill Agent at end of turn", function () {
    a1 = new AgentMock( 1, 1 );
    a2 = new AgentMock( 1, 2 );
    a3 = new AgentMock( 1, 3 );
    var sma = new SMA( [ a1, a2, a3 ], {
      AgentMock: 3
    } )
    sma.killAgent( a3 );
    sma.killAgent( a2 );
    sma.killAgent( a1 );
    sma.turn();
    expect( sma.getNumberOfAgents().AgentMock ).to.equal( 0 );
  } );
} );
