describe('pending requests tests', function() {

  var base_url = 'http://localhost:9000';
  var user_url = base_url + '/#/employee/mafalda';
  var pendingRequestId = "4";

  beforeEach(function () {
    browser.get(base_url);
    element(by.model('username')).sendKeys("mafalda");
    element(by.model('password')).sendKeys("1234");
    element(by.id('loginButton')).click();
  });

  it('Changing the status of a pending request should be propagated into the pending requests list', function () {
    /*var index = 4;
    requests = element.all(by.repeater('request in pendingRequests'));
    requests.get(index).element($('.btn-primary ')).click();
    expect(browser.getCurrentUrl()).toBe(user_url+'/pending/'+pendingRequestId);
    expect($('.btn-success').isDisplayed()).toBe(false);
    $('.fa-thumbs-o-up').click();
    browser.get(user_url);
    expect(element(by.repeater('request in pendingRequests').row(index).column(''))).toBe('A ser atendido');*/
    var index = 2;
    requests = element.all(by.repeater('request in pendingRequests'));
    requests.get(index).element(by.css('.btn-primary ')).click();
    expect(browser.getCurrentUrl()).toBe(user_url+'/pending/'+pendingRequestId);
    expect($('.btn-success').isDisplayed()).toBe(false);
    $('.fa-thumbs-o-up').click();
    $('[ng-click="performAction()"]').click();
    browser.get(user_url+'/pending/'+pendingRequestId);
    expect($('.btn-success').isDisplayed()).toBe(true);
  });

});
