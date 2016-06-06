describe('consumer mainpage tests', function() {

  var base_url = 'http://localhost:9000';
  var user_url = base_url + '/#/joao';

  beforeEach(function () {
    browser.get(base_url);
    element(by.model('username')).sendKeys("joao");
    element(by.model('password')).sendKeys("1234");
    element(by.id('loginButton')).click();
  });

    it('Printshop list page should be working', function() {
      element(by.css('.fa-book')).click().then( function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/printshops');
      });
    });

    it('Request history page should be working', function() {
      element(by.css('.fa-history')).click().then( function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/history');
      });
    });

    it('Settings page should be working', function() {
      element(by.css('.caret')).click();
      element(by.css('.fa-cog')).click().then(function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/settings')
      })
    });





});
