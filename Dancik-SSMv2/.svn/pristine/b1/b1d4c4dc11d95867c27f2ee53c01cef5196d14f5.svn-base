/*globals $App */
(function ($) {
	$App.Controller('ItemDetails', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('ItemDetails');
			this.model = $App.Model('ItemDetails');			
		},
	
		init: function (data) {
			//
			var _this = this,
				item = (data.item.item) ? data.item.item : data.item,
				line = (data.item.line) ? data.item.line : 0,
				dialog = (data.dialog) ? data.dialog : null,
				from = (data.from) ? data.from : 'back_to_selection',
				itemData = {
					item   : item,
					ssm_id : $App.Model('Selection').currentSelectionId,
					line   : line,
					dialog : dialog,
					from   : from
				};			
			
			if(line == 0){
				$App.Utils.saveInProcess({showBlanket : true});
			}
			
			// Populate the tab data
			_this.get_item_details(itemData);						
		},
		
		get_product_inventory : function (data) {
			//
			var _this = this,
			
				callback = function (results) {
					//
					_this.view.populate_product_inventory(results);
				},
				
				errorCallback = function (errorResults) {
					//
					$App.Fire('ajax_errors', errorResults);
					$App.Utils.saveComplete();
				};
			
			delete data.dialog;
			_this.model.get_product_inventory(data, callback, errorCallback);
		},
		
		get_product_knowledge : function (data) {
			//
			var _this = this,
			
				callback = function (results) {
					//
					_this.view.populate_product_knowledge(results);
					
				},
				
				errorCallback = function (errorResults) {
					//
					$App.Fire('ajax_errors', errorResults);
					$App.Utils.saveComplete();
				};
			
			delete data.dialog;
			_this.model.get_product_knowledge(data, callback, errorCallback);
		},
		
		get_item_details : function (data) {
			//
			var _this = this,
				dialog = data.dialog;
			
				callback = function (results) {
					$.extend(results.itemInfo[0], data, {dialog : dialog});
					//
					// Render initial page
					_this.view.init(results.itemInfo[0]);
					
					// Populate additional details
					_this.view.populate_additional_details(results.itemInfo[0]);
					
					// Populate the product knowledge tab
					_this.get_product_knowledge(data);
					
					// Populate the product knowledge tab
					_this.get_product_inventory(data);			
					
					// Remove blanket
					$App.Utils.saveComplete();
				},
				
				errorCallback = function (errorResults) {
					//
					$App.Fire('ajax_errors', errorResults);
					$App.Utils.saveComplete();
				};
			
			delete data.dialog;
			_this.model.get_item_details(data, callback, errorCallback);
		}
	});
})(jQuery);