var Photo = require('../models/PhotoModel.js');

module.exports = {

	create: function(req, res){
		new Photo(req.body)
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
		Photo.find(req.query)
		.exec(function(err, data){
			if(err){
				console.log(err);
				res.status(500).send(err);
			} else {
				res.send(data)
			}
		})
	},

	update: function(req, res){
		Photo.findByIdAndUpdate(req.query.id, req.body, function(err, data){
			if(err){
				res.status(500).send(err);
			} else {
				res.send(data)
			}
		})
	},

	delete: function(req, res){
		Photo.findByIdAndRemove(req.query.id, function(err, data){
			if(err){
				res.status(500).send(err);
			} else {
				res.send(data)
			}
		})
	},




}