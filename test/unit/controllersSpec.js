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
    $httpBackend.expectGET('data/vouchers.json').respond([{description: "£5.00 off you order"}, 
                                                          {description: "£10.00 off when you spend over £50.00"}]);
  
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
                                    stock: 4 }]);
  });

  it('should create a "vouchers" model with 2 vouchers fetched from xhr', function() {
    expect(scope.vouchers).toBeUndefined();
    $httpBackend.flush();

    expect(scope.vouchers).toEqual([{description: "£5.00 off you order"}, {description: "£10.00 off when you spend over £50.00"}])
  });
});

