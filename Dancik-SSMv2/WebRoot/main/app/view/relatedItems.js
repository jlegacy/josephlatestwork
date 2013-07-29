(function ($) {
	$App.View('RelatedItems', {				
		
			
		initialize: function () {
			
		},
		
		init : function (data) {
			var _this = this,
			// Templates
			prevContainer = $("#ssm_selectionItemsContainer"),
			baseTemplate = $App.Template('relatedItems/base.ejs'),
			rowTemplate = $App.Template('relatedItems/row.ejs'),			
			container = $(baseTemplate.render(data.item)),
			submitData = {
				ssm_Selectionid : $App.Model('Selection').currentSelectionId,
				ssm_items       : []
			},
			row;
			
			// Remove any potentially pre-existing instances of this container. Hide the previous menu
			$("#ssm_relProductsContainer").remove();
			prevContainer.after(container).remove(); 
			
			$(data.bomkit).each(function(i, relatedProd){
				row = $( rowTemplate.render(relatedProd) );
				$App.Utils.UOMDropDown( row.find(".ssm_unit_of_measure_select"), {
					item : relatedProd.item
				});
				container.find(".ssmTable > tbody").append(row);
			});						
			
			// Apply Room Type / Area Drop Downs
			$App.Utils.roomTypesDropDown( container.find(".ssm_room_type_select") );
			$App.Utils.roomAreasDropDown( container.find(".ssm_room_area_select") );
			$App.Utils.applySsmTableStyles({
				table : container.find("#ssm_relProductsTable"),
				evenOdd : "odd"
			});
			
			$("form#addRelatedProducts").submit(function(event){
				event.preventDefault();
				
				var _this = this,
					selectedRows = $("#related_items_table tbody tr .relProdCheck:checked"),
					numOfSelectedItems = selectedRows.size();
				
				//
				// If there are selected items continue
				if(numOfSelectedItems > 0){
					$(selectedRows).each(function(index, item){
						var row = $(this).closest('tr'),
							roomType = row.find(".ssm_room_type_select").val(),
							roomArea = row.find(".ssm_room_area_select").val(),
							quantity = row.find(".quantity").val(),
							um = row.find(".um").val(),
							item = row.find(".ssm_item").val(),
							notes = row.find(".notes").val(),
							data = {
								ssm_RoomTypeId : roomType,
								ssm_RoomAreaId : roomArea,
								ssm_Item : item,
								ssm_Qty : quantity,
								ssm_UOM : um,
								ssm_Note : notes																
							};
						
						submitData.ssm_items.push(data);
					});
					//
					$App.Fire('submit_related_items', submitData);
					
					// Clear Array for potential failure condition
					submitData.ssm_items = [];
				}
				// If submit is selected and nothing is chosen to be added.
				else{
					$App.Fire('warn_message', {message : 'Please select at least one item to add.'});
				}				
			});
			
			
			
			//Toggle All checked
			container.find("#ssm_toggleAllItemsChecked").click(function () {
				var checked = $(this).is(":checked");
				
				// 
				// Toggle check
				if(checked){
					container.find(".relProdCheck").attr("checked","checked");
				}else{
					container.find(".relProdCheck").removeAttr("checked");
				}
				
			});
		}		
	});		
})(jQuery);

