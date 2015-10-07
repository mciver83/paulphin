
var app = angular.module('ecommerce');



app.service('productService', function($http, $q){


	this.getProducts = function(){
		return $http({
			method: 'GET',
			url: '/api/products'
		})
	}

	this.getOneProduct = function(id){
		return $http({
			method: 'GET',
			url: '/api/products?_id=' + id
		})
	}

})

