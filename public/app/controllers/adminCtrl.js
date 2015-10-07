var app = angular.module('ecommerce');


// admin and add, update and delete products
app.controller('adminCtrl', function($scope, adminService, customerService, cartService, products, photos, fileReader){
	
	$scope.createAdmin = function(){
		customerService.addCustomer('Mark McIver', 'markmciver83@gmail.com', 'test').then(function(response){
			console.log('user created')
		})

	}

	$scope.createAccount = function(date, password){
		customerService.addCustomer('excursion', date, password).then(function(response){
			$scope.date = '';
			$scope.password = '';
			Materialize.toast('account created', 1000)
		}, function(err){
			Materialize.toast('account was not created.  Contact your administrator.', 1000)
		})
	}

	$scope.products = products;
	$scope.photos = photos;
	$scope.categoryOptions = ['favorite', 'featured', 'product'];

	$scope.favoriteProducts = [] 
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'favorite'){
			$scope.favoriteProducts.push($scope.products[i])
		}
	}

	$scope.featuredProducts = [] 
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'featured'){
			$scope.featuredProducts.push($scope.products[i])
		}
	}
	
	$scope.productOptions = [] 
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'product'){
			$scope.productOptions.push($scope.products[i])
		}
	}

	$scope.showImageDetails = function(image){
		image.show = !image.show
	}
	
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          $scope.imageSrc = result;
                      });
    };
 
    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });




	$scope.getProducts = function(){
		adminService.getProducts().then(function(response){
			$scope.products = response.data;
		})
	}

	

	$scope.addProduct = function(imageSrc, file, title, price, description, category){
		$scope.file = file;
		adminService.uploadPhoto(imageSrc, $scope.file).then(function(response){
			var url = response.data.Location;
			adminService.addProduct(title, price, url, description, category).then(function(response){
				$scope.productTitle = '';
				$scope.productPrice = 20;
				$scope.productDescription = '';
				$scope.imageSrc = null;
				$scope.productCategory = '';
				$scope.getProducts();
				Materialize.toast("product added.  you may need to refresh the page", 1000)
			})
		}, function(err){
			Materialize.toast('product was not added', 1000)
		})
	}

	$scope.updateProduct = function(id, title, description, price, category){
		if(confirm("Are you sure you want to update this products info?")){
			adminService.updateProduct(id, title, description, price, category).then(function(response){
				alert('This product has been updated.')
				$scope.getProducts();
			})
		}
	}

	$scope.removeProduct = function(id){
		if(confirm("Are you sure you want to delete this product?")){
			adminService.removeProduct(id).then(function(response){
				$scope.getProducts();
				Materialize.toast("product deleted", 1000)
			}, function(err){
				Materialize.toast("something went wrong", 1000)
			})
		}
	}


	$scope.getPhotos = function(){
		adminService.getPhotos().then(function(response){
			$scope.photos = response.data;
		}, function(err){
			Materialize.toast("couldn't retrieve photos", 1000)
		})
	}

	

	// $scope.addPhoto = function(title, imageSrc, description, category, auth){
	$scope.addPhoto = function(imageSrc, file, title, description, category, auth){
		$scope.file = file;
		adminService.uploadPhoto(imageSrc, $scope.file).then(function(response){
			var url = response.data.Location;
			adminService.addPhoto(title, url, description, category, auth).then(function(response){
				$scope.photoTitle = '';
				$scope.photoDescription = '';
				$scope.imageSrc = null;
				$scope.photoCategory = '';
				$scope.photoAuth = 'store';
				$scope.getPhotos();
				Materialize.toast("photo added", 1000)
			}, function(err){
				Materialize.toast("photo was not added", 1000)
			})
		})
	}


				

	$scope.updatePhoto = function(id, title, description, category, auth){
		if(confirm("Are you sure you want to update this image's info?")){
			adminService.updatePhoto(id, title, description, category, auth).then(function(response){
				Materialize.toast('This image has been updated', 1000)
				$scope.getPhotos();
			}, function(err){
				Materialize.toast("photo not updated", 1000)
			})
		}
	}

	$scope.removePhoto = function(id){
		if(confirm("Are you sure you want to delete this image?")){
			adminService.removePhoto(id).then(function(response){
				$scope.getPhotos();
				Materialize.toast('photo deleted', 1000)
			}, function(err){
				Materialize.toast('photo not deleted', 1000)
			})
		}
	}

	var currentTime = new Date();
	$scope.currentTime = currentTime;
	$scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.today = 'Today';
	$scope.clear = 'Clear';
	$scope.close = 'Close';
	$scope.onStart = function () {
	    console.log('onStart');
	};
	$scope.onRender = function () {
	    console.log('onRender');
	};
	$scope.onOpen = function () {
	    console.log('onOpen');
	};
	$scope.onClose = function () {
	    console.log('onClose');
	};
	$scope.onSet = function () {
	    console.log('onSet');
	};
	$scope.onStop = function () {
	    console.log('onStop');
	};

})
