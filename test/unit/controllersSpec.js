describe('ProductListCtrl', function(){

  beforeEach(module('trolleyApp'));

  it('should create "products" model with 13 products', inject(function($controller) {
    var scope = {},
        ctrl = $controller('ProductListCtrl', {$scope:scope});

    expect(scope.products.length).toBe(13);
    expect(scope.products[1].name).toBe('Suede Shoes');
    expect(scope.products[2].description).toBe('Loafers, Tan');
    expect(scope.products[3].price).toBe(19.00);
    expect(scope.products[4].stock).toBe(0);
  }));

});