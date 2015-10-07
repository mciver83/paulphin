
var app = angular.module('ecommerce');



app.service('orderService', function($http, $q, $routeParams){

	this.placeOrder = function(order){
		return $http({
			method: 'POST',
			url: '/api/orders',
			data: order
		})
	}

	this.getOrder = function(id){
		return $http({
			method: 'GET',
			url: '/api/orders/?_id=' + id
		})
	}

	this.getOrders = function(){
		return $http({
			method: 'GET',
			url: '/api/orders'
		})
	}

	this.updateOrder = function(id, paymentStatus, orderStatus){
		return $http({
			method: 'PUT',
			url: '/api/orders/?_id=' + id,
			data: {
				status: orderStatus
			}
		})
	}

})

