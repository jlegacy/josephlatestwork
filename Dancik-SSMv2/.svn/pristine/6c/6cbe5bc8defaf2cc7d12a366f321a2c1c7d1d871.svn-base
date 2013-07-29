(function ($) {
	$App.Model.Extend('SSM.Ajax', 'Application', {
		initialize: function () {
			this._super();
		},
		
		selectionLookup: function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/ssm/getSelection', callback, errorCallback);
		},
		
		itemUOMLookup: function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/des/getItemUOMListing', callback, errorCallback);
		}
	});
})(jQuery);