var EmailService = require('../services/EmailService');


module.exports = {
	sendEmail: function(req, res){
		EmailService.sendEmail(req).then(function(data){
			res.send(data);
		})
	},

	sendReceipt: function(data){
		var email = {
				"body":"This message is to confirm that your order has been submitted, and payment has been recieved. Your order confirmation number is " + data._id +".",
				"subject":"Paulphin Order Confirmation Number",
				"from_email":"hello@paulphin.com",
				"from_name":"Paul",
				"to":[{
					// "email": data.customer.email[0],
					"email": data.customer.email,
					"name": data.customer.name,
					"type":"to"
			}]
		}
		EmailService.sendEmail(email).then(function(response){
			res.send(response);
		})
	},

	sendOrder: function(data){
		var email = {
				"body":"Paul, you have a new order.  http://localhost:9003/#/admin/orders.  The order id is: " + data._id +".",
				"subject":"Paulphin Order Confirmation Number",
				"from_email":"hello@paulphin.com",
				"from_name":"Your Friendly Reminder Service",
				"to":[{
					// "email": data.customer.email[0],
					"email": 'markmciver83@gmail.com',
					"name": 'Paul',
					"type":"to"
			}]
		}
		EmailService.sendEmail(email).then(function(response){
			res.send(response);
		})
	}
}
// module.exports.sendEmail = function(req, res){
// 	EmailService.sendEmail(req).then(function(data){
// 		res.send(data);
// 	})
// }
// module.exports.sendReceipt = function(data){
// 	var email = {
// 			"body":"This message is to confirm that your order has been submitted, and payment has been recieved. Your order confirmation number is " + data._id +".",
// 			"subject":"Paulphin Order Confirmation Number",
// 			"from_email":"hello@paulphin.com",
// 			"from_name":"Paul",
// 			"to":[{
// 				// "email": data.customer.email[0],
// 				"email": data.customer.email,
// 				"name": data.customer.name,
// 				"type":"to"
// 		}]
// 	}
// 	EmailService.sendEmail(email).then(function(response){
// 		res.send(response);
// 	})
// }

// module.exports.sendReceipt = function(data){
// 	var email = {
// 			"body":"This message is to confirm that your order has been submitted, and payment has been recieved. Your order confirmation number is " + data._id +".",
// 			"subject":"Paulphin Order Confirmation Number",
// 			"from_email":"hello@paulphin.com",
// 			"from_name":"Paul",
// 			"to":[{
// 				// "email": data.customer.email[0],
// 				"email": data.customer.email,
// 				"name": data.customer.name,
// 				"type":"to"
// 		}]
// 	}
// 	EmailService.sendEmail(email).then(function(response){
// 		res.send(response);
// 	})
// }



