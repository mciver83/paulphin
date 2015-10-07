var app = angular.module('ecommerce');



// controls the ordering process
app.controller('checkoutCtrl', function($scope, $location, customerService, cartService, orderService, cart){

	// $scope.customer = customer;
	$scope.cart = cart;
	console.log(cart)

	var total = 0;
	for(var i = 0; i < $scope.cart.length; i++){
		$scope.cart[i].total = $scope.cart[i].quantity * $scope.cart[i].price;
		total += $scope.cart[i].total;
		$scope.total = total.toFixed(2);
	}

	$scope.backToShop = function(){
		$location.path('/store/');
	}

	$scope.placeOrder = function(customer, address, products){
		var order = {
			customer: customer,
			products: products,
			total: $scope.total,
			address: address
		}
		orderService.placeOrder(order).then(function(response){
			$location.path('/payment/' + response.data._id);
		}, function(err){
			Materialize.toast('something went wrong', 1000)
			console.log(err);
		})
	}

	$scope.submitShippingInfo = function(name, email, shipTo, address, address2, city, state, zip){
		var customer = {
			name: name,
			email: email
		}

		var address = {
			name: shipTo,
			address: address,
			address2: address2, 
			city: city,
			state: state,
			zip: zip
		}

		var products = [];
		for(var i = 0; i < $scope.cart.length; i++){
			if($scope.cart[i].photo){
				var product = {
					product: $scope.cart[i].item.id,
					photo: $scope.cart[i].photo.id,
					price: $scope.cart[i].item.price,
					quantity: $scope.cart[i].quantity
				}
			} else {
				product = {
					product: $scope.cart[i].item.id,
					price: $scope.cart[i].item.price,
					quantity: $scope.cart[i].quantity
				}
			}
			products.push(product);
		}


		$scope.placeOrder(customer, address, products);
	}
})




