/*globals $App */
(function ($) {
	$App.Controller('EditLine', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('EditLine');
			this.model = $App.Model('EditLine');
			
		},
		// ------------------------------------------------------------
		// -- 
		// ------------------------------------------------------------
		init: function (data) {
			var _this = this;	
			_this.getSelectionItem(data);
		},
		
		// ------------------------------------------------------------
		// -- 
		// ------------------------------------------------------------
		getSelectionItem : function(data){
			var _this = this,
			callback =function(results){
				_this.view.init(results);
				$App.Utils.saveComplete();
			}; 
			
			$App.Utils.saveInProcess({showBlanket:true});
			
			_this.model.getSelectionItem(data,callback);			
		},

		// ------------------------------------------------------------
		// -- Save the Edit Mode Form Data
		// ------------------------------------------------------------
		setSelectionItemRecord : function(data){
			var _this = this;
			$App.Utils.saveInProcess({showBlanket : true});
			data.ssm_PriceOverride = data.ssm_PriceOverride.replace("$","");
			_this.model.setSelectionItemRecord(data,
					// Callback
					function (results) {
						_this.view.returnToSelectionItems();
					},
					// ErrorCallback
					function (errorData){
						$App.Fire("ajax_errors", errorData);
						$App.Utils.saveComplete();
					}
			);			
		},
		
		// ------------------------------------------------------------
		// -- 
		// ------------------------------------------------------------
		clearMessageLine : function(data, obj) {
			this.view.clearMessageField(obj);
		},
		
		// ------------------------------------------------------------
		// -- open the Macro Messages interface
		// ------------------------------------------------------------
		openMacroMessages : function(payload) {
			var _this = this,
			ssm_id = $App.Model('Selection').currentSelectionId;			
			$App.Utils.saveInProcess({showBlanket : true});
			_this.model.openMacroMessages({ssm_id:ssm_id},
					// Callback
					function (results) {
						$.extend(results, payload);							
						_this.view.display_macro_messages(results);
						$App.Utils.saveComplete();
					},
					// ErrorCallback
					function (errorData){
						$App.Fire("ajax_errors", errorData);
						$App.Utils.saveComplete();
					}
			);			
		}
		
	});
})(jQuery);