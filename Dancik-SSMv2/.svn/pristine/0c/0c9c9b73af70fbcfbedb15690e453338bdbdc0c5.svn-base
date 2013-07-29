(function ($) {
	$App.Model.Extend('SSM.Ajax', 'Dashboard', {
		initialize: function () {
			this._super();
		},
		getLastSelections: function (data, callback, errorCallback) {
			var _this = this;
			_this.get(data, '../../dancik-aws/ssm/getLastSelections', callback, errorCallback);
		},
		getReminderDayListing: function (data, callback, errorCallback) {
			var _this = this;
			_this.get(data, '../../dancik-aws/ssm/getRemindersForDate', callback, errorCallback);
		}	
	});
})(jQuery);