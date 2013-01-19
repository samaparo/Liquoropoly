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
	
def search(request):
	pageSize = 30
	pageNumber = 0 
	if(request.GET.__contains__("page")):
		requestedPageNumber = request.GET["page"]
		pageNumber = requestedPageNumber if requestedPageNumber.isnumeric() and requestedPageNumber>0 else 0
	searchResults = None 
	searchResultsWithTagName = None
	if(request.GET.__contains__("tag")):
		tagQuery = request.GET["tag"]
		try:
			theTag = Tag.objects.get(name__icontains=tagQuery)
			searchResults = theTag.drink_set.filter()
			
		except Tag.DoesNotExist:
			pass
		
	elif(request.GET.__contains__("q")):
		queryString = request.GET["q"]
		#results_drinkTitle = Drink.objects.filter(name__icontains=queryString)[(pageSize*pageNumber):pageSize]
		results_drinkTitle = Drink.objects.filter(name__icontains=queryString)
		results_drinkTag = list()
		try:
			foundTag = Tag.objects.get(name__icontains=queryString)
			results_drinkTag = foundTag.drink_set.filter()
		except Tag.DoesNotExist:
			pass
		searchResults = list(chain(results_drinkTitle, results_drinkTag))
	serializedDrinks=[]
	if searchResults != None:
		for drink in searchResults:
			serializedDrinks.append(drink.toJSONObject())
	returnString = simplejson.dumps(serializedDrinks, ensure_ascii=False)
	return HttpResponse(returnString, mimetype='application/json')
	
