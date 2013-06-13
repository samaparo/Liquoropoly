/*global Backbone */
/*global _*/
/*global jQuery*/
/*global window*/
var app = app || {};
app.Views = app.Views || {};
app.Collections = app.Collections || {};

(function ($) {
	'use strict';
	
	app.Views.EmptyResultsView = Backbone.View.extend({
		template: _.template($("#template_searchResultEmpty").html()),
		el: "#liquor_searchResultsContainer",
		render: function () {
			var html = this.template();
			this.$el.html(html);
			return this.$el;
		}
	});
	
	
}(jQuery));