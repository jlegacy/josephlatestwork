(function ($) {
	$App.View('ItemDetails', {
			
		initialize: function () {
			
		},				
		
		init : function (data) {
			//
			var _this = this,
			// Templates
			baseTemplate = $App.Template('itemDetails/base.ejs'),
			rowTemplate = $App.Template('itemDetails/row.ejs'),
			container = $(baseTemplate.render(data)),
			backData,
			prevContainer = $("#ssm_selectionItemsContainer,#ssm_EditLineScreen");
			
			// Remove Dialog if it exists
			(data.dialog)?data.dialog.remove():"";
			
			// Show correct back crumb
			container.find("#" + data.from).show();
			
			container.find("#back_to_selection").click(function(){
				backData = {
					ssm_id : data.ssm_id,
					from_details : true
				};		
				
				$App.Utils.saveInProcess({showBlanket : true});
				$App.Fire('loadSelectionItems', backData);
			});
			
			container.find("#ssm_prodDetailsOptionsBar .option").click(function() {
				var option = $(this),
				allOptions = container.find("#ssm_prodDetailsOptionsBar .option"),
				allSections = container.find(".ssm_prodDetailsSection"),
				clickedIndex = allOptions.index(option),
				sectionId = allSections.eq(clickedIndex).attr("id"),
				sectionData = {
					sectionId : sectionId,
					item : data.item.item
				};
				
//				Apply the active class the the clicked option
				allOptions.removeClass("activeOption");
				allOptions.eq(clickedIndex).addClass("activeOption");
				
//				show the appropriate information based on the selected index
				allSections.hide();
				allSections.eq(clickedIndex).show();							
			});		
			
//			Remove any existing instances of this container and attach it to the DOM
			$("#ssm_prodDetailsContainer").remove();
			$("#ssm_SelectionItems").append(container);			
			
			prevContainer.hide();			
		},
		
		// -----------------------------------------------------------------------
		// -
		// -----------------------------------------------------------------------
		populate_product_inventory : function (data) {
			//
			var _this = this,
				template = $App.Template('itemDetails/available_inventory.ejs'),
				rowTemplate = $App.Template('itemDetails/row.ejs'),
				container = _this.container(),
				invRow,
				sectionContainer = $(template.render(data));
						
			$(data.inventory).each(function (index, row) {
				invRow = $(rowTemplate.render(row));
				sectionContainer.find("tbody").append(invRow);
			});			
			
//			Apply the styles to the table
			$App.Utils.applySsmTableStyles({
				table   : sectionContainer,
				evenOdd : "odd"
			});
			
			// If there is no inventory
			if( $(data.inventory).size() == 0 ){
				sectionContainer.find(".no_inventory_row").show();
			}
			
			container.find("#available_inventory").html(sectionContainer);			
		},
		
		populate_additional_details : function (data) {
			//
			var _this = this,
				template = $App.Template('itemDetails/additional_details.ejs'),
				container = _this.container(),
				sectionContainer = $(template.render(data));
			
			container.find("#additional_details").html(sectionContainer);
		},
		
		populate_product_knowledge : function (data) {
			//
			var _this = this,
				template = $App.Template('itemDetails/product_knowledge.ejs'),
				container = _this.container(),
				div,
				item_number_height,
				product_line_height,
				manufacturer_height,
				sectionContainer = $(template.render(data));
						
			// Add the Item# Lines
			$(data.item).each(function (index, item) {
				div = $('<div class="line">' + item.istext + '</div>');
				sectionContainer.find("#item_number").append(div);
			});
			item_number_height = ( $(data.item).size() * 30);
			item_number_height = (item_number_height == 0) ? 30 : item_number_height;
			
			sectionContainer.find("#item_number").prev("label").css("height", item_number_height);
			
			// Add the Product Line Lines
			$(data.productLine).each(function (index, item) {
				div = $('<div class="line">' + item.istext + '</div>');
				sectionContainer.find("#product_line").append(div);
			});
			product_line_height = ( $(data.productLine).size()  * 30);	
			product_line_height = (product_line_height == 0) ? 30 : product_line_height;
			
			sectionContainer.find("#product_line").prev("label").css("height", product_line_height);
			
			// Add the Manufacturer Lines
			$(data.manufacturer).each(function (index, item) {
				div = $('<div class="line">' + item.istext + '</div>');
				sectionContainer.find("#manufacturer").append(div);
			});
			manufacturer_height = ( $(data.manufacturer).size() * 30);
			manufacturer_height = (manufacturer_height == 0) ? 30 : manufacturer_height;
			
			sectionContainer.find("#manufacturer").prev("label").css("height", manufacturer_height);
			
			container.find("#product_knowledge").html(sectionContainer);					
		},
		
		container : function () {
			return $("#ssm_prodDetailsContainer");
		},
		
		load_section_content : function (sectionId) {
			var _this = this,
				template,
				sectionContainer;			
			
			if(sectionId == "additional_details"){								
				template = $App.Template('itemDetails/additional_details.ejs');
				sectionContainer = template.render();
			}
		}
	});		
})(jQuery);

