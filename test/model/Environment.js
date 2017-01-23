var expect = chai.expect;

describe( "Environment", function () {
  describe( "constructor", function () {
    it( "should be not initialized state", function () {
      expect( Environment.initialized ).to.not.equal( true );
    } );

    it( "should set the number of lines", function () {
      var env = new Environment( 50, 50, true );
      expect( env._x ).to.equal( 50 );
    } );

    it( "should set the number of colums", function () {
      var env = new Environment( 50, 50, true );
      expect( env._y ).to.equal( 50 );
    } );
  } );

  describe( "#fonctions", function () {
    describe( "#isFree", function () {
      it( "isFree on free case return true", function () {
        var env = new Environment( 50, 50, true );
        expect( env.isFree( {
          x: 20,
          y: 20
        } ) ).to.equal( true );
      } );

      it( "isFree on occuped case return false", function () {
        var env = new Environment( 50, 50, true );
        var mockAgent = {
          x: function () {
            return 10;
          },
          y: function () {
            return 10;
          }
        };
        env.moveAgent( mockAgent, {
          x: 20,
          y: 20
        } );
        expect( env.isFree( {
          x: 20,
          y: 20
        } ) ).to.equal( false );
      } );
    } );

    describe( "#getCase", function () {
      it( "getCase change pos out of bound if toric world", function () {
        var env = new Environment( 10, 10, true );
        var pos = {
          x: 10,
          y: 11
        };
        env.getCase( pos );
        expect( pos ).to.be.deep.equal( {
          x: 0,
          y: 1
        } );
      } );

      describe( "#moveAgent", function () {
        it( "place the Agent at the good place", function () {
          var env = new Environment( 50, 50, true );
          var mockAgent = {
            x: function () {
              return 10;
            },
            y: function () {
              return 10;
            }
          };
          env.moveAgent( mockAgent, {
            x: 20,
            y: 20
          } );
          expect( env.getCase( {
            x: 20,
            y: 20
          } ) ).to.equal( mockAgent );
        } );

        it( "free the previous place", function () {
          var env = new Environment( 50, 50, true );
          mockAgent = {
            x: function () {
              return 10
            },
            y: function () {
              return 10
            }
          };
          env.moveAgent( mockAgent, {
            x: 10,
            y: 10
          } );
          expect( env.isFree( {
            x: 10,
            y: 10
          } ) ).to.equal( false );
          env.moveAgent( mockAgent, {
            x: 20,
            y: 20
          } );
          expect( env.isFree( {
            x: 10,
            y: 10
          } ) ).to.equal( true );
        } );

        it( "return the agent A on X,Y if X,Y is not free when we move the agent B on X,Y", function () {
          var env = new Environment( 50, 50, true );
          mockAgentA = {
            x: function () {
              return 10
            },
            y: function () {
              return 10
            }
          };
          mockAgentB = {
            x: function () {
              return 10
            },
            y: function () {
              return 10
            }
          };
          env.moveAgent( mockAgentA, {
            x: 20,
            y: 20
          } );
          res = env.moveAgent( mockAgentB, {
            x: 20,
            y: 20
          } );
          expect( res ).to.equal( mockAgentA );
        } );

      } );
    } );
  } );
} );
