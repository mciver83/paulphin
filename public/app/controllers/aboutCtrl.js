var app = angular.module('ecommerce');




//about page
app.controller('aboutCtrl', function($scope, instagram, photos){

	$scope.feed = instagram;

	$scope.carouselPhotos = photos
	