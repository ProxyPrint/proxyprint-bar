describe('consumer mainpage tests', function() {

  var base_url = 'http://localhost:9000';
  var user_url = base_url + '/#/joao';

  beforeEach(function () {
    browser.get(base_url);
    element(by.model('username')).sendKeys("joao");
    element(by.model('password')).sendKeys("1234");
    element(by.id('loginButton')).click();
  });

    it('Consumer mainpage URLs should be working', function() {
      //Printshop list page
      $('.fa-book').click().then( function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/printshops');
      });
      //History of requests page
      $('.fa-history').click().then( function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/history');
      });
      //Settings page
      $('.caret').click();
      $('.fa-cog').click().then(function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/settings')
      });
    });





});
