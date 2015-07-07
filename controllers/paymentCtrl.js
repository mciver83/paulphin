var stripe = require('stripe')(
	'sk_test_hmNf5aQpZ0J4Lana3HtHlJDR'
	),
	// messageController = require('./message-controller'),
	Order = require('../models/OrderModel.js');

module.exports.submitStripe = function(req, res){
	var stripeToken = req.body.id;
	Order.get(req.query).then(function(order){
		var charge = stripe.charges.create({
			amount: order.total * 100,
			currency: "usd",
			card: stripeToken,
			description: order.customer._id + ' paying for order ' + order._id
		}, function(err, data) {
			if(err){
		  	    res.send(err);
		  	} 
		  	order.payment.status = 'paid';
		  	order.payment.confirmation = data.id;
		  	order.save(function(err, saveData){
		  		if(err){
		  			res.send(err)
		  		}
		  	// messageController.sendReceipt(saveData);
		  	res.send(saveData);
		  	})
		});
	})
};