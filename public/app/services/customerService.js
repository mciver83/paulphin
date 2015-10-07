
var app = angular.module('ecommerce');


app.service('customerService', function($http, $q){

	// this.createTempCustomer = function(name){
	// 	return $http({
	// 		method: 'POST',
	// 		url: '/api/customers',
	// 		data: {
	// 			name: name
	// 		}
	// 	})
	// }

	this.addCustomer = function(name, email, password){
		return $http({
			method: 'POST', 
			url: '/api/customers',
			data: {
				name: name,
				local: {
					email: email,
					password: password
				}
			}
		})
	}

	this.getCustomer = function(field, value){
		return $http({
			method: 'GET',
			url: '/api/customers?' + field + '=' + value
		})
	}

	this.updateCustomer = function(id, obj){
		return $http({
			method: 'PUT',
			url: '/api/customers?id=' + id,
			data: obj
		})
	}

	this.addAddress = function(customerId, address){
		return $http({
			method: 'POST',
			url: '/api/customers/address/' + customerId,
			data: address
		})
	}
})
