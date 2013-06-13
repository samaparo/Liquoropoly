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
			var queryAction, paramObject, viewHTML, drinkResults, resultHTML, tempView;
			queryAction = "matching";
			paramObject = {q: drinkQuery};
			if (isTagQuery !== undefined && isTagQuery === true) {
				queryAction = "tagged";
				paramObject = {tag: drinkQuery};
			}
			
			drinkResults = new app.Collections.DrinkCollection();
			drinkResults.fetch({
				data: $.param(paramObject),
				success: function () {
					if (drinkResults.length > 0) {
						resultHTML = "";
						tempView = new app.Views.DrinkView();
						drinkResults.each(function (drink) {
							resultHTML += tempView.render(drink);
						}, this);
					} else {
						tempView = new app.Views.EmptyResultsView();
						resultHTML = tempView.render();
					}
					
					viewHTML = this.template({actionName: queryAction, drinkName: drinkQuery, results: resultHTML});
					this.$el.html(viewHTML);
					
				}
			});
			
		}
	});
	
}(jQuery));