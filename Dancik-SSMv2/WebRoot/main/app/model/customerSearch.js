(function ($) {
    $App.Model.Extend('SSM.Ajax', 'CustomerSearch', {
        initialize: function () {
            this._super();
        },
        
        getCustomer: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getCustomer', callback, errorCallback);
        },	
        getCustomers: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getCustomers', callback, errorCallback);
        },	
        addCustomer: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/addCustomerRecord', callback, errorCallback);
        },
        updateCustomer: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/setCustomerRecord', callback, errorCallback);
        }        
    
    });
})(jQuery);    