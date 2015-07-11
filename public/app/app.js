
var app = angular.module('ecommerce', ['ngRoute'])

app.config(function($routeProvider){
	$routeProvider
	.when('/home/:uId?', {
		templateUrl: 'app/views/home.html',
		controller: 'homeCtrl'
		// resolve: {
		// 	customer: function(customerService, $route){
		// 		if($route.current.params.uId){
		// 			var id = '_id'
		// 			return customerService.getCustomer(id, $route.current.params.uId).then(function(response){
		// 				console.log(response.data[0])
		// 				return response.data[0];
		// 			})
		// 		} 
		// 	}
		// }
	})
	.when('/about/:uId?', {
		templateUrl: 'app/views/about.html',
		controller:  'aboutCtrl',
		resolve: {
			instagram: function(instagramService){
				return instagramService.getFeed().then(function(response){
					return response;
				})
			}
			// },
			// customer: function(customerService, $route){
			// 	if($route.current.params.uId){
			// 		var id = '_id'
			// 		return customerService.getCustomer(id, $route.current.params.uId).then(function(response){
			// 			return response.data[0];
			// 		})
			// 	} 
			// }
		}
	})
	.when('/contact/:uId?', {
		templateUrl: 'app/views/contact.html',
		controller:  'contactCtrl'
		// resolve: {
		// 	customer: function(customerService, $route){
		// 		if($route.current.params.uId){
		// 			var id = '_id'
		// 			return customerService.getCustomer(id, $route.current.params.uId).then(function(response){
		// 				console.log(response.data[0])
		// 				return response.data[0];
		// 			})
		// 		} 
		// 	}
		// }
	})
	// .when('/store/:uId', {
	// 	templateUrl: 'app/views/store.html',
	// 	controller: 'shopCtrl',
	// 	resolve: {
	// 		products: function(productService){
	// 			return productService.getProducts().then(function(response){
	// 				return response.data;
	// 			})
	// 		},
	// 		customer: function(customerService, $route){
	// 			var id = '_id'
	// 			return customerService.getCustomer(id, $route.current.params.uId).then(function(response){
	// 				return response.data[0];
	// 			})
	// 		}
	// 	}
	// })
	.when('/store/:uId?', {
		templateUrl: 'app/views/store.html',
		controller: 'shopCtrl',
		resolve: {
			products: function(productService){
				return productService.getProducts().then(function(response){
					return response.data;
				})
			},
			photos: function(photoService){
				return photoService.getPhotos().then(function(response){
					return response.data;
				})
			},
			// customer: function(customerService, $route){
			// 	if($route.current.params.uId){
			// 		var id = '_id'
			// 		return customerService.getCustomer(id, $route.current.params.uId).then(function(response){
			// 			return response.data[0];
			// 		})
			// 	} 
			// },
			cart: function(cartService){
				return cartService.getCart().then(function(response){
					return response.data
				})
			}
		}
	})
	.when('/checkout/:uId?', {
		templateUrl: 'app/views/checkout.html',
		controller: 'checkoutCtrl',
		resolve: {
			// customer: function(customerService, $route){
			// 	if($route.current.params.uId){
			// 		var id = '_id'
			// 		return customerService.getCustomer(id, $route.current.params.uId).then(function(response){
			// 			return response.data[0];
			// 		})
			// 	} 
			// },
			cart: function(cartService){
				return cartService.getCart().then(function(response){
					console.log(response, 232323)
					console.log(response.data, 44444)
					return response.data
				})
			}
		}
	})
	.when('/payment/:orderId', {
		templateUrl: 'app/views/payment.html',
		controller: 'paymentCtrl',
		resolve: {
			order: function(orderService, $route){
				return orderService.getOrder($route.current.params.orderId).then(function(response){
					return response.data[0];
				})
			}
		}
	})
	.when('/confirmation/:orderId', {
		templateUrl: '/app/views/confirmation.html',
		controller: 'confirmationCtrl',
		resolve: {
			order: function(orderService, $route){
				return orderService.getOrder($route.current.params.orderId).then(function(response){
					return response.data[0];
				})
			}
		}
	})
	.when('/admin/products', {
		templateUrl: 'app/views/products.html',
		controller: 'adminCtrl',
		resolve: {
			products: function(adminService){
				return adminService.getProducts().then(function(response){
					return response.data;
				})
			},
			photos: function(adminService){
				return adminService.getPhotos().then(function(response){
					return response.data;
				})
			}
		}
	})
	.when('/admin/photos', {
		templateUrl: 'app/views/photos.html',
		controller: 'adminCtrl',
		resolve: {
			products: function(adminService){
				return adminService.getProducts().then(function(response){
					return response.data;
				})
			},
			photos: function(adminService){
				return adminService.getPhotos().then(function(response){
					return response.data;
				})
			}
		}
	})
	.when('/admin/orders', {
		templateUrl: 'app/views/orders.html',
		controller: 'orderCtrl',
		resolve: {
			orders: function(adminService){
				return adminService.getOrders().then(function(response){
					return response.data;
				})
			}
		}
	})
	.otherwise('/home')
})