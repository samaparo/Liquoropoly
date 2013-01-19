
	var Liquor = {
		Models:{
			Drink:{}
		},
		Collections:{
			DrinkCollection:{}
		},
		Views:{
			Route_IndexView:{},
			Route_ResultsView:{},
			ResultListView: {},
			EmptyResultsView: {}
		},
		AppRouter: {}
	}; 

	Liquor.Models.Drink = Backbone.Model.extend({
		initialize: function(){

		},
		defaults: {
			name:"Unknown Drink",
			description: "There's nothing here.",
			tags:[],
			prices: []
		}
	});

	Liquor.Collections.DrinkCollection = Backbone.Collection.extend({
		model: Liquor.Models.Drink,
		url: '/search'
	});

	
	Liquor.Views.ResultListView = Backbone.View.extend({
		template: _.template($("#template_searchResult").html()),
		el: "#liquor_searchResultsContainer",
		render: function(){
			var resultsHTML = "";
			var priceTemplate = _.template($("#template_searchResultPrice").html());
			var tagTemplate = _.template($("#template_searchResultTag").html());
			for(var d = 0; d<this.collection.length; d++){
				var currentDrink = this.collection.models[d];
				
				
				var drinkPrices = currentDrink.get("prices");
				var priceHTML = "";
				if(drinkPrices.length>0){
					_.each(drinkPrices, function(pri){
						priceHTML += priceTemplate({
							price: pri.value,
							size: pri.size
						});
					});
				}
				var drinkTags = currentDrink.get("tags");
				var tagHTML = "";
				if(drinkTags.length>0){
					_.each(drinkTags, function(tag){
						tagHTML += tagHTML == "" ? "" : ", "
						tagHTML += tagTemplate({
							name: tag
						});
						
						
					});
				}
				
				
				
				
				resultsHTML += this.template({
					name: currentDrink.get("name"),
					prices: priceHTML,
					tags: tagHTML
				});
			}
			$(this.el).append(resultsHTML);
		}
	});
	
	Liquor.Views.EmptyResultsView = Backbone.View.extend({
		template: _.template($("#template_searchResultEmpty").html()),
		el: "#liquor_searchResultsContainer",
		render: function(){
			var html = this.template();
			$(this.el).html(html);
		}
	});
	
	Liquor.Views.Route_IndexView = Backbone.View.extend({
		template: _.template($("#template_indexSearchOLD").html()),
		el:$("#mainContentArea"),
		events: {
			"click #liquor_homeSearch .form-search button" : "buttonSearch",
			"keypress #liquor_homeSearch .form-search input": "enterSearch"
		},
		render: function() {
			var html = this.template();
			$(this.el).html(html);
		},
		buttonSearch: function(){
			this.submitSearch();
		},
		enterSearch: function(e){
			if(e.keyCode == 13)
				this.submitSearch();
		},
		submitSearch: function(){
			var $textBox = $("#liquor_homeSearch .form-search input");
			var searchQuery = $textBox.attr("value");
			window.location = "/#/drinks/"+searchQuery;
		}
		
	});
	
	Liquor.Views.Route_ResultsView = Backbone.View.extend({
		template: _.template($("#template_searchResults").html()),
		el:$("#mainContentArea"),
		render: function(drinkQuery, isTagQuery) {
			var queryAction = "matching";
			var paramObject = {q: drinkQuery};
			if(isTagQuery !== undefined && isTagQuery===true){
				queryAction = "tagged";
				paramObject = {tag: drinkQuery};
			}
			
			var html = this.template({actionName: queryAction, drinkName:drinkQuery});
			$(this.el).html(html);
			
			var drinkResults = new Liquor.Collections.DrinkCollection();
			drinkResults.fetch({
				data: $.param(paramObject),
				success: function(){
					if(drinkResults.length>0){
						var results = new Liquor.Views.ResultListView({collection:drinkResults});
						results.render();
					}
					else{
						var emptyResult = new Liquor.Views.EmptyResultsView();
						emptyResult.render();
					}
				}
			});
			
		}
	});
	
	

	Liquor.AppRouter = Backbone.Router.extend({
		routes:{
			"":"index",
			"drinks/:name":"search",
			"tags/:name":"tagSearch"
		},
		index: function(){
			var indexView = new Liquor.Views.Route_IndexView();
			indexView.render();
		},
		search: function(name){
			var resultsView = new Liquor.Views.Route_ResultsView();
			resultsView.render(name);
		},
		tagSearch: function(name){
			var resultsView = new Liquor.Views.Route_ResultsView();
			resultsView.render(name, true);
		}

	});
	
	$(document).ready(function(){
		var appRouter = new Liquor.AppRouter();
		Backbone.history.start();
	});
