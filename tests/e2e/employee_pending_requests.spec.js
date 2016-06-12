describe('pending requests tests', function() {

  var base_url = 'http://localhost:9000';
  var user_url = base_url + '/#/employee/mafalda';
  var pendingRequestId = "4";
  var beingProcessedId = "4";

  beforeEach(function () {
    browser.get(base_url);
    element(by.model('username')).sendKeys("mafalda");
    element(by.model('password')).sendKeys("1234");
    element(by.id('loginButton')).click();
  });

  it('Changing the status of a pending request should be propagated into the pending requests list', function () {
    /*var index = 2;
    requests = element.all(by.repeater('request in pendingRequests'));
    requests.get(index).element(by.css('.btn-primary ')).click();
    expect(browser.getCurrentUrl()).toBe(user_url+'/pending/'+pendingRequestId);
    expect($('.btn-success').isDisplayed()).toBe(false);
    $('.fa-thumbs-o-up').click();
    $('[ng-click="performAction()"]').click();
    browser.get(user_url+'/pending/'+pendingRequestId);
    expect($('.btn-success').isDisplayed()).toBe(true);*/
  });

  it('Changing the status of a "being processed" Request should be propagated into the every other list', function () {
    var index = 0;
    requests = element.all(by.repeater('request in pendingRequests'));
    requests.get(index).element(by.css('.btn-primary')).click();
    expect(browser.getCurrentUrl()).toBe(user_url+'/pending/'+beingProcessedId);
    expect($('.btn-success').isDisplayed()).toBe(true)
    $('.btn-success').click();
    $('[ng-click="performAction()"]').click().then(function () {
      $('[ng-click="performAction()"]').click().then(function () {
        expect(element(by.binding('message'))).toBe('Finalizado');
        //expect($('.btn-success').isDisplayed()).toBe(false);
        //browser.get(user_url+'/pending/'+beingProcessedId);
      })
    });
  });

});
