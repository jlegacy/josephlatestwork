(function ($)   {
    $App.View('Application', {
        config: {},

        initialize: function () {
        },

        // ------------------------------------------------------------
        // -- Renders the initial application layouts
        // ------------------------------------------------------------
        renderApp: function (data) {

            var _this = this;

            // -- To speed up initial base, ejs is loaded into <script id='addBase'>
            $('#app').html($App.TemplateFromId('appBase').render(data));

            // -- Load watermark into Product Search input...
            $('#ssm_Search_SelectionId').watermark("Enter Selection#, name, info,...");

//             don't italicize input values for search box 
            $('body').on('click', '#ssm_Search_SelectionId', function(){
            	$(this).css('font-style','normal');
            });

            $App.Fire('openDashboard');

            $('input#ssm_Search_SelectionId').on('keyup', function () {
                _this.buildSearchDropDown($(this), data);
                if ($(this).val().replace(/^\s+|\s+$/g,'').length == 0) {
                    $('#search_box').addClass('hide');
                }
            });

            $('input#ssm_Search_SelectionId').blur(function () {
                $('#search_box').addClass('hide');
            });
            

            // -- Determine user setting, if they are allowed to access ODS and Reports...	
            if ($App.Controller('Config').getConfig().config.allow_ods_and_reports) {
            	$(".ods_reports").show();
            }
            
        },

        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        buildSearchDropDown: function (input, data) {
            var id, json, getejs, divId, v,
            	_this = this;
                
            $('#ssm_Search_SelectionId').css('border','');
            
            v = $(input).val();
            
            // -- Remove search box
            $('#ssm_SelectionLookup_Box #search_box')
            	.removeClass('hide')
            	.empty();

            // -- If the value loaded is a valid number, then presume that it is a Selection # and ask to 'goto it'.
            if (!isNaN(v)) {
                if ((v > 0) && (v < 999999999)) {
                    id = '<div id=' + 'gotoSelection-' + 1 + ' class="ssm_search ssm_search_selection"></div>';
                    $('#search_box').append($(id).html('Go to selection#: ' + '<b>' + v + '</b>'));
                    id = '<div class="ssm_search_separator"></div>';
                    $('#search_box').append($(id));
                }
            }
            
            //create entries to look for in the multi drop down box//
            json = {
                keyWord: v,
                selection: [{
                    name: "selection_customer_drop",
                    value: " ... Customers"
                }, {
                    name: "selection_reference_drop",
                    value: " ... References"
                }, {
                    name: "selection_jobinfo_drop",
                    value: " ... Job Information"
                }, {
                    name: "selection_notes_drop",
                    value: " ... Notes"
                }, {
                    name: "selection_notepad_drop",
                    value: " ... Notepad"
                }, {
                    name: "selection_items_drop",
                    value: " ... Items"
                }]
            };

            getejs = $App.Template("selectionSearch/searchMultiDropDown.ejs").render(json);
            $('#search_box').append(getejs);

            // Setup Clicks
            $('#search_box').unbind('click').unbind('blur');
            
            $('#search_box').find('.ssm_search').mousedown(function (event) {
                var search_box_id = ($(this).attr('id'));
                
                if (search_box_id === "gotoSelection-1") {
                    data.ssm_id =  v;
                    $App.Fire('openSelection', data);
                    $('#search_box').empty();
                    $('#search_box').addClass("hide");
                    event.preventDefault();
                    $("#ssm_Search_SelectionId").val("");
                    
                    return;
                }

                // -- Since this is a multi functional drop box call function that will handle app fire depending on selection
                _this.setUpAppFire(search_box_id, v, data);	
            });
            
        },

        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        setUpAppFire: function (title, inputVal, data) {
        	var fireType;
		
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

            switch (title) {
                case 'selection-title': {
                    data.ssm_Keyword_FilterOn_Reference = 'Y';
                    data.ssm_Keyword_FilterOn_Customer = 'Y';
                    data.ssm_Keyword_FilterOn_JobInfo = 'Y';
                    data.ssm_Keyword_FilterOn_Notepad = 'Y';
                    data.ssm_Keyword_FilterOn_Notes = 'Y';
                    data.ssm_Keyword_FilterOn_Items = 'Y';
                    data.ssm_Keyword_FilterOn_All = 'Y';
                    break;
                }
                case 'selection_all_drop': {
                    data.ssm_Keyword_FilterOn_Reference = 'Y';
                    data.ssm_Keyword_FilterOn_Customer = 'Y';
                    data.ssm_Keyword_FilterOn_JobInfo = 'Y';
                    data.ssm_Keyword_FilterOn_Notepad = 'Y';
                    data.ssm_Keyword_FilterOn_Notes = 'Y';
                    data.ssm_Keyword_FilterOn_Items = 'Y';
                    data.ssm_Keyword_FilterOn_All = 'Y';
                    break;
                }
                case 'selection_reference_drop': {
                    data.ssm_Keyword_FilterOn_Reference = 'Y';
                    break;
                }
                case 'selection_jobinfo_drop': {
                    data.ssm_Keyword_FilterOn_JobInfo = 'Y';
                    break;
                }
                case 'selection_customer_drop': {
                    data.ssm_Keyword_FilterOn_Customer = 'Y';
                    break;
                }
                case 'selection_notepad_drop': {
                    data.ssm_Keyword_FilterOn_Notepad = 'Y';
                    break;
                }
                case 'selection_notes_drop': {
                    data.ssm_Keyword_FilterOn_Notes = 'Y';
                    break;
                }
                case 'selection_items_drop': {
                    data.ssm_Keyword_FilterOn_Items = 'Y';
                    break;
                }
                case 'ssm_selection_result': {
                    alert('Not yet implemented');
                    break;
                }
            }
            //payload all data variables to more_form //
            fireType = title.substr(0, 3);
            if (fireType == 'sel') {
			 //$App.View('selectionSearch').renderSearchForm(data);
                $App.Fire('openSelectionFileResultsDetails', data);
            }
        },

        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        openHelp: function () {
            alert('Application.openHelp() not yet implemented');
        // Dancik.Help.open('');
        },
        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        openQuickSearchShortcuts: function () {

            alert('Go to open Quick Search Shortcuts');
        },
        // ------------------------------------------------------------
        //
        // ------------------------------------------------------------
        setActiveTab: function (element) {
            $("#ssm_MainTabs li a").removeClass('active').addClass('not-active');
            $(element).removeClass('not-active').addClass('active');
        },
        
		// ------------------------------------------------------------
		// -- 
		// ------------------------------------------------------------
		showNotificationDialog: function (data) {
			var _this = this,
				noteMsg = $App.Template('application/notification.ejs'),
				noteTitle = $App.Template('application/alert-title.ejs');
			
			// -- data = { header: "xxx", detail : "xxx" }
            var $dialog = $('<div class="ssm-NotificationDialog"></div>')
            .html(noteMsg.render(data))
            .dialog({
                autoOpen: false,
                title: noteTitle.render({ "msg" : "Notification" }),
                modal:true,
                width : '550px',
                open: function(event, ui) {
                    $('.ui-dialog-titlebar-close').hide();
                },
                buttons: {
                    "Continue": {
                        text: "Continue",
                        click: function() { 
                            $(this).dialog("close");
                        }
                    }
                }
            });
            $dialog.dialog('open');
        },
        
        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        showVersion: function (app) {
            if (app.errmsg) {
                $(app.app + "-revision").update("N/A");
            } else {
                $(app.app + "-revision").update(app.revision);
            }
        },
        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
        get_app_container: function () {
            return $('#appMainBody');
        },
        showHelp: function () {
        	$App.Utils.help('4GG375EG87THR74FG4532310210MSS');
        }
    });
})(jQuery);