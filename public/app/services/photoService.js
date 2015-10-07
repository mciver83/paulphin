
var app = angular.module('ecommerce');


app.service('photoService', function($http, $q){


	this.getPhotos = function(){
		return $http({
			method: 'GET',
			url: '/api/photos'
		})
	}

	this.getOnePhoto = function(id){
		return $http({
			method: 'GET',
			url: '/api/photos?_id=' + id
		})
	}

})
