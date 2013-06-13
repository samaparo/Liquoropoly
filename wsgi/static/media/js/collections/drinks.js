/*global Backbone */
var app = app || {};
app.Collections = app.Collections || {};

(function () {
	'use strict';
	
	app.Collections.DrinkCollection = Backbone.Collection.extend({
		model : app.Models.Drink,
		url : '/search'
	});
	
}());