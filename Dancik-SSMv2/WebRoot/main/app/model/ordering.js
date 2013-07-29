(function ($) {
	$App.Model.Extend('SSM.Ajax', 'Ordering', {
		initialize: function () {
			this._super();
		},
		
		referenceNumber : 0,
		
		selectionNumber : 0,
				
		// Gets the order header information
		get_order_header_info : function (data, callback, errorCallback) {
			var _this = this,
				serviceURL = "../../dancik-aws/ssm/buildPendingBySelection";
			this.post(data, serviceURL, callback, errorCallback);			
		},
		order_step_2 : function (data, callback, errorCallback) {
			var _this = this,
				serviceURL = "../../dancik-aws/ssm/getOrderShippingData";
			this.post(data, serviceURL, callback, errorCallback);	
		},
		submit_order_step_2 : function (data, callback, errorCallback) {
			var _this = this,
				serviceURL = "../../dancik-aws/ssm/setOrderShippingData";
			this.post(data, serviceURL, callback, errorCallback);	
		},
		order_step_3 : function (data, callback, errorCallback) {
			var _this = this,
				serviceURL = "../../dancik-aws/ssm/getOrderHeader";
			this.post(data, serviceURL, callback, errorCallback);	
		},
		submit_order_step_3 : function (data, callback, errorCallback) {
			var _this = this,
				serviceURL = "../../dancik-aws/ssm/setOrderHeader";
			this.post(data, serviceURL, callback, errorCallback);	
		},
		order_step_4 : function (data, callback, errorCallback) {
			var _this = this,
				serviceURL = "../../dancik-aws/ssm/getOrderHeaderMessages";
			this.post(data, serviceURL, callback, errorCallback);	
		},
		submit_order_step_4 : function (data, callback, errorCallback) {
			var _this = this,
				serviceURL = "../../dancik-aws/ssm/setOrderHeaderMessages";
			this.post(data, serviceURL, callback, errorCallback);	
		},
		order_step_5 : function (data, callback, errorCallback) {
			var _this = this,
				serviceURL = "../../dancik-aws/ssm/addHeldItemsToOrder";
			this.post(data, serviceURL, callback, errorCallback);	
		},
		submit_order_step_5 : function (data, callback, errorCallback) {
			var _this = this,
				serviceURL = "../../dancik-aws/ssm/placeOrder";
			this.post(data, serviceURL, callback, errorCallback);	
		},
		cancel_order : function(data, callback, errorCallback) {
			var _this = this,
				serviceURL = "../../dancik-aws/ssm/cancelOrder";
			this.post(data, serviceURL, callback, errorCallback);	
		}
	});
})(jQuery);