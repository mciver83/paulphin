var app = angular.module('ecommerce');

var herokuURL = 'paulphin.herokuapp.com';
// var herokuURL = 'http://localhost:9003'


app.service('instagramService', function($http, $q){
	this.getFeed = function(){
		var dfd = $q.defer();
		$http({
			method: 'JSONP',
			url: 'https://api.instagram.com/v1/users/145888570/media/recent?client_id=c57fca1cbfee4fa881b557e38fb948f8&callback=JSON_CALLBACK'
		}).then(function(response){
			dfd.resolve(response.data.data)
		})
		return dfd.promise;
	}
})