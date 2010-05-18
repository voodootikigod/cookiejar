exports.name      = "fab.method";
exports.summary   = "Passes the request to the first app when the request method matches, and to the second app otherwise.";
exports.requires  = [];


method = exports.app = function( names ) {
  var methods = {}
    , len = arguments.length;
  
  for ( var i = 0; i < len; i++ ) {
    methods[ arguments[ i ] ] = true;
  }
    
  return function( hit ) {
    return function( miss ) {
      return function() {
        var out = this;
        return function( head ) {
          var app = head.method in methods ? hit : miss;
          
          app = app.call( out );
          if ( app ) app = app( head );
          
          return app;
        }
      }
    }
  }
}

exports.tests = ( function() {
  var ok = function(){ this({ body: true }) }
    , notok = function(){ this({ body: false }) }
    , app = method( "GET" )( ok )( notok );

  return [

    function
    methodMatchesGetCorrectly() {
      var out = this;
      app.call( function( obj ){ out( obj.body ) } )({ method: "GET" });
    },

    function
    methodMismatchesPostCorrectly() {
      var out = this;
      app.call( function( obj ){ out( !obj.body ) } )({ method: "POST" });
    }
  
  ];
  
})();