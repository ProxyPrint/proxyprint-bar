describe('employee mainpage tests', function() {

  var base_url = 'http://localhost:9000';
  var user_url = base_url + '/#/employee/mafalda';

  beforeEach(function () {
    browser.get(base_url);
    element(by.model('username')).sendKeys("mafalda");
    element(by.model('password')).sendKeys("1234");
    element(by.id('loginButton')).click();
  });


    it('Employee pages should be working', function() {
      //Pending requests page
      element(by.id('preqs')).click().then( function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/pending');
      });
      //Satisfied requests page
      element(by.id('sreqs')).click().then( function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/satisfied');
      });
      //History of the requests page
      element(by.id('hreqs')).click().then(function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/history');
      })
    });







});
