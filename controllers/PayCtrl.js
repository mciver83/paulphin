var EmailCtrl = require('../controllers/EmailCtrl.js'),
	Order = require('../models/OrderModel.js');

var stripe = require("stripe")(
  process.env.STRIPE
);

module.exports.submitStripe = function(req, res){
	console.log(11111, req.body)
	req.session.cart = [];
	var stripeToken = req.body.stripeToken;
	Order.findById(req.params.orderId)
	.populate('products.product')
	.exec(function(err, order){
		if(err){
			res.error(500).send(err);
		} else {
			var charge = stripe.charges.create({
				amount: order.total * 100,
				currency: "usd",
				card: stripeToken,
				description: order.customer.name + ' paying for order ' + order._id
			}, function(err, data) {
				if(err){
			  	    res.send(err);
			  	} else {
				  	order.payment.status = 'paid';
				  	order.payment.confirmation = data.id;
				  	order.save(function(err, saveData){
				  		if(err){
				  			res.send(err)
				  		} else {
				  			console.log(5555, saveData)
						  	EmailCtrl.sendReceipt(saveData);
						  	EmailCtrl.sendOrder(saveData);
						  	res.redirect('/#/confirmation/' + order._id)//change this ro confirmation page
						  	// res.send(saveData);
				  		}
			  		})
				 }
			});
		}
	})
};