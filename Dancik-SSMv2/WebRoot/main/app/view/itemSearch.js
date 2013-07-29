(function ($) {
	$App.View('ItemSearch', {
		
		config : {
			baseTemplate : $App.Template('itemSearch/base.ejs'),
			rowTemplate : $App.Template('itemSearch/row.ejs')		
		},				
			
		initialize: function () {
			
		},
		
		init : function (data) {	
			//
			var _this = this, container,
			selectionTabs = $("#ssm_SelectionItems"), 
			itemsHome = $("#ssm_selectionItemsContainer"),			
			ssm_id =  $App.Model('Selection').currentSelectionId;
			
//			Hide the Selection Item screen and load this one
			itemsHome.hide();
			container = $(_this.config.baseTemplate.render());
			selectionTabs.append(container);									
						
//			Fix Table Border Issue
			container.find(".ssmTable th:not(:last-child), .ssmTable td:not(:last-child)").css("border-right", "1px solid #ccc");
			
//			Form Submission 
			container.find("#getItems").submit(function(e) {
//				
//				Show the loading bar
				$("#ssm_itemSearchContainer .ssm_busy").show();
				e.preventDefault();				
			});
			
//			Return to previous screen
			container.find("#ssm_SelectionItemsLinks").click(function() {
				itemsHome.show();				
				container.fadeOut(100, function() {
					container.remove();					
				});				
				itemsHome.find("input[name=ssm_Item]").focus();
			});
			
//			Highlight table row
			container.find("#ssm_itemSearchResults").on('mouseenter', 'table tbody td', function() {
				var row = $(this).closest("tr");
				row.find("td").each(function(){
					$(this).addClass("hover");
				});									
			});
			
//			Unhighlight the tabe row 
			container.find("#ssm_itemSearchResults").on('mouseleave','table tbody td',function() {
				var row = $(this).closest("tr");
				row.find("td").each(function() {
					$(this).removeClass("hover");
				});										
			});
			
//			Return to the previous screen and set the item value
			container.find("#ssm_itemSearchResults").on('click', 'table tbody td', function() {
				var row = $(this).closest("tr"),
				itemNumber = row.find("td:eq(0)").text(),				
				uomSelect = itemsHome.find("#ssm_unit_of_measure_select");
				
				uomSelect.find("option").remove();
				$App.Utils.UOMDropDown(uomSelect, {
					item : itemNumber,
					errorCallback : function(errorData) {

					}
				});
//				Attach the item details to the Product Information Button Click
				itemsHome.find("a[href=#openItemDetails]").click(function(){
					var element = $(this);
					$App.Utils.saveInProcess({showBlanket:true});	
					$.extend(data,{item : itemNumber});
					element.data('payload',data);			
				});			
			
				itemsHome.find("input[name=ssm_Item]").val(itemNumber);				
				itemsHome.show();
				
//				Set the focus to the next input area and fadeout / remove this interface
				itemsHome.find("input[name=ssm_Qty]").focus();
				container.fadeOut(100,function(){
					container.remove();
				});				
			});
			
//			Update the displayed number of results
			container.find("#ssm_itemSearchNumOfResults").change(function() {
				_this.show_rows( $(this).val() );
			});
			
//			Show more results
			container.find("#ssm_itemSearchMoreResults").click(function() {				
				_this.show_more_less_rows();
			});		
			
//			Perform a search based on the selected letter / number from a-z 0-9
			container.find("#ssm_itemSearchResultsBar").on('click', '.ssmShowLetter', function() {
				var letter = $(this).text();
				letter = (letter == "All")?"":letter;
				
//				Show the loading bar
				$("#ssm_itemSearchContainer .ssm_busy").show();
				
//				Call Search Function
				$App.Controller("ItemSearch").getItems( {
					keyword  : container.find("input[name=keyword]").val(),
					indexchar : letter
				});
			})
			
			if(data.hasTerm){
				container.find("input[name=keyword]").val(data.searchTerm);
				container.find("input[type=submit]")[0].click();
			}
		},
		
//		Creates and returns the letter / number list based on the ASCII numberic code range for the list
		get_letters_list : function(wordIndex) {
			var letterList = '',
			curLetter,
			word,
			isALink;						
			
//			A - Z
			for(i = 65; i < (65+26); i++){
				curLetter = String.fromCharCode(i);
				isALink = false
				for(j = 0; j < wordIndex.length; j++) {
					word = wordIndex[j];
					if(word.charAt(0).toLowerCase() == curLetter.toLowerCase()) {
						letterList += '<li><a href="#" class="ssmShowLetter">'+curLetter+'</a></li>';
						isALink = true;
					}else{}
				}
				if(! isALink) {
					letterList += '<li>'+curLetter+'</li>';
				}
			}
//			0 - 9
			for(i=48; i < (48+10); i++) {
				curLetter = String.fromCharCode(i);
				isALink = false
				for(j = 0; j < wordIndex.length; j++) {
					var word = wordIndex[j];
					if(word.charAt(0).toLowerCase() == curLetter.toLowerCase()) {
						letterList += '<li><a href="#" class="ssmShowLetter">'+curLetter+'</a></li>';
						isALink = true;
					}else{}
				}
				if(! isALink) {
					letterList += '<li>'+curLetter+'</li>';
				}
			}
			letterList += '<li><a href="#" class="ssmShowLetter">All</a></li>';
			
//			Take the compiled li's and set the innerHTML of the UL
			$("#ssm_lettersList").html(letterList);
		},
		
		// Render the returned data rows
		render_table_rows : function(rowData) {
			var _this = this,
			wordIndex = [];
			
//			Create the letter index array
			$(rowData.indexes).each(function(i, letter) {				
				wordIndex.push(letter.id);
			});
			
//			Use the created array to build the letter / number link list
			_this.get_letters_list(wordIndex);
			
			
//			Show the Results Bar, the actual results, and the footer
			$("#ssm_itemSearchResultsBar, .ssmTableWrapper, #ssm_itemSearchFooter").show();
			
//			Remove any potentially pre-existing rows and populate the table with the new rows of data
			$("#ssm_itemSearchResults .ssmTable tbody tr").remove();
			$(rowData.records).each(function(i, row) {				
				var new_row = $(_this.config.rowTemplate.render(row));				
				$("#ssm_itemSearchResults .ssmTable tbody").append(new_row);				
			});
			
//			Apply the border / alternating shading to the results table
			$App.Utils.applySsmTableStyles({
				table : $("#ssm_itemSearchResults .ssmTableWrapper"),
		        evenOdd : "odd"
			});
			
//			Hide the loading bar
			$("#ssm_itemSearchContainer .ssm_busy").hide();
			
//			Set Record Count to 10
			_this.set_row_count_select(1);
			
//			Show 10 rows by default
			_this.show_rows(10);			
		},		
		
//		Set the select options selected index
		set_row_count_select : function(n) {
			$("#ssm_itemSearchNumOfResults > option").removeAttr("selected");
			$("#ssm_itemSearchNumOfResults > option:eq("+n+")").attr("selected","selected");
		},
		
//		Show more results function (could show less in the future maybe?)
		show_more_less_rows : function() {
			var _this = this,
			visible_row_count = parseInt($("#ssm_itemSearchResults .ssmTable tbody tr:visible").size()),
			increment_by = parseInt($("#ssm_itemSearchNumOfResults").val()),
			num_of_rows_to_show = visible_row_count + increment_by;								
			_this.show_rows(num_of_rows_to_show);							
		},
//		Shows the number of rows passed in variable "n"
		show_rows : function(n) {			
			var _this = this;
			$("#ssm_itemSearchResults .ssmTable tbody tr").hide();
			$("#ssm_itemSearchResults .ssmTable tbody tr:lt("+n+"), .ssmTable tbody tr:eq("+n+")").each(function(){
				$(this).show();
			});
			_this.update_display_ranges();
		},
//		Updates the output for the ranges of displayed rows above and below the search results table
		update_display_ranges : function() {
			var _this = this,
			upper_limit = $("#ssm_itemSearchResults .ssmTable tbody tr:visible").size(),
			num_of_rows = $("#ssm_itemSearchResults .ssmTable tbody tr").size();
			
			$("#ssm_ItemResultsRange").html("1 - "+upper_limit+" of "+num_of_rows+" for ");
			$("#ssm_itemSearchFooterText").html("Results "+upper_limit+" of "+num_of_rows);
		}
	});		
})(jQuery);

