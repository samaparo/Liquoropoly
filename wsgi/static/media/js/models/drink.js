/*global Backbone */
var app = app || {};
app.Models = app.Models || {};

(function () {
	'use strict';
	
	app.Models.Drink = Backbone.Model.extend({
		initialize: function () {
		},
		defaults: {
			name : "Unknown Drink",
			description : "There's nothing here.",
			tags : [],
			prices : []
		}
	});
	
}());