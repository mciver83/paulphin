var app = angular.module('ecommerce');



app.service('cartService', function($http, $q){

	this.addToCart = function(data){
		return $http({
			method: 'POST',
			url: '/api/cart/',
			data: data
		})		

	}

	this.getCart = function(){
		return $http({
			method: 'GET',
			url: '/api/cart'
		})
	}

	this.updateItem = function(data){
		return $http({
			method: 'PUT',
			url: '/api/cart',
			data: data
		})
	}

	this.removeItem = function(id){
		return $http({
			method: 'PUT',
			url: '/api/cart/remove',
			data: {
				id: id
			}
		})
	}
	
})
