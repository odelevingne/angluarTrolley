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
      this.basket.push(product);
      product.stock -+ 1;
    };


}]);


