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
      if(!checkIfInBasket(product)) {
      this.basket.push({"name": product.name,
                        "category": product.category,
                        "price": product.price,
                        "stock": 1});
      product.stock -= 1;
      } else {
        getProduct(product).stock += 1;
        product.stock -= 1;
      }
    };

    $scope.removeFromBasket = function(product) {
      var fetched = getProduct(product)
      if(fetched.stock === 1) {
        this.basket.splice(this.basket.indexOf('fetched'), 1);
      } else {
        fetched.stock -= 1;
      }
    };

    var checkIfInBasket = function(product) {
      for(i = 0; $scope.basket.length > i; i +=1) {
        if ($scope.basket[i].name === product.name) {
          return true;
        }
      };
      return false;
    };

    var getProduct = function(product) {
      for(var i = 0; i < $scope.basket.length; i++) {
        if($scope.basket[i].name == product.name)
        {
          return $scope.basket[i];
        }
      };
    };

}]);
