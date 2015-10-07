
var app = angular.module('ecommerce');



app.service('emailService', function($http){

	this.sendEmail = function(fromEmail, fromName, message){
		  return $http({
		    method: "POST",
		    url: "https://mandrillapp.com/api/1.0/messages/send.json",
		    data: {
		      'key': 'kVmO5l-VdDYKz2MET4sJ3A',
		      'message': {
		        'from_email': fromEmail,
		        'to': [
		          {
		            'email': 'paulphin.photography@gmail.com',
		            'name': 'Paul',
		            'type': 'to'
		          }
		        ],
		        'subject': 'Inquiry From Website',
		        'html': '<p>' + message + '</p> <p> - ' + fromName + '</p>'
		      }
		    }
		  })
		}
})