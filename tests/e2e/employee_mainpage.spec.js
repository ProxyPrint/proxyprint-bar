describe('employee mainpage tests', function() {

  var base_url = 'http://localhost:9000';
  var user_url = base_url + '/#/employee/mafalda';

  beforeEach(function () {
    browser.get(base_url);
    element(by.model('username')).sendKeys("mafalda");
    element(by.model('password')).sendKeys("1234");
    element(by.id('loginButton')).click();
  });

    it('Pending requests page should be working', function() {
      $('.fa-hourglass-half').click().then( function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/pending');
      });
    });

    it('Satisfied requests page should be working', function() {
      $('.fa-check').click().then( function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/satisfied');
      });
    });

    it('History requests page should be working', function() {
      $('.fa-history').click().then(function () {
        expect(browser.getCurrentUrl()).toEqual(user_url+'/history');
      })
    });





});
