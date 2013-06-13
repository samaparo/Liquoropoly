/*global Backbone */
var app = app || {};

(function () {
	'use strict';
	
	var MainRouter = Backbone.Router.extend({
		routes : {
			"" : "index",
			"drinks/:name" : "search",
			"tags/:name" : "tagSearch"
		},
		index : function () {
			var indexView = new app.Views.SearchView();
			indexView.render();
		},
		search : function (name) {
			var resultsView = new app.Views.ResultsView();
			resultsView.render(name);
		},
		tagSearch : function (name) {
			var resultsView = new app.Views.ResultsView();
			resultsView.render(name, true);
		}

	});
	
	app.AppRouter = new MainRouter();
	Backbone.history.start();
	
}());