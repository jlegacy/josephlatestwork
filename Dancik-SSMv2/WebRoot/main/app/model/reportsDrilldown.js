(function ($) {
	$App.Model.Extend('SSM.Ajax', 'ReportsDrilldown', {
		initialize: function () {
			this._super();
		},
	getDrillDown_Summary: function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/ssm/getDrillDown_Summary', callback, errorCallback);
		},
	getDrillDown_Detail: function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/ssm/getDrillDown_Detail', callback, errorCallback);
		}
	});
})(jQuery);