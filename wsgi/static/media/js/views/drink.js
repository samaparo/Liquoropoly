/*global Backbone */
/*global _*/
/*global jQuery*/
/*global window*/
var app = app || {};
app.Views = app.Views || {};
app.Collections = app.Collections || {};

(function ($) {
	'use strict';
	
	app.Views.DrinkView = Backbone.View.extend({
		template: _.template($("#template_searchResult").html()),
		priceTemplate: _.template($("#template_searchResultPrice").html()),
		tagTemplate: _.template($("#template_searchResultTag").html()),
		render: function (currentDrink) {
			var viewHTML, drinkPrices, priceHTML, drinkTags, tagHTML, me;
			
			me = this;
			drinkPrices = currentDrink.get("prices");
			priceHTML = "";
			if (drinkPrices.length > 0) {
				_.each(drinkPrices, function (pri) {
					priceHTML += me.priceTemplate({
						price: pri.value,
						size: pri.size
					});
				});
			}
			
			drinkTags = currentDrink.get("tags");
			tagHTML = "";
			if (drinkTags.length > 0) {
				_.each(drinkTags, function (tag) {
					tagHTML += tagHTML === "" ? "" : ", ";
					tagHTML += me.tagTemplate({
						name: tag
					});
				});
			}

			viewHTML = this.template({
				name: currentDrink.get("name"),
				prices: priceHTML,
				tags: tagHTML
			});
			
			this.$el.html(viewHTML);
			
			return this.$el;
		}
	});
	
}(jQuery));