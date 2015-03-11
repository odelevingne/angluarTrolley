var trolleyApp = angular.module('trolleyApp', []);

  trolleyApp.controller('ProductListCtrl', ['$scope', '$http', function($scope, $http) {
    
    $scope.basket = [];

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
      } else {
        fetched.stock += 1;
        product.stock -= 1;
      }
    };

    $scope.removeFromBasket = function(product) {
      var fetched = getProduct(product);
      var fetchedProd = getProductProds(product);
      if(fetched.stock === 1) {
        this.basket.splice(this.basket.indexOf(fetched), 1);
        fetchedProd.stock += 1;
      } else {
        fetched.stock -= 1;
        fetchedProd.stock += 1;
      }
    };

    $scope.getTotal = function() {
      total = 0;
        for(var i = 0; i < this.basket.length; i++) {
          total += parseInt(this.basket[i].price * this.basket[i].stock);
        }
      return total;
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
