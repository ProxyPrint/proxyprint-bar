describe('homepage tests', function() {

  var base_url = 'http://localhost:9000';

  beforeEach(function () {
    browser.get(base_url);
  })

  it('mainpage should have a title', function() {
    expect(browser.getTitle()).toContain('ProxyPrint');
  });

  it('login validation test', function () {
    element(by.model('username')).sendKeys("joao");
    element(by.model('password')).sendKeys("1234");
    element(by.id('loginButton')).click().then(function() {
        expect(browser.getCurrentUrl()).toContain(base_url+'/#/joao/mainpage')
    });



  });
});
