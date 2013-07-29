(function ($) {
	$App.Model.Extend('SSM.Ajax', 'SelectionItems', {
		
		initialize: function () {
			this._super();
		},
		
		getItems: function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/ssm/getSelection_Items', function (results) {
					callback(results);
				}, 
				errorCallback);
		},
		
		getItem: function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/ssm/getSelection_Item', function (results) {
					callback(results);
				}, 
				errorCallback);
		},
		
		removeItems: function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/ssm/rmvSelectionItems', function (results) {
					callback(results);
				}, 
				errorCallback);
		},
		
		addSelectionItem : function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/ssm/addSelectionItemRecord', function (results) {
					callback(results);
				}, 
				errorCallback);
		},
		
		getRelatedItems : function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/ssm/getRelatedItems', function (results) {
					callback(results);
				}, 
				errorCallback);
		}
		
		
	});
})(jQuery);