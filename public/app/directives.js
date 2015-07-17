var app = angular.module('ecommerce');


app.directive("ngFileSelect",function(){

  return {
    link: function($scope,el){
      
      el.bind("change", function(e){
      
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })
      
    }
    
  }
})

// app.directive("parallax", ["$timeout", function($timeout){
//     return {
//         link: function(scope, element, attrs) {
//             $timeout(function(){
//                 element.parallax();
//             });
//         }
//     };
// }]);


app.directive('mainHeader', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/directives/header.html'
		// transclude: true,
		// link: function(scope, element, attrs){
		// 	scope.$watch('cart', function(){
		// 		element.find('#cart').hide();
		// 		if(scope.cart && scope.cart.length > 0){
		// 			element.find('#store').hide();
		// 			element.find('#cart').show();
		// 		} else {
		// 			element.find('#store').show();
		// 			element.find('#cart').hide();
		// 		}
		// 	})
		// },
		// controller: function($scope, $location, customerService){
		// 	$scope.toPath = function(location){
		// 		if($scope.customer){
		// 			$location.path('/' + location + '/' + $scope.customer._id)
		// 		} else {
		// 			$location.path('/' + location + '/')
		// 		}
		// 	}
		// 	$scope.toStore = function(){
		// 		if($scope.customer){
		// 			$location.path('/shop/' + $scope.customer._id)
		// 		} else {
		// 			($scope.createTempCustomer = function(){
		// 				// var customer = "Paul Johnson"
		// 				var customer = 'guest' + Math.floor(Math.random() * 100000);
		// 				customerService.createTempCustomer(customer).then(function(response){
		// 					customerService.getCustomer('name', customer).then(function(response){
		// 						console.log(response.data[0])
		// 						var customer = response.data[0];
		// 						$scope.customer = customer;
		// 						$location.path('/store/' + $scope.customer._id);
		// 					})
		// 				})
		// 			})()
		// 		}
		// 	}
		// }				
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
					if(scope.product._id === scope.cart[i].item.id){
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


app.directive('item', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/directives/buildItem.html',
		link: function(scope, element, attrs){

		}
	}
})

app.directive('photo', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/directives/buildImage.html'
	}
})

app.directive('popUp', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){

			element.on('click', function(){
				var elem = $(this).parent()
				var popUpItem = elem.find('img')
					popUpItem
						.toggleClass('pop-up')
						.siblings()
							.toggle()
						.parent()
							.toggleClass('pop-up-back')	
						
							// .toggleClass('align-items-center')
							// .toggleClass('content-center')
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
			// $scope.toStore = function(){
			// 	if($scope.customer){
			// 		$location.path('/shop/' + $scope.customer._id)
			// 	} else {
			// 		$scope.showLogin = !$scope.showLogin;
			// 	}
				
			// }

			// $scope.createTempCustomer = function(){
			// 	var customer = 'guest' + Math.floor(Math.random() * 100000);
			// 	customerService.createTempCustomer(customer).then(function(response){
			// 		customerService.getCustomer('name', customer).then(function(response){
			// 			var customer = response.data[0];
			// 			$scope.customer = customer;
			// 			$location.path('/shop/' + customer._id);
			// 		})
			// 	})
			// }
		}
	}
})

app.directive('cart', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/directives/cart.html',
		link: function(scope, element, attrs){
			if(scope.cart){
				scope.$watch('cart', function(){
					var total = 0;
					for(var i = 0; i < scope.cart.length; i++){
						scope.cart[i].total = scope.cart[i].quantity * scope.cart[i].item.price;
						total += scope.cart[i].total;
						scope.total = total.toFixed(2);
					}
				})
			}
		},
		controller: function($scope, cartService, $location, customerService){

			
			
			// if($scope.customer){
			// 	$scope.cart = $scope.customer.cart;
			// 	var total = 0;
			// 	for(var i = 0; i < $scope.cart.length; i++){
			// 		$scope.cart[i].total = $scope.cart[i].quantity * $scope.cart[i].product.price;
			// 		total += $scope.cart[i].total;
			// 		$scope.total = total.toFixed(2);
			// 	}
			// }

			// $scope.getCustomer = function(){
			// 	customerService.getCustomer('_id', $scope.customer._id).then(function(response){
			// 		$scope.customer = response.data[0];
			// 		$scope.cart = $scope.customer.cart;
			// 		$scope.total = 0;
			// 		for(var i = 0; i < $scope.cart.length; i++){
			// 			$scope.cart[i].total = $scope.cart[i].product.price * $scope.cart[i].quantity;
			// 			$scope.total += Number($scope.cart[i].total);
			// 		}
			// 	})
			// }

			// $scope.removeItem = function(customerId, itemId){
			// 	if(confirm('remove item from cart?')){
			// 		cartService.removeItem(customerId, itemId).then(function(response){
			// 			$scope.getCustomer();
			// 		})	
			// 	}
			// }

			$scope.updateItem = function(item, id, quantity){
				console.log(22222222, item, id, quantity)
				var data = {
					id: id,
					quantity: quantity
				}
				cartService.updateItem(data).then(function(response){
					$scope.cart = response.data
				})
			}

			$scope.removeItem = function(item, id){
				console.log(3333333, item,444444, id)
				cartService.removeItem(id).then(function(response){
					$scope.cart = response.data
				})
			}

			$scope.checkout = function(){
				$location.path('/checkout/');
			}

			$scope.showCart = function(){
				$scope.show = !$scope.show;
			}
			$scope.backToStore = function(){
				$scope.show = !$scope.show;
				$location.path('/store/')
			}
		}
	}
})

