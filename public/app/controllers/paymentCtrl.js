var app = angular.module('ecommerce');



app.controller('paymentCtrl', function($scope, order){
	console.log(order);
	$scope.order = order;
	if(!$scope.order.address.name){
		$scope.order.address.name = $scope.order.customer.name
	}

	$scope.chargeLocation = '/charge/' + $scope.order._id;
})

app.controller('confirmationCtrl', function($scope, order){
	$scope.order = order;
})
