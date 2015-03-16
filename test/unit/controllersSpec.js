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
    $httpBackend.expectGET('data/vouchers.json').respond([{id: 0,
                                                          description: "£5.00 off you order",
                                                          discount: 5}, 
                                                          {id: 1,
                                                          description: "£10.00 off when you spend over £50.00",
                                                          discount: 10,
                                                          conditions: "getTotal() > 50"}]);
  
  scope = $rootScope.$new();
  ctrl = $controller('ProductListCtrl', {$scope: scope});
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

    expect(scope.vouchers[1]).toEqual({id: 1, description: "£10.00 off when you spend over £50.00", discount: 10, conditions: "getTotal() > 50"})
  });

  it('should be able to add a product to the basket', function() {
    $httpBackend.flush();
    var shoes = scope.products[0];
    scope.addToBasket(shoes);
    expect(shoes.stock).toEqual(3);
    expect(scope.basket).toEqual([{name: "Suede Shoes", 
                                  category: "Women's Footwear", 
                                  price: 42, 
                                  stock: 1 }]);
  });

  it('should be able to add two of a single item to the basket', function() {
    $httpBackend.flush();
    var shoes = scope.products[0];
    scope.addToBasket(shoes);
    scope.addToBasket(shoes);
    expect(shoes.stock).toEqual(2);
    expect(scope.basket).toEqual([{name: "Suede Shoes", 
                                  category: "Women's Footwear", 
                                  price: 42, 
                                  stock: 2 }]);
  });

  it('should be able to remove an item from the basket', function() {
    $httpBackend.flush();
    var shoes = scope.products[0];
    scope.addToBasket(shoes);
    expect(scope.basket[0].stock).toEqual(1);
    scope.removeFromBasket(shoes);
    expect(scope.basket).toEqual([]);
  });

  it('should know the total price of the items in the basket', function() {
    $httpBackend.flush();
    var shoes = scope.products[0];
    expect(scope.getTotal()).toEqual(0);
    scope.addToBasket(shoes);
    scope.addToBasket(shoes);
    expect(scope.getTotal()).toEqual(84);
  });

  it('allows the user to add a voucher to the basket', function() {
    $httpBackend.flush();
    var shoes = scope.products[0];
    var voucher = scope.vouchers[0];
    expect(scope.redeemed).toEqual([]);
    scope.addToBasket(shoes);
    scope.redeemVoucher(voucher);
    expect(scope.redeemed).toEqual([{id: 1, discount: 10, conditions: "getTotal() > 50"}])
    expect(scope.subTotal).toEqual(37);
  });
});

