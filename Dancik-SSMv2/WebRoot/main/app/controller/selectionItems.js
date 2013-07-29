/*globals $App */
(function ($) {
	$App.Controller('SelectionItems', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('SelectionItems');
			this.model = $App.Model('SelectionItems');
			
		},
		// ------------------------------------------------------------
		// -- 
		// ------------------------------------------------------------
		loadItems: function (data) {
//			
			var _this = this,
			from_add = data.from_add,
			from_kits = data.from_kits,
			from_edit = data.from_edit,
			from_details = data.from_details,
			from_order = data.from_order;
								
			_this.model.getItems(data, function (results) {					
//				If this function was called from the add function, re-initialize addMode
				if(from_add) {
					_this.view.renderItems(results);
					_this.initiateAddMode();					
					$App.Fire('info_message',{
						message : 'Item Successfully Added'
					});
				}
				else if(from_order){		
					_this.view.renderItems(results);
					$("#ssm_orderProcessingContainer").fadeOut(100,function() {
						$("#ssm_orderProcessingContainer").remove();
						$("#ssm_Selection").fadeIn(100);
						$App.Utils.saveComplete();
					});
				}
				else if(from_kits) {
					_this.view.renderItems(results);
					$App.Utils.saveComplete();
					$("#ssm_kitsContainer").remove();
					$("#ssm_selectionItemsContainer").show();
					$App.Fire('info_message',{
						message : 'Kit Items Successfully Added'
					});
				}
				else if(from_details) {
					$App.Utils.saveComplete();
					$("#ssm_prodDetailsContainer").remove();
					$("#ssm_selectionItemsContainer").show();					
				}
				else if(from_edit) {
					_this.view.renderItems(results);
					$("#ssm_EditLineScreen").fadeOut(100,function(){
						("#ssm_EditLineScreen").remove();
						$("#ssm_selectionItemsContainer").show();						
					});								
					$App.Utils.saveComplete();
				}
				else{			
					_this.view.renderItems(results);
					$App.Utils.saveComplete();
				}
			}, function (errorResults) {
				$App.Utils.saveComplete();
				$App.Fire('ajax_errors', errorResults);
			});				
		},		
		
		initiateAddMode : function() {		
			//	--	Get selects that need to get populated into jQuery objects
			var RoomTypeSelect = $("#ssm_room_type_select"),
				RoomAreaSelect = $("#ssm_room_area_select"),
				RestrictionCodeSelect = $("#ssm_restriction_codes_select"),
				PriceCodeSelect = $("#ssm_price_codes_select"),
				_this = this;
			
			
//			Call the appropriate Utility function to populate the dropdown menu
			$App.Utils.roomTypesDropDown(RoomTypeSelect);
			$App.Utils.roomAreasDropDown(RoomAreaSelect);
			$App.Utils.restrictionCodesDropDown(RestrictionCodeSelect);
			$App.Utils.priceCodesDropDown(PriceCodeSelect);
			
			
//			Call the view to initialize Add Mode
			_this.view.initialize_add_mode();		
		},
		
		/* Add a Selection Item */
		addSelectionItem : function(data) {
//			
			var _this = this,
			ssm_id = data.ssm_Selectionid;
			$App.Utils.saveInProcess({showBlanket : true});

			var callback = function (returnData) {

//				Handle Kits
				if(returnData.kit) {
					var kit_count = _this.kit_count(returnData);
					if(kit_count > 0){					
						$App.Controller("Kits").init(data, returnData);
						$App.Utils.saveComplete();
					}else{
						$App.Fire("errors", {
							errid : "",
							message : "This Kit has no Kit Items"
						});
						$App.Utils.saveComplete();
					}
				}							
//				Handle Success
				else if(returnData.success) {
//					$App.Fire('info_message', {message : "Item # "+ ssm_id +" was added."});
					_this.loadItems({
						ssm_id : ssm_id,
						from_add : true
					});
					if (returnData.notifications) {
						$App.Fire("showNotification", returnData.notifications);
					}
				}				
			};
			
			var callbackError = function (errorData) {
				_this.view.saveComplete();
				$App.Fire("ajax_errors", errorData);
			};
			
			_this.model.addSelectionItem(data,callback,callbackError);						
		},
		
		openItemDetails : function(){
			alert("openItemDetails() not implemented yet");
		},
		
		showItemOptions : function(data){
			var _this = this,
			
				callback = function(returnData) {
					$App.Utils.saveComplete();
					$.extend(returnData, {from : data.from});
					_this.view.displayAvailableOptions(returnData)
				},
				
				errorCallback = function(errorData) {
					$App.Utils.saveComplete();
					$App.Fire("ajax_errors", errorData);
				};
			
			$App.Utils.saveInProcess({showBlanket:true});
			_this.model.getItem(data, callback, errorCallback);
			
		},
		
//		Delete the selected Selection Items
		removeSelectionItems: function () {
			var _this = this, data, 
			ssmId = $App.Model('Selection').currentSelectionId,
			ssmLineNum = _this.view.delete_selection_items();
			$App.Utils.saveInProcess({ showBlanket : true });
			data = {
					ssm_id : ssmId,
					ssm_line : ssmLineNum
			}
			
//			Perform Delete
			_this.model.removeItems(data, function (results) {
				_this.loadItems({ssm_id : ssmId});
				$App.Fire('info_message', {message : "Selection items successfully deleted."});
			}, function (errorResults) {
				$App.Fire('ajax_errors', errorResults);
			});			
		},
		
		kit_count : function(data){
			var count = 0;
			$(data.kit).each(function(i,kit){
				(kit.kititem_flag != "Y")?count++:"";
			});			
			return count;
		}		
	});
})(jQuery);