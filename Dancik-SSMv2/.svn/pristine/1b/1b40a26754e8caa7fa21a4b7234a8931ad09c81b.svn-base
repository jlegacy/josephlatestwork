(function($) {
	$App.View('Reports',
		{
			config: $App.Controller('Config').getConfig().config,

			initialize : function() {
				// Dynamically include the plugin for the treeview
				$App.Utils.loadjscssfile("../js/ssm-plugins/jquery.treeview.js", "js");
			},

			// ------------------------------------------------------------
			// -- Renders the initial application layout
			// ------------------------------------------------------------
			init : function(target, config) {
				var _this = this, 
				table, 
				container, 
				base = $App.Template("reports/base.ejs"), 
				commissions_tpl = $App.Template("reports/commissions.ejs"), // content for commissions report
				report_type_content, 
				reports_placeholder;

				_this.config = config;

				// Render the Base
				target.html(base.render({config : _this.config}));
				container = $("#ssm_Reports");
				reports_placeholder = container.find("#ssm_Reports_Placeholder");

				// load the proper template based on report type selected
				container.find("#ssm_report_type_select").change(function() {
					if ($(this).val() == "drilldown") {
						container.find("#ssm_submitReport").hide();
						$App.Fire('drilldownFunctionality',container);
					}

					if ($(this).val() == "commissions") {
						report_type_content = $(commissions_tpl.render());
						reports_placeholder.html(report_type_content);
						_this.commissions_report_functionality(container);
					}
				});

			},
			// ------------------------------------------------------------
			// -- Set datepicker options
			// ------------------------------------------------------------
			datepicker_functionality : function(container) {
				// initialize all Calendars
				container.find('.date-wrapper').each(function() {
					var calContainer = $(this);
					// bind click events for datepicker
					calContainer.find(".ssm-dates").click(function() {
						calContainer.find("input").datepicker({
							dateFormat : 'mm/dd/y',
							showOtherMonths : true,
							selectOtherMonths : true,
							showOn : "button",
							beforeShow : function(input) {
								$(this).attr('readonly', true);
							},
							onClose : function(dateText) {
								$(this).attr('readonly',false);
							},
							onSelect : function(dateText) {}
						});
						calContainer.find("input").datepicker("show");
					});
				});
			},
			// ------------------------------------------------------------
			// -- Handle all basic functionality in the Commissions Report
			// ------------------------------------------------------------
			commissions_report_functionality : function(container) {
				var _this = this;

				// instantiate datepicker functionality
				_this.datepicker_functionality(container);

				// if user is restricted to company then remove the company options
				if (_this.config.restrict_to_company) {
					container.find("#ssm_report_company_select").closest(".containerRow").remove();
					// ensure that payloads get attached regardless of restrictions
					 _this.attach_filter_edit_payloads();
				} else {
					// build the company dropdown
					$App.Utils.companyDropDown(container.find("#ssm_report_company_select"),
						{
							selected_company : _this.config.default_company,
							callback : function() { _this.attach_filter_edit_payloads(); }
						});
				}
				 
				// build the list of References checkboxes
				$App.Utils.referenceCheckboxList(container.find(".subSection.commissionReferences .inputsColumn"));

				// make sure the payloads get updated when the company changes
				container.on('change', '#ssm_report_company_select', function() {
					_this.attach_filter_edit_payloads();
				});

				// Bold checkbox label upon click
				container.on('click', 'input[type=checkbox]', function() {
					if ($(this).prop("checked")) {
						$(this).next("span").css({'font-weight' : 'bold'});
					} else {
						$(this).next("span").css({'font-weight' : 'normal'});
					}
				});

				// display the yellow Optional Filter surrounder
				container.on('click', '.Optionals input[type=checkbox]', function() {
					if ($(this).prop("checked")) {
						$(this).closest(".containerRow").addClass("optionalFilter");
					} else {
						$(this).closest(".containerRow").removeClass("optionalFilter");
					}
				});

				// display Asc / Des radio buttons when a sort by checkbox is selected
				container.on('click', '.sortBy input[type=checkbox]', function() {
					if ($(this).prop("checked")) {
						$(this).closest(".containerRow").find(".radioGroup").show();
					} else {
						$(this).closest(".containerRow").find(".radioGroup").hide();
					}
				});

				// remove an a single included item from the optional filter
				container.on('click', '.Optionals .close-sm', function(event) {
					event.preventDefault();
					$(this).closest("strong").remove();
				});

				// remove all included items from a specific optional filter
				container.on('click', '.Optionals .ssm-clear', function(event) {
					event.preventDefault();
					$(this).closest(".containerRow").find(".filterOptions2 strong").remove();
				});

				// handle submit button click
				container.on('click', '#ssm_submitReport', function(){
					_this.submitCommissionReport();
				})
				// attach payload to each filter edit link
				_this.attach_filter_edit_payloads();

				container.find("#ssm_submitReport").show();
				container.find(".subSection:last").css({borderBottom : "none"});
				container.find(".ssm_interfaceSurrounder").css({paddingBottom : "0"});

			},
			// ------------------------------------------------------------
			// -- Attach a payload to each filter edit link
			// ------------------------------------------------------------
			attach_filter_edit_payloads : function() {
				var _this = this;
				_this.get_container().find("a[href=#rpt_cr_GetLookupListing]").each(function() {
					var file_name = _this.get_file_name($(this));
					$(this).data('payload',{
						file : file_name,
						maxRows : 10,
						filterCompany : _this.get_company(),
						// title for dialog
						msg : _this.get_dialog_title(file_name)
					});
				});

			},
			// ------------------------------------------------------------
			// -- Initiate Dialog for Optional Filters
			// ------------------------------------------------------------
			display_optional_filter : function(data) {
				var _this = this, 
				dialog_width = 580, 
				optFilterBaseTemplate = $App.Template('reports/optionalFilterBase.ejs'),
				optFilterTitleTemplate = $App.Template('reports/optionalFilterTitle.ejs'), 
				$dialog = $(optFilterBaseTemplate.render()), 
				numOfRows, 
				filterForm = $dialog.find("#filterSearch"),
				// optionsContainer, row, tbody,
				rows;

				// Define and open the popup window
				$dialog.dialog({
					autoOpen : false,
					title : optFilterTitleTemplate.render({
						msg : data.msg,
						width : parseInt(dialog_width - 16)
					}),
					modal : true,
					width : dialog_width,
					close : function() {
						// remove modal
						$(this).remove();
					},
					position : {
						my : "top",
						at : "top",
						of : window
					}
				});
				$dialog.dialog('open');

				$dialog.find(".lightBlueGradientHeader").width(parseInt(dialog_width - 25));
				$dialog.find("#ssm_optionalFilterTableContainer .detachedFooter").width(parseInt(dialog_width - 32));
				$dialog.find("#ssm_optionalFilterTableContainer .ssmTableWrapper").width(parseInt(dialog_width - 11));

				// load the results into the dialog container
				_this.load_filter_rows(data);

				// Set the Results - Query Info text
				numOfRows = $dialog.find("tbody tr").size();
				$dialog.find("#queryInfo").html(
						"Results: " + numOfRows + " of "
								+ data.info.querysize);

				// bind the click event to the 'More' results button
				$dialog.on('click','#optional_filter_results_more input',function(event) {
									var startingRec, 
									moreRows = parseInt($dialog.find("select[name=maxRows]").val()),
									querySize = data.info.querysize;

									// get the amount of rendered rows
									numOfRows = $dialog.find("tbody tr").size();

									// don't submit this form
									event.preventDefault();

									// merge the data with the existing data and attach it to the form
									$.extend(filterForm.data().payload, {
											startingRec : numOfRows,
											maxRows : moreRows,
											moreResultsFlag : 1
													});
									// no need to post to the model if you already have all of the rows
									if (querySize != numOfRows) {
										// post the form to the model
										filterForm.trigger("submit");
									};
								});
				// setup click functionality on each row
				$dialog.on('click','tbody tr td', function() {
									var thisRow = $(this).closest("tr"), 
									thisForm = thisRow.closest("form");

									// add a blue background to row on click
									thisRow.toggleClass("selectedRow");

									// "file" is also used as id of the optional filters checkbox
									// we need to pass this back in order to append the new
									// filter to the correct section
									$.extend(thisRow.data().row_payload,{file : data.file});
									thisForm.data('payload',thisRow.data().row_payload);

									if (thisRow.hasClass("selectedRow")) {
										thisForm.prop("action","#rpt_cr_AddFilter");
									} else {
										thisForm.prop("action","#rpt_cr_RmvFilterOption");
									};
									// submit the data
									thisForm.trigger("submit");
								});

			},
			// ------------------------------------------------------------
			// -- get the dialog container for access from all functions
			// ------------------------------------------------------------
			get_dialog_container : function() {
				return $('#ssm_optionalFilterContainer');
			},
			// ------------------------------------------------------------
			// -- get the reports container for access from all functions
			// ------------------------------------------------------------
			get_container : function() {
				return $('#ssm_Reports');
			},
			// ------------------------------------------------------------
			// -- return default company in scope of restrictions
			// ------------------------------------------------------------
			get_company : function() {
				var _this = this, container = _this.get_container(), filterCompany;

				if (_this.config.restrict_to_company) {
					filterCompany = _this.config.default_company;
				} else {
					filterCompany = container.find("#ssm_report_company_select").val();
				}
				return filterCompany;
			},
			// ------------------------------------------------------------
			// -- Fill the Optional Filters dialog with the filters
			// ------------------------------------------------------------
			load_filter_rows : function(data) {
				var _this = this, container = _this.get_container(), 
				optFilterRowTemplate = $App.Template('reports/optionalFilterRow.ejs'), 
				tbody, 
				optionsContainer, 
				numOfRows, 
				dialog = _this.get_dialog_container(), 
				filterForm = dialog.find("#filterSearch");

				// get the location where the current options reside
				optionsContainer = _this.get_filter_location(data.file);

				// attach 'file' to the filter form to pass to the model
				dialog.find('#filterSearch').data('payload', {
					file : data.file,
					maxRows : data.maxRows,
					moreResultsFlag : 0,
					filterCompany : _this.get_company()
				});

				// define area where the rows will be appended
				tbody = dialog.find('table.ssmTable tbody');

				// Create each row of the Optional Filter interface
				$.each(data.records,function(i, record) {
					var currentRow, row;
					row = $(optFilterRowTemplate.render(record));
					tbody.append(row);
					currentRow = tbody.find("tr:last");
					currentRow.data('row_payload',{
						id : record.id, 
						description : record.description
					});
					// loop through preselected options and highlight the row if item has been selected
					optionsContainer.find("strong").each(function() {
						if (currentRow.data().row_payload.id == $(this).data('id')) {
							currentRow.addClass("selectedRow");
						}
					});
				});

				// Set the Results - Query Info text
				numOfRows = dialog.find("tbody tr").size();
				dialog.find("#queryInfo").html("Results: " + numOfRows + " of " + data.info.querysize);

				// Fix Table Border Issue
				$App.Utils.applySsmTableStyles({table : dialog.find("#ssm_optionalFilterTableContainer"), evenOdd : "odd"});
			},

			// ------------------------------------------------------------
			// -- Retrieve the id of the checkbox closest to the clicked
			// -- element to be passed to the model as the 'file'
			// ------------------------------------------------------------
			get_file_name : function(element) {
				var _this = this, 
				file_name = $(element).closest(".containerRow").find("input[type=checkbox]").prop("id");

				return file_name;
			},
			// ------------------------------------------------------------
			// -- Map file name with a title for the Dialog box
			// ------------------------------------------------------------
			get_dialog_title : function(file_name) {
				var dialog_title;
				
				switch (file_name) {
					case "manufacturer":
						dialog_title = "Manufacturer";
						break;
					case "branch":
						dialog_title = "Branch";
						break;
					case "costcenter":
						dialog_title = "Cost Center";
						break;
					case "salesman":
						dialog_title = "Salesperson";
						break;
					case "item_class_1":
						dialog_title = "Item Class 1";
						break;
					case "item_class_2":
						dialog_title = "Item Class 2";
						break;
					case "item_class_3":
						dialog_title = "Item Class 3";
						break;
				}
				dialog_title = "Optional Filter: " + dialog_title;

				return dialog_title;
			},
			// ------------------------------------------------------------
			// -- Add a filter to the specified optional filter
			// ------------------------------------------------------------
			add_optional_filter : function(data) {
				var _this = this, optionsContainer, htmlOption, filterType, existsFlag = 0;

				// get the location where the options will be placed
				optionsContainer = _this.get_filter_location(data.file);
				// Set the correct wording for the error / info messages
				filterType = _this.get_dialog_title(data.file);

				// // Loop through each filter option
				// optionsContainer.find("strong").each(function(){
				// // check if filter already exists and set a flag if it does
				// ($(this).data('id') == data.id) ? existsFlag = 1 : "";
				// });

				// if(existsFlag){
				// $App.Fire('errors', data.id +" already exists in "+ filterType);
				// }else{
				// structure the html + data for the option
				htmlOption = "<strong>"	+ data.id + "<span class='commandButton'><a href='#'  class='close-sm' title='Remove Option'></a></span>, </strong>";
				// place the option in the options container
				optionsContainer.append(htmlOption);
				optionsContainer.find("strong").last().data({
					id: data.id,
					description: data.description
				});
				// display acknowledgment to the user of what was added
				// $App.Fire('info_message', data.id +" was added to the "+ filterType);
				// }
			},
			// ------------------------------------------------------------
			// -- Remove a filter from the specified optional filter
			// ------------------------------------------------------------
			remove_optional_filter : function(data) {
				var _this = this, 
				filterType, 
				optionsContainer;

				// get the location where the options will be removed from
				optionsContainer = _this.get_filter_location(data.file);
				// Set the correct wording for the error / info messages
				// filterType = _this.get_dialog_title(data.file);

				// Loop through each filter option
				optionsContainer.find("strong").each(function() {
					// Remove the matching filter
					($(this).data('id') == data.id) ? $(this).remove() : "";
				});

				// display acknowledgment to the user of what was removed
				// $App.Fire('info_message', data.id +" was removed from the "+ filterType);

			},
			submitCommissionReport : function(data) {
				var _this = this, 
					container = _this.get_container();
				
				
				
				params = {
						filepath : container.find("#ssm_cr_filepath").val(),
						parm_todate : container.find("#ssm_report_commissions_date_range_to").val(),
						parm_fromdate : container.find("#ssm_report_commissions_date_range_from").val(),
						filters : {
							filter : []
						},
						roles : {
							ssmrole : []
						},
						orderby : {
							ordby : []
						},
						speccond : {
							cond : {
								type : 1,
								desc : 'Include Trim? : ',
								fname : 'item_trim',
								val1 : container.find("input[name=includeTrim]").val()
							}
						}
				};
				//	get references (roles)
				container.find(".commissionReferences .inputsColumn input")
				.filter(":checked")
				.each(function(){
					params.roles.ssmrole.push({
						desc: "",
						id: $(this).val()
					});
				});
				//	get filters
				container.find(".Optionals input[type=checkbox]")
				.filter(":checked")
				.each(function(){
					var filterOptions = [], // params.filters.filter.ids.rec
					IO,
					optionsContainer = _this.get_filter_location($(this).prop("id"));

					// get include or omit
					IO = $(this).closest(".containerRow")
						.find(".radioGroup input[type=radio]")
						.filter(":checked")
						.val();

					// get all filter options
					optionsContainer.find("strong").each(function(){
						filterOptions.push({
							id: $(this).data().id,
							description: $(this).data().description
						});
					});

					params.filters.filter.push({
						name: $(this).val(),
						description: $(this).closest(".containerRow").find(".checkboxLabel").text(),
						io: IO,
						ids: {
							rec: filterOptions
						}
					});

				});
				//	manually set company
				params.filters.filter.push({
					name : 'company',
					io : 'I',
					ids : {
						rec : {
							id : _this.get_company(),
							description : ''
						}
					}
				});
				// get orderby
				container.find(".sortBy .inputsColumn input[type=checkbox]")
				.filter(":checked")
				.each(function(){
					var direction = $(this)
					.closest(".containerRow")
					.find("input[type=radio]")
					.filter(":checked")
					.val();
					params.orderby.ordby.push({
						name: $(this).val(),
						direction: direction
					});
				});
//							
				$App.Fire('submitCommisionReport', params);

			},
			// ------------------------------------------------------------
			// -- Reset to defaults
			// ------------------------------------------------------------
			reset_to_defaults: function(){
				var _this = this,
				container = _this.get_container();
				
				container.find("input").each(function(){
					switch($(this).prop('type')){
						case "text":
							$(this).prop("value", "");
							break;
						case "checkbox":
							$(this).prop("checked", false);
							break;
					}
				});
				container.find(".checkboxLabel").removeAttr("style"); // remove all bold style from checkbox labels
				container.find(".radioGroup").find("input:even").each(function(){ //reset all radio buttons
					$(this).prop('checked', true);
				});
				container.find(".sortBy .radioGroup").hide(); // hide all sort by options
				container.find(".filterOptions2").html(""); // remove all options from all filters 
				container.find(".Optionals .containerRow").removeClass("optionalFilter"); // hide the filter surrounders
				
				$App.Utils.companyDropDown(container.find("#ssm_report_company_select"),
				{
					selected_company : _this.config.default_company,
					callback : function() { _this.attach_filter_edit_payloads(); }
				});
			},

			// ------------------------------------------------------------
			// -- Get the location of the current filter options selected
			// ------------------------------------------------------------
			get_filter_location : function(file) {
				var _this = this, optionsContainer;

				optionsContainer = $("#" + file).closest(".optionalFilter").find(".filterOptions2");

				return optionsContainer;
			},
			// ------------------------------------------------------------
			// -- Clear all results from the dialog
			// ------------------------------------------------------------
			clear_dialog_results : function() {
				var _this = this, 
				tbody = _this.get_dialog_container().find('tbody');

				tbody.html("");
			}
		});
})(jQuery);
