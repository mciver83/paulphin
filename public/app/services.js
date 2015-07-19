
var app = angular.module('ecommerce');

var herokuURL = 'paulphin.herokuapp.com';
// var herokuURL = 'http://localhost:9003'


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




//---------------------------------------------------//

app.service('adminService', function($http){

	this.addProduct = function(title, price, image, description, category){
		return $http({
			method: 'POST',
			url: '/admin/products',
			data: {
				title: title,
				price: price,
				image: image,
				description: description,
				category: category
			}
		})
	}

	this.getProducts = function(){
		return $http({
			method: 'GET',
			url: '/admin/products'
		})
	}

	this.updateProduct = function(id, title, description, price, category){
		return $http({
			method: 'PUT',
			url: '/admin/products?id=' + id,
			data: {

				title: title,
				description: description,
				price: price,
				category: category
			}
		})
	}

	this.removeProduct = function(id){
		return $http({
			method: 'DELETE',
			url: '/admin/products?id=' + id
		})
	}




	this.uploadPhoto = function(imageSrc, file){
	 
		return $http({
			method: 'POST',
			url: '/upload',
			data: {
				image: imageSrc,
				file: {
					name: file.name,
					type: file.type
				}
			}
		})
	}


	this.addPhoto = function(title, url, description, category, auth){

		return $http({
			method: 'POST',
			url: '/admin/photos',
			data: {
				title: title,
				imageUrl: url,
				description: description,
				category: category,
				auth: auth
			}
		})
	}



	this.getPhotos = function(){
		return $http({
			method: 'GET',
			url: '/admin/photos'
		})
	}

	this.updatePhoto = function(id, title, description, category, auth){
		return $http({
			method: 'PUT',
			url: '/admin/photos?id=' + id,
			data: {

				title: title,
				description: description,
				category: category,
				auth: auth
			}
		})
	}

	this.removePhoto = function(id){
		return $http({
			method: 'DELETE',
			url:'/admin/photos?id=' + id
		})
	}

	this.getOrders = function(){
		return $http({
			method: 'GET',
			url: '/admin/orders'
		})
	}

	this.updateOrder = function(id, paymentStatus, orderStatus){
		return $http({
			method: 'PUT',
			url: '/admin/orders/?_id=' + id,
			data: {
				'payment.status': paymentStatus,
				status: orderStatus
			}
		})
	}
	
})



//---------------------------------------------------//






app.service('authService', function($http){
	
	this.login = function(email, password){
		return $http({
			method: 'POST',
			url: '/api/login',
			data: {
				email: email,
				password: password
			}
		})
	}

	this.auth = function(){
		return $http({
			method: 'GET',
			url: '/api/auth'
		})
	}

})






//---------------------------------------------------//





app.service('productService', function($http, $q){


	this.getProducts = function(){
		return $http({
			method: 'GET',
			url: '/api/products'
		})
	}

	this.getOneProduct = function(id){
		return $http({
			method: 'GET',
			url: '/api/products?_id=' + id
		})
	}

})





//---------------------------------------------------//

app.service('photoService', function($http, $q){


	this.getPhotos = function(){
		return $http({
			method: 'GET',
			url: '/api/photos'
		})
	}

	this.getOnePhoto = function(id){
		return $http({
			method: 'GET',
			url: '/api/photos?_id=' + id
		})
	}

})




//---------------------------------------------------//

app.service('customerService', function($http, $q){

	// this.createTempCustomer = function(name){
	// 	return $http({
	// 		method: 'POST',
	// 		url: '/api/customers',
	// 		data: {
	// 			name: name
	// 		}
	// 	})
	// }

	this.addCustomer = function(name, email, password){
		return $http({
			method: 'POST', 
			url: '/api/customers',
			data: {
				name: name,
				local: {
					email: email,
					password: password
				},
				admin: true
			}
		})
	}

	this.getCustomer = function(field, value){
		return $http({
			method: 'GET',
			url: '/api/customers?' + field + '=' + value
		})
	}

	this.updateCustomer = function(id, obj){
		return $http({
			method: 'PUT',
			url: '/api/customers?id=' + id,
			data: obj
		})
	}

	this.addAddress = function(customerId, address){
		return $http({
			method: 'POST',
			url: '/api/customers/address/' + customerId,
			data: address
		})
	}
})




//---------------------------------------------------//

app.service('cartService', function($http, $q){

	this.addToCart = function(data){
		return $http({
			method: 'POST',
			url: '/api/cart/',
			data: data
		})		

	}

	this.getCart = function(){
		return $http({
			method: 'GET',
			url: '/api/cart'
		})
	}

	this.updateItem = function(data){
		return $http({
			method: 'PUT',
			url: '/api/cart',
			data: data
		})
	}

	this.removeItem = function(id){
		return $http({
			method: 'PUT',
			url: '/api/cart/remove',
			data: {
				id: id
			}
		})
	}
	
})






//---------------------------------------------------//


app.service('orderService', function($http, $q, $routeParams){

	this.placeOrder = function(order){
		return $http({
			method: 'POST',
			url: '/api/orders',
			data: order
		})
	}

	this.getOrder = function(id){
		return $http({
			method: 'GET',
			url: '/api/orders/?_id=' + id
		})
	}

	this.getOrders = function(){
		return $http({
			method: 'GET',
			url: '/api/orders'
		})
	}

	this.updateOrder = function(id, paymentStatus, orderStatus){
		return $http({
			method: 'PUT',
			url: '/api/orders/?_id=' + id,
			data: {
				status: orderStatus
			}
		})
	}

})





//---------------------------------------------------//


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