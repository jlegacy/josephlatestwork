(function ($) {
	$App.Model.Extend('SSM.Ajax', 'References', {
		initialize: function () {
			this._super();
		},
		
		/* Get reference details */
		getReferenceDetails : function (data, callback, errorCallback) {
			this.get(data, '../../dancik-aws/ssm/getReferenceDetails', callback, errorCallback);
		},
		
		/* Set Company Field Value */
		setReference : function (data, callback, errorCallback) {
			this.get(data, '../../dancik-aws/ssm/setReferenceDetailFields', callback, errorCallback);
		},
		
		/* Set Company Field Value */
		getReferenceDetail : function (data, callback, errorCallback) {
			this.get(data, '../../dancik-aws/ssm/getReferenceDetail', callback, errorCallback);
		},
		
		/* Save new Reference */
		addReferenceRecord : function (data, callback, errorCallback) {
			//
			this.get(data, '../../dancik-aws/ssm/addReferenceDetailRecord', callback, errorCallback);
		}		
	});
})(jQuery);