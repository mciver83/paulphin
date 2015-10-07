
var app = angular.module('ecommerce');


app.service('authService', function($http){
	
	this.login = function(email, password){
		return $http({
			method: 'POST',
			url: '/api/login',
			data: {
				email: email,
				password: password
			}
		})
	}

	this.auth = function(){
		return $http({
			method: 'GET',
			url: '/api/auth'
		})
	}

})