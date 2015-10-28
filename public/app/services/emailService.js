
var app = angular.module('ecommerce');




app.service('emailService', function($http){

	this.sendEmail = function(fromEmail, fromName, message){
        return $http({
		    method: "POST",
            url: '/api/email/send',
            data: {
                
                text: '<p>' + message + '</p> <p> - ' + fromName + '</p>',
                subject: 'Inquiry From Webstie',
                from_email: fromEmail,
                from_name: fromName,
                to: [{
                    "email": 'markmciver83@gmail.com',
                    "name": 'Paul',
                    "type": 'to'
                }]
                
            }
        })
    }
})