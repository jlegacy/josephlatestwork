(function ($) {
    $App.View('SelectionSearch', {
    	 config: $App.Controller('Config').getConfig().config,

        initialize: function () {
//        	var target = $App.View('Application').get_app_container();
        	var _this = this;

//        	target.html($App.Template("dashboard/createNewHeader.ejs").render());
//            target.append($App.Template("selectionSearch/searchSelectionFileResultsDetails.ejs").render());
        	
        },

        // ------------------------------------------------------------
        // -- Renders the initial application layout
        // ------------------------------------------------------------
        init: function (target) {
            var _this = this, 
            data = {
            		ssm_Keyword_FilterOn_Customer : "Y",
                	ssm_Keyword_FilterOn_Reference : "Y",
                    ssm_Keyword_FilterOn_JobInfo : "Y",
                    ssm_Keyword_FilterOn_Notes : "Y",
                    ssm_Keyword_FilterOn_Notepad : "Y",
                    ssm_Keyword_FilterOn_Items : "Y"		
            };

        	// -- Sets the "Selections" tab as selected...
            $App.Fire('setActiveTab', $('#tab_selections'));
            _this.openSelectionFileResultsDetailsWait(target);
			_this.renderSearchForm(data);
			_this.unbusy();
            
        },
        
        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        busy: function () {
            $('.ssm_busy').show();
            $('.more_form').hide();
        },
        unbusy: function () {
            $('.ssm_busy').hide();
        },

        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        showResults: function () {
        	$("#search_box").addClass("hide");
            $('#ssm_SelectionSearch .ssm_search_results').show();
        },
        hideResults: function () {
            $('#ssm_SelectionSearch .ssm_search_results').hide();
        },
        clearResults: function(target, data){
//            $('#ssm_SelectionSearch .results_table').empty();
        	$('#ssm_SelectionSearch #searchResultsTable tbody').empty();
        	
        },

        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        openSelectionFileResultsDetailsWait: function (target) {
        	var _this = this;
//
        	target.html($App.Template("dashboard/createNewHeader.ejs").render());
            target.append($App.Template("selectionSearch/searchSelectionFileResultsDetails.ejs").render());
            
//       	 set up click functionality on the Advanced Search
	       	 target.find('.filterSection .ssm-expand, #advancedSearchExpand').off();
	       	 target.find('.filterSection .ssm-expand, #advancedSearchExpand').on('click', function (event) {
	       		 event.preventDefault();
	       		 if((target.find("#advancedSearchOptions")).is(":hidden")){
	       			target.find("#advancedSearchOptions").slideDown();  
	       			target.find(".filterSection .commandButton a").removeClass().addClass('ssm-collapse');
	       			
	       		 } else{
	       			 target.find("#advancedSearchOptions").hide();
	       			 target.find(".filterSection .commandButton a").removeClass().addClass('ssm-expand');
	       		 }       		 
	       		 target.find(".filterSection").toggleClass("advExpanded");
	       		 
	       	 });
       	 
	         // Build  the warehouse drop down
	       	 $App.Utils.selectionWarehousesDropDown(target.find("select[name=ssm_FilterBy_CreationWarehouse]"),{
	       		 selected_warehouse: _this.config.default_warehouse 
	       	 });
	       	// Build  the status drop down
	       	 $App.Utils.statusesDropDown(target.find("select[name=ssm_FilterBy_CurrentStatus]"));
	       	 // Build  the user drop down       	 
	       	$App.Utils.selectionUsersDropDown(target.find("select[name=ssm_FilterBy_CreationUser]"));
	       	 
//            $('#ssm_SelectionSearch .filterSection').hide();
        },

        // ------------------------------------------------------------
        // -- Render the form and checkboxes one time only
        // ------------------------------------------------------------
        renderSearchForm: function(data){
        	var _this = this,
        	 target = $App.View('Application').get_app_container();
        	
//        	target.html($App.Template("dashboard/createNewHeader.ejs").render());
//        	target.append($App.Template("selectionSearch/searchSelectionFileResultsDetails.ejs").render());
        	// put the keyword for the search in the searchbox
        	 target.find('input#ssm_search_selected_checksboxes').val(data.ssm_Keyword);
        	 // Process Check Boxes // 
//            target.find('.filter_check_boxes').on('click', function () {
//                _this.signalAppFireCustomerAndSelection($('input#ssm_search_selected_checksboxes').val(), data);
//            	_this.triggerFormSubmit();
//            });
        	
            if (data) {
	        	if (data.ssm_Keyword_FilterOn_All == 'Y') {
	        		target.find('input#checkbox_customers').attr('checked', false);
	        		target.find('input#checkbox_reference').attr('checked', false);
	        		target.find('input#checkbox_jobinfo').attr('checked', false);
	        		target.find('input#checkbox_notes').attr('checked', false);
	        		target.find('input#checkbox_notepad').attr('checked', false);
	        		target.find('input#checkbox_items').attr('checked', false);
	                delete data.ssm_Keyword_FilterOn_All;
	            } else {
	                // Setup CheckBoxes //
	            	target.find('input#checkbox_customers').attr('checked', (data.ssm_Keyword_FilterOn_Customer == "Y") ? true : false);
	            	target.find('input#checkbox_reference').attr('checked', (data.ssm_Keyword_FilterOn_Reference == "Y") ? true : false);
	                target.find('input#checkbox_jobinfo').attr('checked', (data.ssm_Keyword_FilterOn_JobInfo == "Y") ? true : false);
	                target.find('input#checkbox_notes').attr('checked', (data.ssm_Keyword_FilterOn_Notes == "Y") ? true : false);
	                target.find('input#checkbox_notepad').attr('checked', (data.ssm_Keyword_FilterOn_Notepad == "Y") ? true : false);
	                target.find('input#checkbox_items').attr('checked', (data.ssm_Keyword_FilterOn_Items == "Y") ? true : false);
	            }
            } else {
				this.unbusy();
            }
//        	straighten up the text with the icons
        	target.find(".filterSection .containerRow").eq(3).css({lineHeight:"30px"});
        	 target.find('#ssm_SelectionSearch #searchResultsTable').html($App.Template("selectionSearch/searchResultsHeaders.ejs").render());
        	 
        },
        
        
        triggerFormSubmit: function(){
        	$App.View('Application').get_app_container().find("form[action=#search_results_submit]").trigger('submit'); 
        },
        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        openSelectionFileResultsHeadings: function (target, data) {
        },
        
        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        openSelectionFileResultsCheckBoxes: function (target, data) {
            var _this = this;

            $('#ssm_SelectionSearch .filterSection').show();
            
            // -- Set Selections as the active tab
            $App.Fire('setActiveTab', $('#tab_selectionFile'));
        },

        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        createResultsLabel: function (query, data, target) {
            var start,end, results;
            // start = query.nextstartingrecord - $('.SSM-select').val();
            start = 1;
            end =  query.nextstartingrecord - 1;
            
            
            if (query.eof == "Y")
            {
                end = query.querysize;
            }
            
            results = 'Results ' 
            + start 
            + ' - ' 
            + end 
            + ' of '  
            + query.querysize 
            + ' selections for ' + '<b>' 
            + data.ssm_Keyword + '</b>'; 
        
            if  (query.querysize == 0)
            {
                results = "No selections found for <b> "
                + data.ssm_Keyword + '</b>'; 
            }
           
            (end < query.querysize) ? target.find(".footer").show() : target.find(".footer").hide();
             
            
            return results;
        },

   
        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        openSelectionFileResultsDetails: function (target, results, data) {
            var  _this = this,
            classId,
            n,
            extended,
            searchResultRows,
            idLastRec,
            container = $("#ssm_SelectionSearch");
	  
            // -- Sets the "Selections" tab as selected...
            $App.Fire('setActiveTab', $('#tab_selections'));
            
            
            _this.results = results;
            _this.data = data;
                  
            //determine number of last record to start record to generate unique id per record//
            //used primarily because of more button//
            
            idLastRec = $('.ssm_search_detail_selection').last().attr('id');
            if (typeof idLastRec == 'undefined') {
                lastRecord = {
                    lastRec: -1              
                };
            }
            else
            {    
                n = idLastRec.split("_");
                lastRecord = {
                    lastRec: n[1]              
                };
            }
            
            searchResultRows = $App.Template("selectionSearch/searchResultsDetails.ejs").render(results, lastRecord);
            if (data.more == "Y"){
            	$('#ssm_SelectionSearch .results_table tbody').append(searchResultRows);
            } else {
            	$('#ssm_SelectionSearch .results_table tbody').html(searchResultRows);
            }
            
            // abide by user restrictions in control panel
            if(!_this.config.allow_copying_selections){
            	$(".results_table").find(".ssm_extend_icon_copy").closest(".commandButton").remove();
            }
            if(!_this.config.allow_deleting_selections){
            	$(".results_table").find(".ssm_extend_icon_delete").closest(".commandButton").remove();
            }
            
            data.more == "N"
            //Set totals for label search result box//
            $('label#selection_results_label').html(_this.createResultsLabel(results.queryinfo, data, target));
            
            //set reference titles//
            $.each(results.references, function (value, index) {
                classId = 'div.reference_' + index.id;
                $(classId).html(index.description);
            });
            
            $('.more_form').data('payload', $.extend(data, {
            		ssm_StartingRecord: results.queryinfo["nextstartingrecord"]
        		})
            );
            
            $('.more_form').data('payload', $.extend(data, {
	            	ssm_StartingRecord: results.queryinfo["nextstartingrecord"]
	        	})
	        );
          
            if (results.queryinfo["nextstartingrecord"] == 0) {
                $('.more_form').hide();
            } else {
                $('.more_form').show();
            }
            
            if (results.queryinfo["querysize"] == "0") {
                $('#ssm_SelectionSearch .results_table').hide();
            } else {
                $('#ssm_SelectionSearch .results_table').show();
            }
            
            _this.setAltRowColorSelections();
            

            // Expand Icon Clicks //
            $('#ssm_SelectionSearch div.expand_icon').off();
            $('#ssm_SelectionSearch div.expand_icon').on('click', function () {
            	var bgcolor = $(this).closest("tr").css("background-color");
                id = $(this).attr('id');
                n = id.split("_");
                extended = '.graphic_' + n[1];

                $(this).closest('tr').next().toggle().css("background-color", bgcolor);
                $(this).closest('td').toggleClass('ssm_border_bottom');

                $(this)
                	.toggleClass('ssm_search_detail_icon_expand')
                	.toggleClass('ssm_search_detail_icon_shrink');
                $(extended).toggle();

            });
//       	 set up click functionality on the Advanced Search
//            container.find('.filterSection .ssm-expand, #advancedSearchExpand').off();
//            container.find('.filterSection .ssm-expand, #advancedSearchExpand').on('click', function (event) {
//	       		 event.preventDefault();
//	       		 if((container.find("#advancedSearchOptions")).is(":hidden")){
//	       			container.find("#advancedSearchOptions").slideDown();  
//	       			container.find(".filterSection .commandButton a").removeClass().addClass('ssm-collapse');
//	       			
//	       		 } else{
//	       			container.find("#advancedSearchOptions").hide();
//	       			container.find(".filterSection .commandButton a").removeClass().addClass('ssm-expand');
//	       		 }       		 
//	       		container.find(".filterSection").toggleClass("advExpanded");
//	       		 
//	       	 });
	            
            // Initially hide all extended details //
            $('.ssm_search_extended_details').hide();



            //Clear main selection id box, retain value of checkbox selection box//
            $('input#ssm_Search_SelectionId').val('');
//            $('input#ssm_search_selected_checksboxes').val(data.ssm_Keyword);
                

            $('.extended_section2').each(function(){
                if ($(this).html() == "&nbsp;")
                {
                    var id = $(this).attr("id");
                    n = id.split("-");
                    target = "#section1-" + n[1];
                    $(target).remove();
                    $(this).remove();
                }
            });
        
            if (data.ssm_Keyword_FilterOn_All == 'Y') {
                $('input#checkbox_customers').attr('checked', false);
                $('input#checkbox_reference').attr('checked', false);
                $('input#checkbox_jobinfo').attr('checked', false);
                $('input#checkbox_notes').attr('checked', false);
                $('input#checkbox_notepad').attr('checked', false);
                $('input#checkbox_items').attr('checked', false);
                delete data.ssm_Keyword_FilterOn_All;
            } else {
                // Setup CheckBoxes //
                $('input#checkbox_customers').attr('checked', (data.ssm_Keyword_FilterOn_Customer == "Y") ? true : false);
                $('input#checkbox_reference').attr('checked', (data.ssm_Keyword_FilterOn_Reference == "Y") ? true : false);
                $('input#checkbox_jobinfo').attr('checked', (data.ssm_Keyword_FilterOn_JobInfo == "Y") ? true : false);
                $('input#checkbox_notes').attr('checked', (data.ssm_Keyword_FilterOn_Notes == "Y") ? true : false);
                $('input#checkbox_notepad').attr('checked', (data.ssm_Keyword_FilterOn_Notepad == "Y") ? true : false);
                $('input#checkbox_items').attr('checked', (data.ssm_Keyword_FilterOn_Items == "Y") ? true : false);
            }
            
               
        },
        
        setAltRowColorSelections: function () {
            $('.ssm_search_details:odd').css("background-color", "#F4F4F4");
        },
        
        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        signalAppFireCustomerAndSelection: function (inputVal, data) {
        	var searchResultsForm = $("form[action=#search_results_submit]");
        	
            //if app fire being called by main screen then go ahead and load dummy screen so we can//
            //show records being initially loaded//

            //if div selection file references do not exist then load dummy screen//
            if ($('.ssm_selectionFile_references').length == 0) {
            	data.ssm_selectionPage = 'N';
            } else {
                data.ssm_selectionPage = 'Y';
            }

            //set up data for query//
            delete data.ssm_Keyword_FilterOn_Reference;
            delete data.ssm_Keyword_FilterOn_Customer;
            delete data.ssm_Keyword_FilterOn_JobInfo;
            delete data.ssm_Keyword_FilterOn_Notepad;
            delete data.ssm_Keyword_FilterOn_Notes;
            delete data.ssm_Keyword_FilterOn_Items;
            delete data.ssm_StartingRecord;

            data.ssm_showRecords = 'Y';
            data.ssm_Keyword = inputVal;

            data.ssm_Keyword_FilterOn_Reference = $('input#checkbox_reference').is(':checked') ? 'Y' : '';
            data.ssm_Keyword_FilterOn_Customer = $('input#checkbox_customers').is(':checked') ? 'Y' : '';
            data.ssm_Keyword_FilterOn_JobInfo = $('input#checkbox_jobinfo').is(':checked') ? 'Y' : '';
            data.ssm_Keyword_FilterOn_Notepad = $('input#checkbox_notepad').is(':checked') ? 'Y' : '';
            data.ssm_Keyword_FilterOn_Notes = $('input#checkbox_notes').is(':checked') ? 'Y' : '';
            data.ssm_Keyword_FilterOn_Items = $('input#checkbox_items').is(':checked') ? 'Y' : '';

            searchResultsForm.data('payload',data);
            searchResultsForm.trigger('submit');


        },

        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        setUpFireFromResults: function (id, inputVal, data) {
        	var _this = this;
     	
            //if app fire being called by main screen then go ahead and load dummy screen so we can//
            //show records being initially loaded//

            //if div selection file references do not exist then load dummy screen//
            if ($('.ssm_selectionFile_references').length == 0) {
                data.ssm_selectionPage = 'N';
            } else {
                data.ssm_selectionPage = 'Y';
            }

            //set up data for query//
            delete data.ssm_Keyword_FilterOn_Reference;
            delete data.ssm_Keyword_FilterOn_Customer;
            delete data.ssm_Keyword_FilterOn_JobInfo;
            delete data.ssm_Keyword_FilterOn_Notepad;
            delete data.ssm_Keyword_FilterOn_Notes;
            delete data.ssm_Keyword_FilterOn_Items;
            delete data.ssm_StartingRecord;

            data.ssm_showRecords = 'Y';
            data.ssm_Keyword = inputVal;

            switch (id) {
                case 'selection_all_count':
                {
                    data.ssm_Keyword_FilterOn_Reference = 'Y';
                    data.ssm_Keyword_FilterOn_Customer = 'Y';
                    data.ssm_Keyword_FilterOn_JobInfo = 'Y';
                    data.ssm_Keyword_FilterOn_Notepad = 'Y';
                    data.ssm_Keyword_FilterOn_Notes = 'Y';
                    data.ssm_Keyword_FilterOn_Items = 'Y';
                    break;
                }
                case 'selection_reference_count':
                {
                    data.ssm_Keyword_FilterOn_Reference = 'Y';
                    break;
                }

                case 'selection_customer_count':
                {
                    data.ssm_Keyword_FilterOn_Customer = 'Y';
                    break;
                }

                case 'selection_jobinfo_count':
                {
                    data.ssm_Keyword_FilterOn_JobInfo = 'Y';
                    break;
                }

                case 'selection_notepad_count':
                {
                    data.ssm_Keyword_FilterOn_Notepad = 'Y';
                    break;
                }

                case 'selection_notes_count':
                {
                    data.ssm_Keyword_FilterOn_Notes = 'Y';
                    break;
                }

                case 'selection_items_count':
                {
                    data.ssm_Keyword_FilterOn_Items = 'Y';
                    break;
                }

                case 'ssm_selection_result':
                {
                    data.ssm_id = $('#ssm_Search_SelectionId').val();
//                    data.ssm_id = $App.Model('Selection').currentSelectionId;	
                    $App.Fire('openSelection', data);
                    return;
                }

                case 'customer_reference_count':
                {
                    alert('customer_reference_count not yet implemented');
                    return;
                }
            }
            
            $App.Fire('openSelectionFileResultsDetails', data);

        },

        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        buildSearchResults: function (div, text, value, index, keyWord, pluralSelections, pluralResults, id) {
            var json = {
                text: text,
                value: value,
                index: index,
                keyWord: keyWord,
                pluralSelections: pluralSelections,
                pluralResults: pluralResults
            };

            switch (id) {
                case 'all_count':
                {
                    getejs = $App.Template("selectionSearch/searchSelectionTotals.ejs").render(json);
                    $(div).append(getejs);
                    break;
                }

                default:
                {
                    getejs = $App.Template("selectionSearch/searchResultTotals.ejs").render(json);
                    $(div).append(getejs);
                }

            }
        },

        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------

        openQuickSearchShortcutsInitLoading: function(target){
            var _this = this;

            // -- Sets the "Selections" tab as selected...
            $App.Fire('setActiveTab', $('#tab_selections'));
            
            
            $('#ssm_NavigationBar_Title').html('Search Results');
            $('#ssm_Search_SelectionId').css('border','');
            target.html($App.Template("selectionSearch/searchResultsInitLoading.ejs").render());
        },
        
        openQuickSearchShortcutsEmpty: function(target){
            $('#ssm_Search_SelectionId').css('border','3px solid red');
        },

        openQuickSearchShortcuts: function (target, results, data) {
            var _this = this, ua, event;

            var div, htmlresults, displayText, getejs, json, pluralSelections, pluralResults;
            _this.results = results;
            _this.data = data;

            $.extend(results, {
                data: data
            });
            
            $(".ssm_search_info").addClass("hide");
            //$("#ssm_Search_SelectionId").val("");
            
            $('#ssm_NavigationBar_Title').html('Search Results');
            target.html($App.Template("selectionSearch/searchResults.ejs").render(results));


            $('div#ssm_selection_result').css('cursor', 'pointer');

            $('.ssm_search_separator').hide();
            $('.ssm_title_results').hide();

            if (results.selection.found == "Y") {
                $('.ssm-go-show').show();
                $('.ssm_search_separator').show();
                $('.ssm_title_results').show();
                json = {
                    keyWord: data.ssm_Search_SelectionId
                };
                getejs = $App.Template("selectionSearch/searchSelectionGo.ejs").render(json);
                $('div#ssm_selection_result').append(getejs);
            }


            // Selection Data//
            if (typeof results.selection_search_results !== 'undefined') {
                $.each(results.selection_search_results, function (value, index) {

                    pluralSelections = (index == 0 || index > 1) ? 'selections' : 'selection';
                    pluralResults = (index == 0 || index > 1) ? 'RESULTS' : 'RESULT';

                    switch (value) {
                        case 'all_count':
                        {
                            pluralSelections = (index == 0 || index > 1) ? 'Selections' : 'Selection';
                            displayText = 'Selections';
                            div = 'div#selection_' + value;
                            _this.buildSearchResults(div, displayText, value, index, data.ssm_Search_SelectionId, pluralSelections, pluralResults, value);
                            break;
                        }
                        case 'reference_count':
                        {
                            displayText = 'References';
                            div = 'div#selection_' + value;
                            _this.buildSearchResults(div, displayText, value, index, data.ssm_Search_SelectionId, pluralSelections, pluralResults, value);
                            break;
                        }
                        case 'jobinfo_count':
                        {
                            displayText = 'Job Information';
                            div = 'div#selection_' + value;
                            _this.buildSearchResults(div, displayText, value, index, data.ssm_Search_SelectionId, pluralSelections, pluralResults, value);
                            break;
                        }
                        case 'customer_count':
                        {
                            displayText = 'Customers';
                            div = 'div#selection_' + value;
                            _this.buildSearchResults(div, displayText, value, index, data.ssm_Search_SelectionId, pluralSelections, pluralResults, value);
                            break;
                        }
                        case 'notepad_count':
                        {
                            displayText = 'Notepad';
                            div = 'div#selection_' + value;
                            _this.buildSearchResults(div, displayText, value, index, data.ssm_Search_SelectionId, pluralSelections, pluralResults, value);
                            break;
                        }
                        case 'notes_count':
                        {
                            displayText = 'Notes';
                            div = 'div#selection_' + value;
                            _this.buildSearchResults(div, displayText, value, index, data.ssm_Search_SelectionId, pluralSelections, pluralResults, value);
                            break;
                        }
                        case 'items_count':
                        {
                            displayText = 'Items';
                            div = 'div#selection_' + value;
                            _this.buildSearchResults(div, displayText, value, index, data.ssm_Search_SelectionId, pluralSelections, pluralResults, value);
                            break;
                        }
                    }

                });
            }

            //Hide Customer data if nothing returned//
            $('.ssm-customer-show').hide();
            if (typeof results.customer_search_results !== 'undefined') {
                $('.ssm-customer-show').show();
                $.each(results.customer_search_results, function (value, index) {
                {
                    switch (value) {
                        case 'reference_count':
                        {
                            displayText = 'Customer file contains ';
                            div = 'div#customer_' + value;
                            _this.buildSearchResults(div, displayText, value, index, data.ssm_Search_SelectionId);
                            break;
                        }
                    }
                }

                });
            }

            // Hide all go buttons except the go to selection button //
            $('.ssm_search_button_go').not('span#button_result_g1').hide();


            $('.ssm_search_results_go').on('click', function () {
                // Process Clicks //
                _this.setUpFireFromResults($(this).attr('id'), $('input#ssm_Search_SelectionId').val(), data);
            });

            // - Add hover to customer/selection results//
            $('.ssm_search_results_go').not('div#ssm_selection_result').hover(function () {
            {
                //ipad does not handle hover//
                //code simulates a click//
                ua = navigator.userAgent;
                event = (ua.match(/iPad/i));
                if (event != null)
                {
                    _this.setUpFireFromResults($(this).attr('id'), $('input#ssm_Search_SelectionId').val(), data);
                }
               
                // if there are results to be clicked on //
                htmlresults = ($(this).find('.ssm_search_result1').html());

                if (htmlresults > 0) {
                    $(this).css('cursor', 'pointer');
                    $(this).addClass('ssm_search_button2');
                    $(this).removeClass('ssm_search_button1');
                    $(this).find('.ssm_search_button_go').show();
                    $(this).find('.ssm_search_button_result').hide();
                    $(this).find('.ssm_search_result1').hide();
                    $(this).find('.ssm_search_result2').hide();
                }
            }
            },
            function () {
                $(this).removeClass('ssm_search_button2');
                $(this).addClass('ssm_search_button1');
                $(this).find('.ssm_search_button_go').hide();
                $(this).find('.ssm_search_button_result').show();
                $(this).find('.ssm_search_result1').show();
                $(this).find('.ssm_search_result2').show();

            });
           
        }
    });
})(jQuery);