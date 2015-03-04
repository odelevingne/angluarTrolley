describe('ProductListCtrl', function(){

  var scope, ctrl, $httpBackend;

  beforeEach(module('trolleyApp'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('data/products.json').respond([{name: "Suede Shoes", 
                                                          description: "Blue", 
                                                          category: "Women's Footwear", 
                                                          price: 42, 
                                                          stock: 4 }]);
  scope = $rootScope.$new();
  ctrl = $controller('ProductListCtrl', {$scope: scope})
  }));

  it('should create a "products" model with 1 product fetched from xhr', function() {
    expect(scope.products).toBeUndefined();
    $httpBackend.flush();

    expect(scope.products).toEqual([{name: "Suede Shoes", 
                                    description: "Blue", 
                                    category: "Women's Footwear", 
                                    price: 42, 
                                    stock: 4 }])
  });
});


  // beforeEach(module('trolleyApp'));

  // it('should create "products" model with 13 products', inject(function($controller) {
  //   var scope = {},
  //       ctrl = $controller('ProductListCtrl', {$scope:scope});

  //   expect(scope.products.length).toBe(13);
  //   expect(scope.products[1].name).toBe('Suede Shoes');
  //   expect(scope.products[2].description).toBe('Loafers, Tan');
  //   expect(scope.products[3].price).toBe(19.00);
  //   expect(scope.products[4].stock).toBe(0);
  // }));
