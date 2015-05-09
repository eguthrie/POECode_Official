all : public/js/partials.js public/stylesheets/style.css

public/js/partials.js : views/partials/*
	handlebars views/partials -pf public/js/partials.js

public/stylesheets/style.css : stylus/style.styl
	stylus stylus/ -o public/stylesheets
