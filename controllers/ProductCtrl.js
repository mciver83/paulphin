var Product = require('../models/ProductModel.js');

module.exports = {

	create: function(req, res){
		new Product(req.body)
		.save(function(err, data){
			if(err){
				console.log(err);
				res.status(500).send(err);
			} else {
				res.send(data)
			}
		})
	},

	get: function(req, res){
		Product.find(req.query)
		.exec(function(err, data){
			if(err){
				res.status(500).send(err);
			} else {
				res.send(data)
			}
		})
	},

	update: function(req, res){
		Product.findByIdAndUpdate(req.query.id, req.body, function(err, data){
			if(err){
				res.status(500).send(err);
			} else {
				res.send(data)
			}
		})
	},

	delete: function(req, res){
		Product.findByIdAndRemove(req.query.id, function(err, data){
			if(err){
				res.status(500).send(err);
			} else {
				res.send(data)
			}
		})
	},




}