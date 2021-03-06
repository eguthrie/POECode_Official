(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['home'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.song,depth0,{"name":"song","data":data,"indent":"      ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<h1>Hi world</h1>\n<form id=\"uploadForm\" enctype=\"multipart/form-data\" action=\"/song\" method=\"post\">\n  <input type=\"text\" name=\"name\" required/>\n  <input type=\"text\" name=\"artist\" required/>\n  <input type=\"file\" name=\"midi\" required/>\n  <input type=\"file\" name=\"art\" />\n  <input type=\"submit\" value=\"Upload Song\" name=\"submit\">\n</form>\n<div id=\"container\">\n  <div id=\"header\">header</div>\n  <div id=\"left-content\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.songs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n  <div id=\"right-content\">\n    <div id=\"now-playing-wrapper\">\n      <h1>now playing</h1>\n    </div>\n"
    + ((stack1 = this.invokePartial(partials.songQueue,depth0,{"name":"songQueue","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "")
    + "  </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['layouts/main'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<!DOCTYPE html>\n<html>\n  <head>\n  	<link rel=\"stylesheet\" type=\"text/css\" href=\"/stylesheets/style.css\">\n  	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300' rel='stylesheet' type='text/css'>\n    \n    <script src=\"https://cdn.socket.io/socket.io-1.3.4.js\"></script>\n    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.1/handlebars.runtime.min.js\"></script>\n    <meta charset=\"utf-8\">\n    <title>Acoustronic Guitar</title>\n  </head>\n  <body>\n    "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n  </body>\n  \n  <script src=\"js/main.js\"></script>\n  <script src=\"js/templates.js\"></script>\n</html>";
},"useData":true});
templates['queuedSong'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"song-queued\" id=\""
    + alias3(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n  <p>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + " - "
    + alias3(((helper = (helper = helpers.artist || (depth0 != null ? depth0.artist : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"artist","hash":{},"data":data}) : helper)))
    + "</p>\n  <div class=\"remove-song\">X</div>\n</div>\n";
},"useData":true});
templates['song'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"song-thumb\" id=\""
    + alias3(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n  <h1>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + " - "
    + alias3(((helper = (helper = helpers.artist || (depth0 != null ? depth0.artist : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"artist","hash":{},"data":data}) : helper)))
    + "</h1>\n  <img src=\""
    + alias3(((helper = (helper = helpers.artPath || (depth0 != null ? depth0.artPath : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"artPath","hash":{},"data":data}) : helper)))
    + "\" class=\"art\"></img>\n</div>\n";
},"useData":true});
templates['songQueue'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.queuedSong,depth0,{"name":"queuedSong","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"song-queue_wrapper\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.songQueue : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});
})();