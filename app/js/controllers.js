var trolleyApp = angular.module('trolleyApp', []);

  trolleyApp.controller('ProductListCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get('data/products.json').success(function(data) {
      $scope.products = data;
    });

    $http.get('data/vouchers.json').success(function(data) {
      $scope.vouchers = data;
    });


}]);
