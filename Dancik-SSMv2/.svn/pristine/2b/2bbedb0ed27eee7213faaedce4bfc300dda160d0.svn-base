/*globals $App */
(function ($) {
	$App.Controller('ItemSearch', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('ItemSearch');
			this.model = $App.Model('ItemSearch');
			
		},
		// ------------------------------------------------------------
		// -- 
		// ------------------------------------------------------------
		init: function (data) {
//			
			var _this = this;			
			_this.view.init(data);
		},
		
		getItems : function (data) {
			$.extend(data, {recordcount : 100});
			var _this = this, callback, errorCallabck;
			
			callback = function(returnData) {
				_this.view.render_table_rows(returnData)
			};
			
			errorCallback = function(returnData){
				alert("CONTROLLER - getItems() - Error");
				$App.Utils.saveComplete();
			};
			
			_this.model.getItems(data,callback,errorCallback);
		}
		
	});
})(jQuery);