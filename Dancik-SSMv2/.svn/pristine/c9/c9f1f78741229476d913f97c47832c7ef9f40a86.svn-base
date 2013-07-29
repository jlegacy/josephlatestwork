(function ($) {
	$App.View('References', {
		config : {},
		
		initialize: function () {},
		
		initialRow : "",
		
		// ------------------------------------------------------------
		// -- Renders the initial application layout
		// ------------------------------------------------------------
		initEditor: function (gen_ref_obj, options) {
			// 
			// 
			var _this = this, container, option = "", 
			reference_adder = $App.Template("references/reference_add_details.ejs"),
			template = $App.Template("references/base.ejs"),
			state_select;
						
			 
//			Remove any existing Reference Editor
//			Hide the Selection Interface 
//			Add a "fresh" Reference Editor Interface
			
			$("#ssm_reference_editor").remove();
			$(".surrounder, #ssm_SelectionCategories").hide();
			container = $(template.render({ssmID : $App.Model("Selection").currentSelectionId}));
			container.find("#ssm_references_add_mode > td").append($(reference_adder.render()));
			$("#ssm_SelectionTabs > ul").after( container );
			
//			Set the inital "No Results" row
			_this.initialRow = container.find("#ssm_edit_reference_table > tbody > tr:eq(1)");
			
//			Populate Reference Type Selection List			
			//option += '<option value=""></option>';
			$(gen_ref_obj.reference_hdrs).each(function(i, v) {
				if(v.id != 7) {
					option += '<option value="'+v.id+'">'+v.description+'</option>';
				}
			});			
			container.find("#ssm_reference_type").html(option);
			
//			Populate states selection for Add Reference
			state_select = container.find("#addReferenceRecord select[name=ssm_state]");
			$App.Utils.statesDropDown(state_select);
			
//			Events	
//			Close add reference description interface
			container.find("#ssm_reference_cancel").click(function(){
				$("#ssm_references_add_mode").fadeOut(50);
				container.find("#ssm_reference_type").removeAttr("disabled");
			});
			
//			Filter Reference Types
			container.find("#ssm_reference_type").change(function() {
				var ssm_header_id = $(this).val(), data;	
				container.find(".ssmReferenceAddType").html( $(this).find("option:selected").text() );
				
				if(ssm_header_id != "") {					
					data = {ssm_HeaderId : ssm_header_id};
					$App.Fire("loadReferenceDetails", data);										
					$(".ssm_busy").show();					
				}else{
					container.find("a[href=#putReferenceIntoAddMode]").hide();
//					Remove the previous rows
					container.find("#ssm_edit_reference_table > tbody > tr:gt(0)").remove();
					container.find("#ssm_edit_reference_table > tbody").append(_this.initialRow);
				}
			});		
			
//			Show Add New Reference
			container.find("a[href=#putReferenceIntoAddMode]").click(function() {
				var selectedReference = container.find("#ssm_reference_type option:selected").text(); 
					
				container.find("#ssm_reference_type").attr("disabled", "disabled");
				container.find("#ssm_references_add_mode").fadeIn(50);
				container.find("a[href=#closeInterface]").fadeOut(200);
				
				container.find(".ssmReferenceAddType").html(selectedReference);
			});			
						
//			Return to previous Screen
			container.find("#return_to_references").click(function() {
				_this.close(container);			
			});
			
//			 Show Items Screen - Hide this screen
			$("a[href=#ssm_SelectionItems]").click(function(){
				container.hide();
				$(".surrounder, #ssm_SelectionCategories").show();
			});
			
//			Preload a Reference List
			_this.preslect(container, options);
			
		},
		
		close : function(container){
			var ssm_id = $App.Model("Selection").currentSelectionId;
			container.hide();
			$(".surrounder, #ssm_SelectionCategories").show();
			
//			Refresh Selection's References
//			Clear the Cache so any changes will be reflected
			$App.Controller("Cache").remove('reference_hdrs');
			$App.Controller("Cache").remove('reference_dtls');
			$App.Fire("loadSelectionReferences", {ssm_id:ssm_id});		
		},
		
		preslect : function(container, options) {
			var data = {ssm_HeaderId : options.referenceId},
				busyBox = container.find(".ssm_busy");
						
			container.find("#ssm_reference_type option").removeAttr("selected");
			container.find("#ssm_reference_type option:eq("+options.index+")").attr("selected", "selected");			
			
			busyBox.show();		
			$App.Fire("loadReferenceDetails", data);
		},
		
		render_rows : function(data) {
//			Initialize Templates
			var reference_editor = $App.Template("references/reference_edit_details.ejs"),			
			reference_deatils = $App.Template("references/reference_details_table.ejs"),
			container = $("#ssm_reference_editor"), row
			_this = this;
			
//			Hide loader
			$(".ssm_busy").hide();
			
//			Remove the previous rows
			container.find("#ssm_edit_reference_table > tbody > tr:gt(0)").remove();
			
//			Add selected reference type details
			$(data.details).each(function(i,ref_data){
				row = _this.get_single_row(reference_deatils, reference_editor, ref_data, _this);
//				Append the row
				container.find("#ssm_edit_reference_table > tbody > tr:last-child").after(row);
			});
			
//			show the add button
			container.find("a[href=#putReferenceIntoAddMode]").show();
			
//			Add borders to the table
			$App.Utils.applySsmTableStyles({
				table : $(".ssmTableWrapper"),
				evenOdd : "even"
			});						
		},
		
		update_single_row : function(existing_row, ref_data) {
//			Initialize Templates
			var reference_editor = $App.Template("references/reference_edit_details.ejs"),			
			reference_deatils = $App.Template("references/reference_details_table.ejs"), row			
			_this = this;		
			
//			Create the row
			row = _this.get_single_row(reference_deatils, reference_editor, ref_data.detail, _this);
			
//			Remove the old row and ease in the new one
			existing_row.after(row).remove();
			row.fadeIn();
			_this.saveComplete();
			
//			Add borders to the table
			$App.Utils.applySsmTableStyles({
				table : $(".ssmTableWrapper"),
				evenOdd : "even"
			});
		},
		
		get_single_row : function(reference_deatils, reference_editor, ref_data, _this) {
			/* Initialize Templates */
			var row = $($App.Template("references/reference_table_row.ejs").render()),
			edit_window = $(reference_editor.render(ref_data)),
			ref_details = $(reference_deatils.render(ref_data)),
			states_select = edit_window.find('select[name=state]');
			
			/* Create States DropDown*/				
			$App.Utils.statesDropDown(states_select, {"selected_state" : ref_data.state});				
			
			/* Populate the row */
			row.find(".ssm-edit-reference-container").append(edit_window);
			row.find(".ssm_reference_table_info_wrapper").append(ref_details);								
			
			/* Row Events */
			/* Toggle Classes - Show Edit Screen */
			_this.row_toggle(row, ref_data);
			
			/* Save changed reference data */
			_this.save_row_changes(row, ref_data);
			
			return row;
		},
		
//		Toggle rows as being expanded and editable v.s. being closed and un-editable
		row_toggle : function(row, ref_data) {
			var _this = this, row,
				selectedReference = $("#ssm_reference_type option:selected").text(); 
			
			row.find(".ssmReferenceEditType").html(selectedReference);
			
			row.find("td .ssm-edit.expand").click(function() {
				row = $(this).closest("tr")
				if($(this).hasClass("expand")){
					$(this).removeClass("expand").addClass("collapse");									
					row.find(".ssm_reference_table_info_wrapper").slideUp();
					row.find(".ssm-edit-reference-container").slideDown();
					$("#ssm_reference_type").attr("disabled", "disabled");						
				}else {					
					$(this).removeClass("collapse").addClass("expand");					
					row.find(".ssm_reference_table_info_wrapper").slideDown(150);	
					row.find(".ssm-edit-reference-container").slideUp(function() {
						$App.Fire("updateReferenceDetails", {
							ssm_personid : ref_data.id,
							row : row
							}
						);										
						_this.saveInProcess();
						$("#ssm_reference_type").removeAttr("disabled");
					});										
				}		
			});
		},
		
//		Save row data on blur of the data element
		save_row_changes : function(row, ref_data) {
			row.find(".ssm-edit-reference-container input, .ssm-edit-reference-container select").on('blur', function() {
				var value = $(this).val(),
				name = $(this).attr("name"),
				data = {
					"ssm_id" : ref_data.id,
					"ssm_Name" : name,
					"ssm_Data" : value						
				};					
				$App.Fire("setReference", data);					
			});
		},
		
		clear_add_interface : function(){
			var form = $("#addReferenceRecord");
			form.find("input[type!=submit]").val("");
			form.find("select option").removeAttr("selected");
			form.find("select option:eq(0)").attr("selected","selected");
		},
		
//		Toggle Saving Indicator
		saveInProcess: function () {
			$('#ssm_Selection .savingIndicator').addClass('save-inprocess');
		},		
		
		saveComplete: function () {
			$('#ssm_Selection .savingIndicator').removeClass('save-inprocess');
		},
		
		postSave : function (ref_type_selector) {
			ref_type_selector.removeAttr("disabled");
			$("#ssm_references_add_mode").hide();
			$("#ssm_edit_reference_table > tbody > tr:gt(1)").remove();
			$("#ssm_Dashboard_SelectionsListing .ssm_busy").show()
				.css("top",top);
		}
	});
})(jQuery);

