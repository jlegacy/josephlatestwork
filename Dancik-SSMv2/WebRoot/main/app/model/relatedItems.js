(function ($) {
	$App.Model.Extend('SSM.Ajax', 'RelatedItems', {
		
		initialize: function () {
			this._super();
		},
		
		getRelatedItems : function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/ssm/getRelatedItems', function (results) {
					callback(results);
				}, 
				errorCallback);
		},
		
		submit_related_items : function (data, callback, errorCallback) {
			var _this = this,
				webServiceURL = '../../dancik-aws/ssm/addSelectionItemRecords';
			
			_this.post(data, webServiceURL, callback, errorCallback);
		}
		
	});
})(jQuery);