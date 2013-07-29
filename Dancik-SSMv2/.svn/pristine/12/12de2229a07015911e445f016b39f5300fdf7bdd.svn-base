/*globals $App */
(function ($) {
	$App.Controller('Kits', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('Kits');
			this.model = $App.Model('Kits');
			
		},
		// ------------------------------------------------------------
		// -- 
		// ------------------------------------------------------------
		init: function (data, returnedData) {
			var _this = this;
			_this.view.init(data, returnedData);			
		},		
		
		// ------------------------------------------------------------
		// -- Add items to selection
		// ------------------------------------------------------------
		addSelectionItems : function(data) {
			var _this = this;
			$App.Utils.saveInProcess({showBlanket : true});
			// Callback Function 
			var callback = function(obj) {				
				$App.Controller("SelectionItems").loadItems({
					ssm_id : $App.Model('Selection').currentSelectionId,
					from_kits : true
				});
			};
			
			// Error Callback function
			var errorCallback = function(obj) { 
				$App.Utils.saveComplete();
				$App.Fire('ajax_errors', obj);
			};
			
			_this.model.addSelectionItems(data, callback, errorCallback);
		}		
		
	});
})(jQuery);