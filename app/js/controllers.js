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
        this.basket[0].stock += 1;
        product.stock -= 1;
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
}]);
