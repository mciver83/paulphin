var app = angular.module('ecommerce');


//controls the shopping area and views products
app.controller('shopCtrl', function($scope, $location, productService, cartService, cart, customerService, products, photos){

	$scope.createAdmin = function(){
		customerService.addCustomer('Paul Johnson', 'hello@paulphin.com', 'test').then(function(response){
			Materialize.toast('user created', 1000)
		})

	}

	$scope.cart = cart;


	$scope.products = products;
	$scope.photos = photos;
	

	$scope.favorites = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'favorite'){
			$scope.favorites.push($scope.products[i])
		}
	}

	$scope.buildProducts = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'product'){
			$scope.buildProducts.push($scope.products[i])
		}
	}


	$scope.print = 'print';
	$scope.item = 'product';

	$scope.item = '';
	$scope.imageUrl = '';




	$scope.buildItem = function(item){
		$scope.product = item;
		$scope.item = item.image;
	}

	$scope.buildImage = function(image){
		$scope.photo = image;
		$scope.imageUrl = image.imageUrl;
	}


	$scope.addToCart = function(item, photo){
		if(!item){
			Materialize.toast('nothing added to cart', 1000)
		}
		if(photo){
			var product = {
				item: {
					id: item._id,
					title: item.title,
					imageUrl: item.image,
					price: item.price,
				},
				photo: {
					id: photo._id,
					imageUrl: photo.imageUrl
				}, 
				quantity: 1
			}
		} else {
			var product = {
				item: {
					id: item._id,
					title: item.title,
					imageUrl: item.image,
					price: item.price,
				}, 
				quantity: 1
			}
		}
		cartService.addToCart(product).then(function(response){
			$scope.imageUrl = '';
			$scope.item = '';
			$scope.cart = response.data;
			Materialize.toast('item added to cart', 1000);
		})
	}
})