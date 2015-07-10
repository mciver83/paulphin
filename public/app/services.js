
var app = angular.module('ecommerce');


app.service('instagramService', function($http, $q){
	this.getFeed = function(){
		var dfd = $q.defer();
		$http({
			method: 'JSONP',
			url: 'https://api.instagram.com/v1/users/145888570/media/recent?client_id=c57fca1cbfee4fa881b557e38fb948f8&callback=JSON_CALLBACK'
		}).then(function(response){
			dfd.resolve(response.data.data)
		})
		return dfd.promise;
	}
})




app.service('adminService', function($http){

	this.addProduct = function(title, price, image, description, type){
		return $http({
			method: 'POST',
			url: 'http://localhost:9003/admin/products',
			data: {
				title: title,
				price: price,
				image: image,
				description: description,
				type: type
			}
		})
	}

	this.getProducts = function(){
		return $http({
			method: 'GET',
			url: 'http://localhost:9003/admin/products'
		})
	}

	this.updateProduct = function(id, title, description, price, type){
		return $http({
			method: 'PUT',
			url: 'http://localhost:9003/admin/products?id=' + id,
			data: {

				title: title,
				description: description,
				price: price,
				type: type
			}
		})
	}

	this.removeProduct = function(id){
		return $http({
			method: 'DELETE',
			url:'http://localhost:9003/admin/products?id=' + id
		})
	}

	this.getOrders = function(){
		return $http({
			method: 'GET',
			url: 'http://localhost:9003/admin/orders'
		})
	}

	this.updateOrder = function(id, paymentStatus, orderStatus){
		return $http({
			method: 'PUT',
			url: 'http://localhost:9003/admin/orders/?_id=' + id,
			data: {
				'payment.status': paymentStatus,
				status: orderStatus
			}
		})
	}
	
})





app.service('productService', function($http, $q){


	// this.addProduct = function(title, price, image, description){
	// 	return $http({
	// 		method: 'POST',
	// 		url: 'http://localhost:9003/api/products',
	// 		data: {
	// 			title: title,
	// 			price: price,
	// 			image: image,
	// 			description: description,
	// 		}
	// 	})
	// }

	this.getProducts = function(){
		return $http({
			method: 'GET',
			url: 'http://localhost:9003/api/products'
		})
	}

	this.getOneProduct = function(id){
		return $http({
			method: 'GET',
			url: 'http://localhost:9003/api/products?_id=' + id
		})
	}

	// this.updateProduct = function(id, title, description, price){
	// 	return $http({
	// 		method: 'PUT',
	// 		url: 'http://localhost:9003/api/products?id=' + id,
	// 		data: {

	// 			title: title,
	// 			description: description,
	// 			price: price
	// 		}
	// 	})
	// }

	// this.removeProduct = function(id){
	// 	return $http({
	// 		method: 'DELETE',
	// 		url:'http://localhost:9003/api/products?id=' + id
	// 	})
	// }
})

app.service('customerService', function($http, $q){

	this.createTempCustomer = function(name){
		return $http({
			method: 'POST',
			url: 'http://localhost:9003/api/customers',
			data: {
				name: name
			}
		})
	}

	this.addCustomer = function(name){
		return $http({
			method: 'POST', 
			url: 'http://localhost:9003/customers',
			data: {
				name: name
			}
		})
	}

	this.getCustomer = function(field, value){
		return $http({
			method: 'GET',
			url: 'http://localhost:9003/api/customers?' + field + '=' + value
		})
	}

	this.updateCustomer = function(id, obj){
		return $http({
			method: 'PUT',
			url: 'http://localhost:9003/api/customers?id=' + id,
			data: obj
		})
	}

	this.addAddress = function(customerId, address){
		return $http({
			method: 'POST',
			url: 'http://localhost:9003/api/customers/address/' + customerId,
			data: address
		})
	}
})

app.service('cartService', function($http, $q){
	// use this if sessions doesn't work
	// this.addToCart = function(customerId, productId, price){
	// 	return $http({
	// 		method: 'POST',
	// 		url: 'http://localhost:9003/api/customers/cart/' + customerId,
	// 		data: {
	// 			product: productId,
	// 			price: price
	// 		}
	// 	})
	// }
	// this.updateItem = function(customerId, itemId, quantity){
	// 	return $http({
	// 		method: 'PUT',
	// 		url: 'http://localhost:9003/api/customers/cart/' + customerId + '/' + itemId,
	// 		data: {
	// 			'cart.$.quantity': quantity
	// 		}
	// 	})
	// }

	// this.removeItem = function(customerId, itemId){
	// 	return $http({
	// 		method: 'DELETE',
	// 		url: 'http://localhost:9003/api/customers/cart/' + customerId + '/' + itemId
	// 	})
	// }


	this.addToCart = function(data){
		return $http({
			method: 'POST',
			url: 'http://localhost:9003/api/cart/',
			data: data
		})		

	}

	this.getCart = function(){
		return $http({
			method: 'GET',
			url: 'http://localhost:9003/api/cart'
		})
	}

	this.updateItem = function(data){
		return $http({
			method: 'PUT',
			url: 'http://localhost:9003/api/cart',
			data: data
		})
	}

	this.removeItem = function(id){
		console.log(11111,id)
		return $http({
			method: 'PUT',
			url: 'http://localhost:9003/api/cart/remove',
			data: {
				id: id
			}
		})
	}



	
})

app.service('orderService', function($http, $q, $routeParams){

	this.placeOrder = function(order){
		return $http({
			method: 'POST',
			url: 'http://localhost:9003/api/orders',
			data: order
		})
	}

	this.getOrder = function(id){
		return $http({
			method: 'GET',
			url: 'http://localhost:9003/api/orders/?_id=' + id
		})
	}

	this.getOrders = function(){
		return $http({
			method: 'GET',
			url: 'http://localhost:9003/api/orders'
		})
	}

	this.updateOrder = function(id, paymentStatus, orderStatus){
		return $http({
			method: 'PUT',
			url: 'http://localhost:9003/api/orders/?_id=' + id,
			data: {
				status: orderStatus
			}
		})
	}

	// this.submitStripe = function(token){
	// 	return $http({
	// 		method: 'POST',
	// 		url: '/api/orders/' + $routeParams.id + '/payment',
	// 		data: token
	// 	})
	// }
})

app.service('emailService', function($http){

	this.sendEmail = function(fromEmail, fromName, toEmail, toName, subject, message){
		  return $http({
		    method: "POST",
		    url: "https://mandrillapp.com/api/1.0/messages/send.json",
		    data: {
		      'key': 'kVmO5l-VdDYKz2MET4sJ3A',
		      'message': {
		        'from_email': fromEmail,
		        'to': [
		          {
		            'email': toEmail,
		            'name': toName,
		            'type': 'to'
		          }
		        ],
		        'subject': subject,
		        'html': '<p>' + message + '</p> <p> - ' + fromName + '</p>'
		      }
		    }
		  })
		}
})