/*global Backbone */
/*global _*/
/*global jQuery*/
/*global window*/
var app = app || {};
app.Views = app.Views || {};

(function ($) {
	'use strict';
	
	app.Views.SearchView = Backbone.View.extend({
		template :  _.template($("#template_indexSearchOLD").html()),
		el : $("#mainContentArea"),
		events : {
			"click #liquor_homeSearch .form-search button" : "buttonSearch",
			"keypress #liquor_homeSearch .form-search input": "enterSearch"
		},
		render : function () {
			var html = this.template();
			this.$el.html(html);
		},
		buttonSearch : function () {
			this.submitSearch();
		},
		enterSearch : function (e) {
			if (e.keyCode === 13) {
				this.submitSearch();
			}
		},
		submitSearch : function () {
			var $textBox, searchQuery;
			$textBox = $("#liquor_homeSearch .form-search input");
			searchQuery = $textBox.attr("value");
			window.location = "/#/drinks/" + searchQuery;
		}
		
	});
}(jQuery));