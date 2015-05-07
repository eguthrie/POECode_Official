(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
Handlebars.partials['queuedSong'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<div class=\"song-queued\" id=\""
    + escapeExpression(((helper = helpers._id || (depth0 && depth0._id)),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"queued-left\">\n    <img class=\"queued-art\" src=\""
    + escapeExpression(((helper = helpers.artPath || (depth0 && depth0.artPath)),(typeof helper === functionType ? helper.call(depth0, {"name":"artPath","hash":{},"data":data}) : helper)))
    + "\"/>\n  </div>\n  <div class=\"queued-right\">\n    <h4>"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\n    <h5>"
    + escapeExpression(((helper = helpers.artist || (depth0 && depth0.artist)),(typeof helper === functionType ? helper.call(depth0, {"name":"artist","hash":{},"data":data}) : helper)))
    + "</h5>\n    <i class=\"remove-song pe-lg pe-7s-close\"></i>\n  </div>\n</div>\n";
},"useData":true});
Handlebars.partials['song'] = template({"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", escapeExpression=this.escapeExpression;
  return "<div class=\"song-thumb\" id=\""
    + escapeExpression(((helper = helpers._id || (depth0 && depth0._id)),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n  <i class=\"remove-song pe-lg pe-7s-close\"></i>\n  <h2>"
    + escapeExpression(((helper = helpers.name || (depth0 && depth0.name)),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h1>\n  <h3>"
    + escapeExpression(((helper = helpers.artist || (depth0 && depth0.artist)),(typeof helper === functionType ? helper.call(depth0, {"name":"artist","hash":{},"data":data}) : helper)))
    + "</h2>\n  <img src=\""
    + escapeExpression(((helper = helpers.artPath || (depth0 && depth0.artPath)),(typeof helper === functionType ? helper.call(depth0, {"name":"artPath","hash":{},"data":data}) : helper)))
    + "\" class=\"art\"></img>\n</div>\n";
},"useData":true});
Handlebars.partials['songQueue'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\n    ";
  stack1 = this.invokePartial(partials.queuedSong, 'queuedSong', depth0, undefined, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n  ";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"song-queue\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.songQueue), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n</div>";
},"usePartial":true,"useData":true});
Handlebars.partials['songThumbs'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "\n    ";
  stack1 = this.invokePartial(partials.song, 'song', depth0, undefined, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n  ";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"song-thumbs\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.songs), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n</div>";
},"usePartial":true,"useData":true});
})();