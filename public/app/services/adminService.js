
var app = angular.module('ecommerce');


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
