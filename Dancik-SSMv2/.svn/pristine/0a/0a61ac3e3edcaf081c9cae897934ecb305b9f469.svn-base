(function ($) {
	$App.View('EditLine', {
		container: null,
		config: $App.Controller('Config').getConfig().config,
		
		// -------------------------------------------------------------------------
		// - Function : initialize
		// -------------------------------------------------------------------------
		initialize: function () {
		},

		// -------------------------------------------------------------------------
		// - Function : init
		// -------------------------------------------------------------------------
		init: function (results) {					
			var _this = this, 
				container,
				selectionTabs = $("#ssm_SelectionItems"),
				itemsHome = $("#ssm_selectionItemsContainer, #ssm_relProductsContainer, #ssm_prodDetailsContainer"),
				item = $.extend(results.item, { "uoms" : results.uoms }),
				baseTemplate = $App.Template('editLine/base.ejs');			
			itemsHome.remove();

			container = $(baseTemplate.render(item));
			_this.container = container;

			//	-- Populate and set selected values on drop downs
			$App.Utils.roomTypesDropDown(container.find("select[name=ssm_RoomTypeId]"), {selected_roomtype: item.roomtype_id});
			$App.Utils.roomAreasDropDown(container.find("select[name=ssm_RoomAreaId]"), {selected_roomarea: item.roomarea_id});
			$App.Utils.restrictionCodesDropDown(container.find("select[name=ssm_RestrictionCode]"), {selected_restrictioncode: item.rccode});
			$App.Utils.priceCodesDropDown(container.find("select[name=ssm_PL_Override]"), {selected_pricecode: item.override_pricelist});

			// -- Load Notes field values, this way, instead of within EJS, because of possible single or double quotes screwing up HTML...
			container.find("input[name=ssm_Note]").val(item.note2);
			container.find("input[name=ssm_Note3]").val(item.note3);
			container.find("input[name=ssm_Note4]").val(item.note4);
			container.find("input[name=ssm_Note5]").val(item.note5);
			container.find("input[name=ssm_Note6]").val(item.note6);
			container.find("input[name=ssm_Note7]").val(item.note7);
			container.find("input[name=ssm_Note8]").val(item.note8);
			container.find("input[name=ssm_Note9]").val(item.note9);
			
			selectionTabs.append(container);

			// -- Attach the item details to the Product Information Button Click
			container.find("a[href=#openItemDetails]").click(function () {
				var element = $(this);
				$App.Utils.saveInProcess({showBlanket: true});
				$.extend(results, {from: 'back_to_item'});
				element.data('payload', results);
			});
			
			// -- Attach the ssm_Id and line # to the form
			container.find("form[action=#setSelectionItemRecord]").data('payload', {
				ssm_Selectionid : results.item.id,
				ssm_Line : results.item.line
			});

			// -- If the override list is changed, wipe out the override price
			container.find("#selected-override-price-id").off();
			container.find("#selected-override-price-id").on('change', function () {
				container.find('#price-override-id').val('');			
			});
			
			// -- If the override price is changed, wipe out the override list
			container.find("#price-override-id").off();
			container.find("#price-override-id").on('blur', function () {
				if($(this).val() != ""){
					container.find('#selected-override-price-id option').each(function(){
						if ($(this).val()==""){
							$(this).prop('selected', true);
						}
					});
				}
			});

			// -- Initiate Macro Messages Inteface
			container.find("#ssm_macroMessagesWrapper .memo").click(function () {
				$("#ssm_macroMessagesContainer").remove();
				var row = $(this).closest(".containerRow"),
					element = $(this);
				// -- Remove any existing Macro Message Container
				$("#ssm_macroMessagesContainer").remove();
				//	-- Assigned the row jQuery object as the payload to go along with this Link Route
				element.data('payload', {
					row: row,
					results: results
				});
			});

			
			// -- Attach payload to selection item link
			container.find("a[href=#ssm_SelectionItems]").click(function () {
				var element = $(this),
					data = {
						ssm_id : $App.Model('Selection').currentSelectionId,
						from_edit : true
				};
				element.data('payload', data);
			});
			
			// -- Check user restrictions and render edit mode accordingly
			if(_this.config.inquiry_mode == "Y"){
				 $App.View('Selection').renderStatus("F");
			} else {
				$App.View('Selection').renderStatus();
			}

		},
			
		// -------------------------------------------------------------------------
		// - Function : returnToSelectionItems
		// -------------------------------------------------------------------------
		returnToSelectionItems : function(){
			var _this = this,
			container = _this.container;
			container.find("a[href=#ssm_SelectionItems]").trigger('click');
		},
		
		// -------------------------------------------------------------------------
		// - Function : clearMessageField
		// -------------------------------------------------------------------------
		clearMessageField: function (obj) {
			var row = $(obj).closest(".containerRow"),
				input = row.find('.macroNotes');
				input.val("");
		},

		// -------------------------------------------------------------------------
		// - Function : display_macro_messages
		// -------------------------------------------------------------------------
		display_macro_messages: function (data) {
			var _this = this,
				dialog_width = 750,
				baseMacroTemplate = $App.Template('selectionItems/macroMessagesBase.ejs'),
				marcoRowTemplate = $App.Template('selectionItems/macroMessageRow.ejs'),
				marcoTitleTemplate = $App.Template('selectionItems/macroMessageTitle.ejs'),
				row,
				$dialog,
				notes_rows = $("#ssm_macroMessagesWrapper > div"),
				row_index = parseInt(notes_rows.index(data.row)),
				numOfRows = notes_rows.size(),
				container = $(baseMacroTemplate.render());

//			Create each row of the Macro Messages interface
			$(data.macros).each(function (i, marcoMessage) {
				row = $(marcoRowTemplate.render(marcoMessage));
				container.find("tbody").append(row);
			});

			// Fix Table Border Issue
			$App.Utils.applySsmTableStyles({
				table: container.find(".ssmTableWrapper"),
				evenOdd: "odd"
			});

//			Define and open the popup window
			$dialog = $('<div class="ssm-NotificationDialog"></div>')
				.html(container.html())
				.dialog({
				autoOpen: false,
				title: marcoTitleTemplate.render( {
						"msg": "Macro Messages: Line " + parseInt(row_index + 1),
						width: parseInt(dialog_width - 16)
					}
				),
				modal: true,
				width: dialog_width + 'px'
			});
			$dialog.dialog('open');

			// Close this interface
			$('body').on('click', '.ssm_closeMacroMessageContainer', function () {
				$dialog.dialog('destroy').remove();
			});

			// Select a Marco Message and close the interface
			$dialog.unbind().on('click', '.addMacroMessage', function () {
				var row = $(this).closest('tr'),
					description = row.find('td:eq(2)').text().replace(/^\s+/gi, ""),
					prop,
					value,
					macro_row_index = row.parent().find('tr').index(row),
					macro_row_obj = data.macros[macro_row_index],
					msgId;
				var sorted_macros = [], short_macro = [],
					key, myarray = [], short_array = [];
				
				//sort the results Object in alphabetical order and change name to sorted_macros
				for (key in macro_row_obj) {
					if (macro_row_obj.hasOwnProperty(key)) {
						myarray.push(key);
					}
				}
				myarray.sort();
				for (key = 0; key < myarray.length; key++) {

					sorted_macros.push(macro_row_obj[myarray[key]]);

				}
//				Iterate through all the .msg[i]'s of the selected macro note object and set
//				the value for the clicked Notes row to the last Notes row
				for (i = 1; i < 9; i++) {
					if (sorted_macros[i]) {
						short_macro.push(sorted_macros[i])
					}
				}
				for (i = 0; i < short_macro.length; i++) {
					note_input = notes_rows.eq(row_index).find(".macroNotes"),
						note_input.val(short_macro[i]);
					if (row_index < 8) {
//						_this.set_selection_item_field(note_input, data.results);
					}
					row_index++;
				}
				$dialog.dialog('destroy').remove();
			});

		}
	});
})(jQuery);

