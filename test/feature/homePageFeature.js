describe("Trolley App Homepage", function() {

  describe("Product list view", function() {

    beforeEach(function() {
      browser.get("app/index.html");
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
});
