
var app = angular.module('ecommerce', ['ngRoute', 'ui.materialize', 'angular-carousel'])
// var app = angular.module('ecommerce', ['ngRoute'])

app.config(function($routeProvider){
	$routeProvider
	.when('/home/:uId?', {
		templateUrl: 'app/views/home.html'
	})
	.when('/about/:uId?', {
		templateUrl: 'app/views/about.html',
		controller:  'aboutCtrl',
		resolve: {
			instagram: function(instagramService){
				return instagramService.getFeed().then(function(response){
					return response;
				})
			},
			photos: function(photoService){
				return photoService.getPhotos().then(function(response){
					var photos = []
					for(var i = 0; i < response.data.length; i++){
						if(response.data[i].auth === 'website'){
							photos.push(response.data[i])
						}
					}
					return photos;
				})
			}
		}
	})
	.when('/contact/:uId?', {
		templateUrl: 'app/views/contact.html',
		controller:  'contactCtrl'
	})
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
					var photos = []
					for(var i = 0; i < response.data.length; i++){
						if(response.data[i].auth === 'store'){
							photos.push(response.data[i])
						}
					}
					return photos;
				})
			},
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
			cart: function(cartService){
				return cartService.getCart().then(function(response){
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
	.when('/excursion', {
		templateUrl: 'app/views/excursion.html',
		controller: 'excursionCtrl',
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
			cart: function(cartService){
				return cartService.getCart().then(function(response){
					return response.data
				})
			},
			user: function(authService){
				return authService.auth().then(function(response){
					console.log(response)
					return response.data
				})
			}
		}
	})
	.otherwise('/home')
})