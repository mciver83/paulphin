var stripe = require('stripe')(
	'sk_test_hmNf5aQpZ0J4Lana3HtHlJDR'
	),
	EmailCtrl = require('../controllers/EmailCtrl.js'),
	Order = require('../models/OrderModel.js');

module.exports.submitStripe = function(req, res){
	var stripeToken = req.body.stripeToken;
	Order.findById(req.params.orderId)
	.populate('customer')
	.populate('products.product')
	.exec(function(err, order){
		if(err){
			res.error(500).send(err);
		} else {
			var charge = stripe.charges.create({
				amount: order.total * 100,
				currency: "usd",
				card: stripeToken,
				description: order.customer._id + ' paying for order ' + order._id
			}, function(err, data) {
				if(err){
			  	    res.send(err);
			  	} else {
				  	order.payment.status = 'paid';
				  	order.payment.confirmation = data.id;
				  	order.save(function(err, saveData){
				  		if(err){
				  			res.send(err)
				  		}
				  	EmailCtrl.sendReceipt(saveData);
				  	res.send(saveData);
			  		})
				 }
			});
		}
	})
};