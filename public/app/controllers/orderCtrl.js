var app = angular.module('ecommerce');



//admin orders
app.controller('orderCtrl', function($scope, orders, adminService){
	$scope.orders = orders;
	$scope.showOrder = function(order){
		order.show = !order.show
	}

	$scope.paymentStatusOptions = ['waiting', 'processing', 'paid'];
	$scope.orderStatusOptions = ['processing', 'shipping', 'on hold', 'delivered'];

	$scope.updateOrder = function(orderId, paymentStatus, orderStatus){

		adminService.updateOrder(orderId, paymentStatus, orderStatus).then(function(response){
			Materialize.toast('order updated', 1000);
		})
	}
})
