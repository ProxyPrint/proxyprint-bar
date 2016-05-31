angular.module('ProxyPrint').factory('toasterService',['Notification', function (Notification) {

  return{
      notify: function(msg){
          Notification(msg);
      },
      notifyError: function(msg){
          Notification.error(msg);
      },
      notifySuccess: function(msg){
          Notification.success(msg);
      },
      notifyInfo: function(msg){
          Notification.info(msg);
      },
      notifyWarning: function(msg){
          Notification.warning(msg);
      }
  }

}]);
