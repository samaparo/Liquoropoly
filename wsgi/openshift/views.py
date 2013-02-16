import os
from django.http import HttpResponse
from django.template import Context, loader
from django.shortcuts import render_to_response, get_object_or_404
from openshift.models import Drink, Size, Price, Tag
from django.utils import simplejson
from django.core import serializers
from itertools import chain

def index(request):	
	indexTemplate = loader.get_template('index.html')
	return HttpResponse(indexTemplate.render(Context()))

#TODO: Change service format to /drinks/query
def search(request):
	searchResults = None 
	
	#TODO: Break into separate view method with service format /tags/id
	if(request.GET.__contains__("tag")):
		tagQuery = request.GET["tag"]
		try:
			theTag = Tag.objects.get(name=tagQuery)
			searchResults = theTag.drink_set.filter()
		except Tag.DoesNotExist:
			pass
	
	elif(request.GET.__contains__("q")):
		queryString = request.GET["q"]
		
		results_drinkTitle = Drink.objects.filter(name__icontains=queryString)
		
		results_drinkTag = set()
		matchingTags = Tag.objects.filter(name__icontains=queryString)
		for currentTag in matchingTags:
			taggedDrinks = currentTag.drink_set.filter()
			results_drinkTag = set(chain(results_drinkTag, taggedDrinks))

		searchResults = set(chain(results_drinkTitle, results_drinkTag))
	serializedDrinks=[]
	if searchResults != None:
		for drink in searchResults:
			serializedDrinks.append(drink.toJSONObject())
	returnString = simplejson.dumps(serializedDrinks, ensure_ascii=False)
	return HttpResponse(returnString, mimetype='application/json')
	
