/*global Backbone */
var app = app || {};

(function () {
	'use strict';
	
	app.AppRouter = Backbone.Router.extend({
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
	
}());