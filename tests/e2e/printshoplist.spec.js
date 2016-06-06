describe('consumer printshop list tests', function() {

  var base_url = 'http://localhost:9000';
  var user_url = base_url + '/#/joao';

  beforeEach(function () {
    browser.get(base_url);
    element(by.model('username')).sendKeys("joao");
    element(by.model('password')).sendKeys("1234");
    element(by.id('loginButton')).click();
    $('.fa-book').click();
  });



    it('Clicking in a printshop should open its page', function() {
      var printshopName = element(by.repeater('printshop in printshops').row(0)).element(by.tagName('strong')).getText();
      element(by.repeater('printshop in printshops').row(0)).click().then(function () {
        var name = element(by.binding('printshop.name')).getText();
        expect(name).toBe(printshopName);
      });
    });

    it('Adding a review should increase the amount of reviews', function () {
      element(by.repeater('printshop in printshops').row(0)).click();
      browser.executeScript('window.scrollTo(0,100000);').then(function () {
        element.all(by.repeater('review in printshop.reviews | limitTo: limit')).count().then(function (count){
          $('.fa-star').click();
          element(by.model('content')).sendKeys("Mau serviço!");
          $('.modal-footer').$('.button-primary').click().then(function () {
            browser.executeScript('window.scrollTo(0,100000);').then(function () {
              expect(element.all(by.repeater('review in printshop.reviews')).count()).toEqual(count+1);
            });
          });
        });
      });

    });





});
