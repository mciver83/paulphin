var app = angular.module('ecommerce');

app.directive('mainHeader', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/directives/header.html',
		transclude: true,
		link: function(scope, element, attrs){
			element.find('#cart').hide();
			if(scope.customer){
				element.find('#store').hide();
				element.find('#cart').show();
			}
		},
		controller: function($scope, $location){
			$scope.toPath = function(location){
				if($scope.customer){
					$location.path('/' + location + '/' + $scope.customer._id)
				} else {
					$location.path('/' + location + '/')
				}
			}
		}
	}
})

app.directive('product', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/directives/product.html',
		transclude: true,
		link: function(scope, element, attrs){
			scope.$watch('cart', function(){
				element.find('.itemInCart').hide();
				element.find('i').show();
				for(var i = 0; i < scope.cart.length; i++){
					if(scope.product._id === scope.cart[i].product._id){
						element.find('i').hide()
						element.find('.itemInCart').show();
					}
				}
				var x = element.find('i');
				$(x).on('click', function(){
					$(this).hide()
					element.find('.itemInCart').show();
				});
			})
		}
	}
})

app.directive('popUp', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){

			element.on('click', function(){
				$(this)
					.toggleClass('pop-up')
					.siblings()
						.toggle()
					.parent()
						.toggleClass('pop-up-back')
				scope.$apply();
			});

		}
	}
})

app.directive('storeLogin', function(){
	return {
		restrict: 'AE',
		templateUrl: 'app/directives/store-login.html',
		controller: function($scope, $location, customerService){
			$scope.toStore = function(){
				if($scope.customer){
					$location.path('/shop/' + $scope.customer._id)
				} else {
					$scope.showLogin = !$scope.showLogin;
				}
				
			}

			$scope.createTempCustomer = function(){
				var customer = 'guest' + Math.floor(Math.random() * 100000);
				customerService.createTempCustomer(customer).then(function(response){
					customerService.getCustomer('name', customer).then(function(response){
						var customer = response.data[0];
						$scope.customer = customer;
						$location.path('/shop/' + customer._id);
					})
				})
			}
		}
	}
})

app.directive('cart', function(){
	return {
		restrict: 'AE',
		templateUrl: 'app/directives/cart.html',
		// link: function(scope, element, attrs){
		// 	element.find('.pop-up-back').on('click', function(){
		// 		scope.show = !scope.show;
		// 	})
		// },
		controller: function($scope, cartService, $location, customerService){
			if($scope.customer){
				$scope.cart = $scope.customer.cart;
				var total = 0;
				for(var i = 0; i < $scope.cart.length; i++){
					$scope.cart[i].total = $scope.cart[i].quantity * $scope.cart[i].product.price;
					total += $scope.cart[i].total;
					$scope.total = total.toFixed(2);
				}
			}

			$scope.getCustomer = function(){
				customerService.getCustomer('_id', $scope.customer._id).then(function(response){
					$scope.customer = response.data[0];
					$scope.cart = $scope.customer.cart;
					$scope.total = 0;
					for(var i = 0; i < $scope.cart.length; i++){
						$scope.cart[i].total = $scope.cart[i].product.price * $scope.cart[i].quantity;
						$scope.total += Number($scope.cart[i].total);
					}
				})
			}

			$scope.removeItem = function(customerId, itemId){
				if(confirm('remove item from cart?')){
					cartService.removeItem(customerId, itemId).then(function(response){
						$scope.getCustomer();
					})	
				}
			}

			$scope.updateItem = function(customerId, itemId, quantity){
				cartService.updateItem(customerId, itemId, quantity).then(function(response){
					$scope.getCustomer();
				})
			}

			$scope.checkout = function(){
				$location.path('/checkout/' + $scope.customer._id);
			}

			$scope.showCart = function(){
				$scope.show = !$scope.show;
			}
			$scope.backToStore = function(){
				$scope.show = !$scope.show;
				$location.path('/shop/' + $scope.customer._id)
			}
		}
	}
})

