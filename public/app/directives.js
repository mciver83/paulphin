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


app.directive('mainHeader', function(){
	return {
		restrict: 'E',
		templateUrl: 'app/directives/header.html'
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
						.parent()
							.toggleClass('pop-up-back')	
				if(popUpItem.siblings()){
					popUpItem.siblings().toggle()
				}
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

