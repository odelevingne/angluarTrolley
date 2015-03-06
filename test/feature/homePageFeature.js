describe("Trolley App Homepage", function() {

  describe("Product list view", function() {

    beforeEach(function() {
      browser.get("app/index.html");
    });

    it("should display the full list of products on load with their acommpanying info", function() {
      var productList = element.all(by.repeater("product in products"));
      var secondProduct = productList.get(1).getText();

      expect(secondProduct).toContain("Item: Suede Shoes");
      expect(secondProduct).toContain("Description: Blue");
      expect(secondProduct).toContain("New Price: £42.00");
      expect(secondProduct).toContain("In Stock: 4");

    });

    it("should filter the phone list as a user types into the search box", function() {
      
      var productList = element.all(by.repeater("product in products"));
      var query = element(by.model('query'));

      expect(productList.count()).toBe(13);

      query.sendKeys("Blue");
      expect(productList.count()).toBe(2);

      query.clear();
      query.sendKeys("Women's Casualwear")
      expect(productList.count()).toBe(2);

    });
  });

  describe("Voucher list view", function() {

    it("should display the list of vouchers and their acommpanying info", function() {
      var firstVoucher = element.all(by.repeater("voucher in vouchers")).get(0).getText();

      expect(firstVoucher).toContain("Voucher: £5.00 off your order")
    });
  });
});

