/*global Backbone */
/*global _*/
/*global jQuery*/
/*global window*/
var app = app || {};
app.Views = app.Views || {};
app.Collections = app.Collections || {};

(function ($) {
	'use strict';
	
	app.Views.ResultsView = Backbone.View.extend({
		template : _.template($("#template_searchResults").html()),
		el : $("#mainContentArea"),
		render : function (drinkQuery, isTagQuery) {
			var queryAction, paramObject, viewHTML, drinkResults, resultHTML, tempView, me;
			queryAction = "matching";
			paramObject = {q: drinkQuery};
			if (isTagQuery !== undefined && isTagQuery === true) {
				queryAction = "tagged";
				paramObject = {tag: drinkQuery};
			}
			
			me = this;
			drinkResults = new app.Collections.DrinkCollection();
			drinkResults.fetch({
				data: $.param(paramObject),
				success: function () {
					if (drinkResults.length > 0) {
						resultHTML = "";
						tempView = new app.Views.DrinkView();
						drinkResults.each(function (drink) {
							resultHTML += tempView.render(drink).html();
						}, this);
					} else {
						tempView = new app.Views.EmptyResultsView();
						resultHTML = tempView.render().html();
					}
					
					viewHTML = me.template({actionName: queryAction, drinkName: drinkQuery, results: resultHTML});
					me.$el.html(viewHTML);
					
				}
			});
			
		}
	});
	
}(jQuery));