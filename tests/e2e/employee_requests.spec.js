describe('pending requests tests', function() {

  var base_url = 'http://localhost:9000';
  var user_url = base_url + '/#/employee/mafalda';
  var pendingRequestId = "13";

  beforeEach(function () {
    browser.get(base_url);
    element(by.model('username')).sendKeys("mafalda");
    element(by.model('password')).sendKeys("1234");
    element(by.id('loginButton')).click();
  });

  it('Complete flow of a request being taken care of by employee (Pending -> being processed -> Finalized)', function () {
    var index = 2;
    requests = element.all(by.repeater('request in pendingRequests'));
    requests.get(index).element(by.css('.btn-primary ')).click();
    expect(browser.getCurrentUrl()).toBe(user_url+'/pending/'+pendingRequestId);
    expect($('.btn-success').isDisplayed()).toBe(false);
    $('.fa-thumbs-o-up').click();
    $('[ng-click="performAction()"]').click();
    browser.get(user_url+'/pending/'+pendingRequestId);
    expect($('.btn-success').isDisplayed()).toBe(true);
    $('.btn-success').click();
    $('[ng-click="performAction()"]').click().then(function () {
      $('[ng-click="performAction()"]').click().then(function () {
        expect($('.btn-success').isDisplayed()).toBe(false);
      });
    });
  });

  it('Completing a request should decrease the satisfied request list length by 1', function () {
    //browser.get(user_url+'/satisfied');
    $('.fa-check').click();
    requests = element.all(by.repeater('request in satisfiedRequests'));
    var initialValue = requests.count();
    requests.get(0).element(by.css('.bg-purple')).click();
    $('.btn-primary').click().then(function () {
      $('.btn-primary').click();
    });
    element.all(by.repeater('request in satisfiedRequests')).count().then(function (recentValue) {
      expect(initialValue).toBe(recentValue+1);
    });
  });


});
