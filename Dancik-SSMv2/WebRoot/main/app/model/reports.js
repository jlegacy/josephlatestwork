(function ($) {
	$App.Model.Extend('SSM.Ajax', 'Reports', {
		initialize: function () {
			this._super();
		},
		getReportFilterItems: function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/des/getPopupListing', callback, errorCallback);
		},
		submitCommisionReport: function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/ssm/submitCommissionReport', callback, errorCallback);
		}
	});
})(jQuery);