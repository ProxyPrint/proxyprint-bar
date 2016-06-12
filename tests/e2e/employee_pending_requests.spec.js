describe('pending requests tests', function() {

  var base_url = 'http://localhost:9000';
  var user_url = base_url + '/#/employee/mafalda';
  var pendingRequestId = "6";
  var beingProcessedId = "3";

  beforeEach(function () {
    browser.get(base_url);
    element(by.model('username')).sendKeys("mafalda");
    element(by.model('password')).sendKeys("1234");
    element(by.id('loginButton')).click();
  });

  it('Complete flow of a request being taken care of by employee (Pending -> being processed -> Finalized)', function () {
    var index = 1;
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
        //expect(element(by.binding('message'))).toBe('Finalizado');
        expect($('.btn-success').isDisplayed()).toBe(false);
        //browser.get(user_url+'/pending/'+beingProcessedId);
      });
    });
  });


});
