(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
Handlebars.partials['queuedSong'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"song-queued\" id=\""
    + alias3(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n  <p>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + " - "
    + alias3(((helper = (helper = helpers.artist || (depth0 != null ? depth0.artist : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"artist","hash":{},"data":data}) : helper)))
    + "</p>\n  <div class=\"remove-song\">X</div>\n</div>\n";
},"useData":true});
Handlebars.partials['song'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"song-thumb\" id=\""
    + alias3(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n  <h1>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + " - "
    + alias3(((helper = (helper = helpers.artist || (depth0 != null ? depth0.artist : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"artist","hash":{},"data":data}) : helper)))
    + "</h1>\n  <img src=\""
    + alias3(((helper = (helper = helpers.artPath || (depth0 != null ? depth0.artPath : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"artPath","hash":{},"data":data}) : helper)))
    + "\" class=\"art\"></img>\n  <div class=\"queue-song\">Add to queue</div>\n  <div class=\"remove-song\">X</div>\n</div>\n";
},"useData":true});
Handlebars.partials['songQueue'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.queuedSong,depth0,{"name":"queuedSong","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"song-queue\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.songQueue : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});
Handlebars.partials['songThumbs'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.invokePartial(partials.song,depth0,{"name":"song","data":data,"indent":"    ","helpers":helpers,"partials":partials})) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"song-thumbs\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.songs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});
})();