var trolleyApp = angular.module('trolleyApp', []);

  trolleyApp.controller('ProductListCtrl', ['$scope', '$http', function($scope, $http) {
    
    $scope.basket = [];
    $scope.subTotal = 0;
    $scope.redeemed = []

    $http.get('data/products.json').success(function(data) {
      $scope.products = data;
    });

    $http.get('data/vouchers.json').success(function(data) {
      $scope.vouchers = data;
    });

    $scope.addToBasket = function(product) {
      var fetched = getProduct(product);
      if(fetched === undefined) {
      this.basket.push({"name": product.name,
                        "category": product.category,
                        "price": product.price,
                        "stock": 1});
      product.stock -= 1;
      $scope.subTotal = $scope.getTotal();
      } else {
        fetched.stock += 1;
        product.stock -= 1;
        $scope.subTotal = $scope.getTotal();
      }
    };

    $scope.removeFromBasket = function(product) {
      var fetched = getProduct(product);
      var fetchedProd = getProductProds(product);
      if(fetched.stock === 1) {
        this.basket.splice(this.basket.indexOf(fetched), 1);
        fetchedProd.stock += 1;
        this.subTotal;
      } else {
        fetched.stock -= 1;
        fetchedProd.stock += 1;
        this.subTotal;
      }
    };

    $scope.getTotal = function() {
      total = 0;
        for(var i = 0; i < this.basket.length; i++) {
          total += parseInt(this.basket[i].price * this.basket[i].stock);
        }
      return total;
    };

    $scope.redeemVoucher = function(voucher) {
      var subTote = $scope.getTotal() 
      discount = getVoucher(voucher).discount
      $scope.subTotal = subTote - discount;
    };

    var getVoucher = function(voucher) {
      for(var i = 0; i < $scope.vouchers.length; i++) {
        if($scope.vouchers[i].id === voucher.id) {
          return $scope.vouchers[i];
        }
      };
    };

    var getProduct = function(product) {
      for(var i = 0; i < $scope.basket.length; i++) {
        if($scope.basket[i].name == product.name)
        {
          return $scope.basket[i];
        }
      };
    };

    var getProductProds = function(product) {
      for(var i = 0; i < $scope.products.length; i++) {
        if($scope.products[i].name == product.name)
        {
          return $scope.products[i];
        }
      };
    };

}]);
