var app = angular.module('ecommerce');



app.controller('excursionCtrl', function($scope, $location, cart, cartService, authService, products, photos, user){
	$scope.user = user;
	$scope.photos = photos;
	$scope.products = products;
	$scope.cart = cart;
	$scope.buildProducts = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'product'){
			$scope.buildProducts.push($scope.products[i])
		}
	}
	// console.log(55555, $scope.photos)
	$scope.excursionPhotos = []

	for(var i = 0; i < $scope.photos.length; i++){
		if($scope.user && $scope.photos[i].auth === $scope.user.local.email){
			$scope.excursionPhotos.push($scope.photos[i])
			console.log(22222,$scope.excursionPhotos)
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

	


	// console.log(111111, $scope.user)
	if(!$scope.user){
		$scope.showLogin = !$scope.showLogin;
	}

	$scope.login = function(date, password){
		authService.login(date, password).then(function(response){
			// console.log(44444,response.data)
			$scope.user = response.data;
			$scope.showLogin = !$scope.showLogin;
			// console.log(66666, $scope.user.local.email)

			for(var i = 0; i < $scope.photos.length; i++){
				if($scope.photos[i].auth === $scope.user.local.email){
					$scope.excursionPhotos.push($scope.photos[i])
					console.log(3333,$scope.excursionPhotos)
				}
			}
			
		}, function(err){
			$scope.errorMessage = "wrong date and/or passowrd"
		})
	}

	
	
})