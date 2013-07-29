/*globals $App */
(function ($) {
	$App.Controller('RelatedItems', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('RelatedItems');
			this.model = $App.Model('RelatedItems');
			
		},	
		
		init: function (data) {
			var _this = this,			
			callback = function(returnData){
				$.extend(data,returnData);
				$App.Utils.saveComplete();
				data.dialog.remove();
				_this.view.init(data)
			},
			errorCallback = function(errorData){
				$App.Fire("ajax_errors", errorData);
				$App.Utils.saveComplete();
			};			
			_this.model.getRelatedItems({ssm_item : data.item.item},callback,errorCallback);
		},
		
		submit_related_items : function (data) {
			var _this = this,
			
				callback = function (results) {
//					
					$App.Controller('SelectionItems').loadItems({
						ssm_id : data.ssm_Selectionid
					});
					$App.Fire('info_message', {message : "Selected items have been successfully added."});
				},
				
				errorCallback = function (errorResults) {
//					
					$App.Utils.saveComplete();
					$App.Fire('ajax_errors', errorResults);
				};
				
				$App.Utils.saveInProcess({showBlanket : true});
				_this.model.submit_related_items(data, callback, errorCallback);
		}
	});
})(jQuery);