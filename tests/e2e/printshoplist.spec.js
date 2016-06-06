describe('consumer printshop list tests', function() {

  var base_url = 'http://localhost:9000';
  var user_url = base_url + '/#/joao';

  beforeEach(function () {
    browser.get(base_url);
    element(by.model('username')).sendKeys("joao");
    element(by.model('password')).sendKeys("1234");
    element(by.id('loginButton')).click();
    element(by.css('.fa-book')).click();
  });



    it('CopyScan should be found', function() {
      //var printshopName = element(by.repeater('printshop in printshops').row(0));
      element(by.repeater('printshop in printshops').row(0)).click().then(function () {
        var name = element(by.binding('printshop.name')).getText();
        expect(name).toBe("Copy Scan");
      });
    });





});
