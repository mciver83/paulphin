var app = angular.module('ecommerce');





//contact page
app.controller('contactCtrl', function($scope, emailService){


	$scope.sendEmail = function(fromEmail, fromName, message){
		emailService.sendEmail(fromEmail, fromName, message).then(function(response){
			$scope.fromEmail = '';
			$scope.fromName = '';
			$scope.message = '';
			Materialize.toast('your message has been sent', 1000);
		}, function(err){
			Materialize.toast('your message could not be send', 1000)
		})
	}
})