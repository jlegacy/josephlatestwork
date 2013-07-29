(function ($) {
	$App.Model.Extend('SSM.Ajax', 'ItemSearch', {
		
		initialize: function () {
			this._super();
		},
		
		getItems : function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/des/getItems',function (results) {callback(results);},errorCallback);
		}		
	});
})(jQuery);