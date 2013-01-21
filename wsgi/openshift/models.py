from django.db import models
		
class Tag(models.Model):
	name = models.CharField(max_length=50, db_index=True)
	
	def __unicode__(self):
		return self.name
		
class Size(models.Model):
	value = models.CharField(max_length=50)
	
	def __unicode__(self):
		return str(self.value)
		
class Drink(models.Model):
	name = models.CharField(max_length=200, db_index=True)
	description = models.TextField(blank=True)
	tags = models.ManyToManyField(Tag, blank=True)
	imageID = models.CharField(max_length=10, blank=True)
	def __unicode__(self):
		return self.name
	def toJSONObject(self):
		tagList = []
		for tag in self.tags.all():
			tagList.append(tag.name)
		
		priceList = []
		for price in self.price_set.all():
			priceList.append({
				'value': price.value,
				'size': price.size.value
			})
		returnObject = {
			'name':self.name,
			'description': self.description,
			'tags':tagList,
			'prices':priceList
		}
		return returnObject
		
class Price(models.Model):
	value = models.FloatField()
	drink = models.ForeignKey(Drink)
	size = models.ForeignKey(Size)
	
	def __unicode__(self):
		return self.drink.__unicode__() + ' ' + self.size.__unicode__() + '- $' + str(self.value) 