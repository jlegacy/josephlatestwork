(function ($) {
	$App.View('ReportsDrilldown', {
		config : {},
		
		initialize: function () {
			// Dynamically include the plugin for the treeview
			$App.Utils.loadjscssfile("../js/ssm-plugins/jquery.treeview.js", "js");
		},
		
		// ------------------------------------------------------------
		// -- Renders the initial application layout
		// ------------------------------------------------------------
		init: function (data) {
			var _this = this,
			container = _this.getContainer(),
			ViewByText = _this.getTextfromDropdowns().ViewByText,
			SubSortText =  _this.getTextfromDropdowns().SubSortText,
			drilldownTree_tpl = $App.Template("reports/drilldownTree.ejs"),
			ddTreeViewBy_tpl = $App.Template("reports/drilldownTreeViewBy.ejs"),
			drilldown_summary_placeholder = container.find("#ssm_Reports_Drilldown_Placeholder"),
			reportsContainer = container.find('#ssm_Reports_Drilldown_Details_Placeholder');

			// render the treeview (drilldown summary)
			drilldown_summary_placeholder.html(drilldownTree_tpl.render(data));	
			drilldown_summary_placeholder.show();
			reportsContainer.hide();
	
			// set the breadcrumb text
			(ViewByText=="Manufacturer")?ViewByText = "Mfgr":"";
			breadCrumbLevel1 = "Drilldown by " + ViewByText	+ "/" + SubSortText;
			container.find("#ssm_dd_bc").text(breadCrumbLevel1);
			
			// render the viewby items in the treeview
			$.each(data.records, function (index, record) {
				// render the viewby item in the treeview
				var viewByRecord = ddTreeViewBy_tpl.render(record);
				// add it to the list
				container.find("ul.filetree>li").append(viewByRecord);
				// attach data the viewby item
				container.find("ul.filetree>li>ul li.viewby:last").data('ssm_MainSort_Keys',{
					level1_key1 : record.level1_key1,
					level1_key2 : record.level1_key2,
					level1_description : record.level1_description
				});
				
			});

			// initialize treeview
			container.find("#mfgrBranchDrillDown").treeview();
			
			// prevent duplicating event handlers by unbinding before adding one
			// I'm sure there is a better solution for this
			container.off('click', 'span.viewby a');
			// trigger a click on the + to expand the next level in the tree
			// when a viewby item is clicked on
			container.on('click', 'span.viewby a', function(){
				$(this).closest("li").find(".viewby-hitarea").trigger('click');
			});
			
			// get the 2nd level data
			container.on('click', 'li>.closed-hitarea', function(){
				// gather the level 1 data required to get the 2nd level
				var params = {
						level1_key1: $(this).closest("li").data().ssm_MainSort_Keys.level1_key1,
						level1_key2: $(this).closest("li").data().ssm_MainSort_Keys.level1_key2
				};
				// get the second level items
				$App.Fire('rpt_dd_getLevel2', params);
			});
		},
		// ------------------------------------------------------------
		// -- Show Sub Sort
		// ------------------------------------------------------------
		expandViewBy: function(results){
			var _this = this,
			container = _this.getContainer(),
			level2container,
			ddTreeSubSort_tpl = $App.Template("reports/drilldownTreeSubSort.ejs");
			
			// use results level1_key1 and level1_key2 to find the location in the tree
			// where the level 2 items will be placed
			container.find("#mfgrBranchDrillDown li.viewby").each(function(){
				// first find the LI that matches the 1st key of level 1
				if( $(this).data().ssm_MainSort_Keys.level1_key1 ==  results.records[0].level1_key1){
					// verify that the 2nd key matches
					if( $(this).data().ssm_MainSort_Keys.level1_key2 ==  results.records[0].level1_key2){
						// this is the container for the level 2 data
						level2container = $(this).find("ul.subsort");
					}
				}
			});
			// clear out the dummy placeholder html
			level2container.html("");

			// place the level 2 items within the level 2 container
			$.each(results.records, function (index, record) {
				var subSortRecord = ddTreeSubSort_tpl.render(record),
				level2Text = record.level2_key1;
				
				// append "/level2_key2" if it exists
				if(record.level2_key2){
					level2Text += "/" + record.level2_key2; 
				}
				
				// append the next record
				level2container.append(subSortRecord);
				// insert the text of the level 2 data
				level2container.find("li:last strong:eq(0)").html(level2Text);
				// attach data to the appended li
				level2container.find('li:last').data('params',{
					level2_key1 : record.level2_key1,
					level2_key2 : record.level2_key2,
					level2_description : record.level2_description
				});
			});

			// prevent duplicating event handlers by unbinding before adding one
			// I'm sure there is a better solution for this
			container.off('click', 'ul.subsort li');
			container.on('click', 'ul.subsort li', function(){
				var params = {
						level2_description: $(this).data().params.level2_description,
						level2_key1: $(this).data().params.level2_key1,
						level2_key2: $(this).data().params.level2_key2,
						level1_description: $(this).closest('li.viewby').data().ssm_MainSort_Keys.level1_description,
						level1_key1: $(this).closest('li.viewby').data().ssm_MainSort_Keys.level1_key1,
						level1_key2: $(this).closest('li.viewby').data().ssm_MainSort_Keys.level1_key2
				};
				
				// merge all of the keys with the form values
				$.extend(params, _this.collectFormValues());
				
				$App.Fire('rpt_dd_getDetail', params);
			});
		},

		// ------------------------------------------------------------
		// -- Open Drilldown Detail
		// ------------------------------------------------------------
		openDrilldownDetail: function(data){
			var _this = this,
			ViewByText = _this.getTextfromDropdowns().ViewByText,
			SubSortText =  _this.getTextfromDropdowns().SubSortText,
			breadCrumbLevel1,breadCrumbLevel2,breadCrumbLevel3,
			fullLevel1Desc, fullLevel1Desc, 
			container = _this.getContainer(),
			drilldownResults_tpl = $App.Template("reports/drilldownResults.ejs"),
			drilldownDetailRows_tpl = $App.Template("reports/reportTableRows.ejs"),
			reportsContainer = container.find('#ssm_Reports_Drilldown_Details_Placeholder'),
			treeViewContainer = container.find('#ssm_Reports_Drilldown_Placeholder');
					
			// hide the section that contains the drilldown tree
			treeViewContainer.hide();
			
			// render the details table container template
			reportsContainer.html(drilldownResults_tpl.render(data));
			reportsContainer.show();
			
			// build breadcrumb
			// 1st (left most) crumb
			(ViewByText=="Manufacturer")?ViewByText = "Mfgr":"";
			breadCrumbLevel1 = "Drilldown by " + ViewByText	+ "/" + SubSortText;
			container.find("#ssm_bc_drilldown_lvl1").text(breadCrumbLevel1);
			// assign click event handler for 1st crumb
			container.on('click', '#ssm_bc_drilldown_lvl1', function(){
				container.find("#ssm_Reports_Placeholder form").submit();
			});
			// 2nd crumb
			breadCrumbLevel2 = ViewByText + ": " + data.level1_key1;
			if (data.level1_key2){
				breadCrumbLevel2 += "/" + data.level1_key2;
			}
//			breadCrumbLevel2 += " - " + data.level1_description;
			container.find("#ssm_bc_drilldown_lvl2").text(breadCrumbLevel2);
			// assign click event handler for 2nd crumb
			container.on('click', '#ssm_bc_drilldown_lvl2', function(){
				reportsContainer.fadeOut('slow', function(){
					treeViewContainer.show();
				});
			});
			// 3rd crumb
			breadCrumbLevel3 = SubSortText + ": " + data.level2_key1; 
			if (data.level2_key2){
				breadCrumbLevel3 += "/" + data.level2_key2;
			}
//			breadCrumbLevel3 += " - " + data.level2_description;
			container.find("#ssm_bc_drilldown_lvl3").text(breadCrumbLevel3);
			
			// Set all of the text in the info directly under the bread crumb 
			// ViewBy Text
			container.find("#ssm_dd_viewby_placeholder").text(_this.getTextfromDropdowns().ViewByText + ": ");
			// ViewBy Description
			fullLevel1Desc = data.level1_key1;
			if (data.level1_key2){
				fullLevel1Desc += "/" + data.level1_key2;
			}
			fullLevel1Desc += " - " + data.level1_description;
			container.find("#ssm_dd_viewby_desc_placeholder").text(fullLevel1Desc);
			
			// SubSort Text
			container.find("#ssm_dd_subsort_placeholder").text(SubSortText + ": ");
			// SubSort Description
			fullLevel2Desc = data.level2_key1;
			if (data.level2_key2){
				fullLevel2Desc += "/" + data.level2_key2;
			}
			fullLevel2Desc += " - " + data.level2_description;
			container.find("#ssm_dd_subsort_desc_placeholder").text(fullLevel2Desc);
			
			// set the text for the total $ amount
//			container.find(".drillDownInfo .drillDownExtendedDetails span").eq(1).text("$CHANGE THIS!");
			
			// render each row within the table
			$.each(data.records, function (index, record) {
				var detailRow = drilldownDetailRows_tpl.render(record);
				container.find("#ssm_ReportsTable tbody").append(detailRow);
			});
			
			// format the details table
			$App.Utils.applySsmTableStyles({evenOdd : 'odd'	});
			
			// set the text for the # of results
			container.find(".drillDownInfo .drillDownExtendedDetails span").eq(0).text(container.find("tbody tr").length);
			

		},
		
		// ------------------------------------------------------------
		// -- Collect Form Values
		// ------------------------------------------------------------
		collectFormValues: function(){
			var _this = this,
			container = _this.getContainer(),
			formValues = {
				ssm_MainSort: container.find("select[name=ssm_MainSort]").val(),
				ssm_SubSort: container.find("select[name=ssm_SubSort]").val(),
				ssm_BeginDate: container.find("input[name=ssm_BeginDate]").val(),
				ssm_EndDate: container.find("input[name=ssm_EndDate]").val()
				
			};
			
			return formValues;
		},
		// ------------------------------------------------------------
		// -- Global method for assigning the container
		// ------------------------------------------------------------		
		getContainer: function(){
			return $("#ssm_Reports");
		},
		// ------------------------------------------------------------
		// -- Basic functionality for drilldown reports
		// ------------------------------------------------------------		
		drilldownFunctionality: function() {
			var _this = this,
			container = _this.getContainer(),
			drilldown_tpl = $App.Template("reports/drilldown.ejs").render(), //content for drilldown report
			subsortContainer,
			subsortOptions = $App.Template("reports/drilldownSubSortOptions.ejs").render(),
			reports_placeholder = container.find("#ssm_Reports_Placeholder");
			
			reports_placeholder.html(drilldown_tpl);
			subsortContainer = container.find("#ssm_report_sub_sort_select");

			// dependent dropdown functionality
			container.on('change', '#ssm_report_view_by_select', function(){
				// add all of the available options to the select
				subsortContainer.html(subsortOptions);
				// remove options depending on what was selected in the view by select
				
				if( $(this).val() == "salesperson" ){
					subsortContainer.find("option").filter('[value=salesperson]').remove();
				};
				if( $(this).val() == "status" ){
					subsortContainer.find("option").filter('[value=status]').remove();
				};
			});
			_this.datepicker_functionality(container);
		},
		// ------------------------------------------------------------
		// -- Returns the Text from the value selected on each dropdown
		// ------------------------------------------------------------
		getTextfromDropdowns: function(){
			var _this = this,
			container = _this.getContainer(),
			ViewByID, ViewByText,
			SubSortID, SubSortText;
			
			// get the view by text (MainSort)
			ViewByID = container.find("#ssm_report_view_by_select").val();
			container.find("#ssm_report_view_by_select option").each(function(){
			    if($(this).val()==ViewByID){
			    	ViewByText = $(this).text();
			    }
			});
			// get the sub sort text (SubSort)
			SubSortID = container.find("#ssm_report_sub_sort_select").val();
			container.find("#ssm_report_sub_sort_select option").each(function(){
			    if($(this).val()==SubSortID){
			    	SubSortText = $(this).text();
			    }
			});
			return {
					ViewByText: ViewByText,
					SubSortText: SubSortText
			};
			
		},
		// ------------------------------------------------------------
		// -- Set datepicker options
		// ------------------------------------------------------------
		datepicker_functionality : function(container){
			// initialize all Calendars
			container.find('.date-wrapper').each(function () {
				var calContainer = $(this);
				// bind click events for datepicker
				calContainer.find(".ssm-dates").click(function() {				
					calContainer.find("input").datepicker({
	                    dateFormat: 'mm/dd/y',
	                    showOtherMonths: true,
	                    selectOtherMonths: true,
	                    showOn: "button",
	                    beforeShow: function(input){
	                        $(this).attr('readonly', true);
	                    },
	                    onClose: function(dateText){
	                        $(this).attr('readonly', false);
	                    },
	                    onSelect: function(dateText) { 
	                    }
	                });
					calContainer.find("input").datepicker("show");
				});
			});
		}
		
		
		
		
		
	});
})(jQuery);

