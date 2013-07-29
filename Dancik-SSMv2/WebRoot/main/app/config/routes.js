//Ties user triggered events to controller methods
$App.Routes({
	// -- Javascript events. Triggered with $App.Fire('event_name', data)
    events: [    
        // - Related Items
        {event : 'loadRelatedItems', controller : 'RelatedItems', method : 'init' },
        {event : 'loadItemDetails', controller : 'ItemDetails', method : 'init' },
             
        // - Job Information      
        {event: 'loadJobInfoDetails', controller: 'Jobs', method: 'loadJobDetails'}, 
        {event: 'setJobInfo', controller: 'Jobs', method: 'setJobInfo'},
        {event: 'getJobInfoDetail', controller: 'Jobs', method: 'getJobInfoDetail'},
        
        // - References
        {event: 'loadReferenceDetails', controller: 'References', method: 'loadReferenceDetails'},
        {event: 'setReference', controller: 'References', method: 'setReference'},
        {event: 'updateReferenceDetails', controller: 'References', method: 'updateReferenceDetails'},
        
        // - Messaging events
        {event: 'info_message', controller: 'DWS.Growler', method: 'info' },
        {event: 'errors', controller: 'DWS.Growler', method: 'error' },
        {event: 'ajax_errors', controller: 'DWS.Growler', method: 'backendErrors' },
        {event: 'confirm_message', controller : 'Messages', method : 'confirm_message'},
        {event: 'warn_message', controller : 'Messages', method : 'warn_message'},
        {event: 'showNotification', controller: 'Application', method: 'showNotificationDialog' },
        
		// - Application
        {event: 'openQuickSearchShortcuts', controller: 'Application', method: 'openQuickSearchShortcuts'},
        {event: 'setActiveTab', controller: 'Application', method: 'setActiveTab' },
        

		// - Dashboard
        {event: 'openDashboard', controller: 'Dashboard', method: 'init' },
        {event: 'getReminderDayListing_Dashboard', controller: 'Dashboard', method: 'getReminderDayListing' },
        {event: 'getLastSelections_Dashboard', controller: 'Dashboard', method: 'getLastSelections'},
        {event: 'setLastSelectionID', controller: 'Dashboard', method: 'setLastSelectionID' },

        // - Reminders
        {event: 'getReminderDayListing_DayView', controller: 'Reminders', method: 'day' },
        {event: 'openReminderDetailUpd', controller: 'Reminders', method: 'update' },

        // - Customer Search
        {event: 'openCustomerSearch', controller: 'CustomerSearch', method: 'init'},
        {event: 'reloadCustomerCell', controller: 'CustomerSearch', method: 'reloadCustomerCell' },
        {event: 'getCustomers', controller: 'CustomerSearch', method: 'getCustomers'},
        {event: 'cancelCustomerCreate', controller: 'CustomerSearch', method: 'cancelCustomerCreate'},
        {event: 'gotoCustomerSearchForSelection', controller: 'CustomerSearch', method: 'init'},

        // - Selections
    	{event: 'createSelection', controller: 'Selection', method: 'createSelection'},
        {event: 'openSelection', controller: 'Selection', method: 'openSelection' },
        {event: 'setActiveSelectionTab', controller: 'Selection', method: 'setActiveSelectionTab' },
        {event: 'selectionPlaceOrder', controller: 'Selection', method: 'selectionPlaceOrder' },

        {event: 'loadSelectionDates', controller: 'Selection', method: 'loadDates' },
        {event: 'loadSelectionJobInfo', controller: 'Selection', method: 'loadJobInfo' },
        {event: 'loadSelectionReferences', controller: 'Selection', method: 'loadReferences' },
        {event: 'loadSelectionNotes', controller: 'Selection', method: 'loadNotes' },
        {event: 'loadSelectionLogs', controller: 'Selection', method: 'loadLogs' },
        {event: 'loadSelectionNotepad', controller: 'Selection', method: 'loadNotepad' },

        {event: 'selectionSearchBuyerAccount', controller: 'Selection', method: 'selectionSearchBuyerAccount' },

        {event: 'setSelectionCustomer_ReopenSelection', controller: 'Selection', method: 'setSelectionCustomer_ReopenSelection' },
        {event: 'setSelectionCustomerField', controller: 'Selection', method: 'setSelectionCustomerField' },
        {event: 'setSelectionNotes', controller: 'Selection', method: 'setSelectionNotes' },
        {event: 'setSelectionAltAddr', controller: 'Selection', method: 'setSelectionAltAddr' },
        {event: 'setSelectionJobInfo', controller: 'Selection', method: 'setSelectionJobInfo' },
        {event: 'setSelectionReference', controller: 'Selection', method: 'setSelectionReference' },
        {event: 'setSelectionDate', controller: 'Selection', method: 'setSelectionDate' },
        {event: 'setSelectionStatus', controller: 'Selection', method: 'setSelectionStatus' },
        
        {event: 'showSelectionPrintOptions', controller: 'Selection', method: 'selectionPrint' },

        // - Selection Items
        {event: 'loadSelectionItems', controller: 'SelectionItems', method: 'loadItems'},
        {event: 'removeSelectionItems', controller: 'SelectionItems', method: 'removeSelectionItems'},
        {event: 'setSelectionItemField', controller: 'EditLine', method: 'setSelectionItemField'},

        // - Selection Search
        {event: 'openSelectionFileResultsDetails', controller: 'SelectionSearch', method: 'openSelectionFileResultsDetails' },

        // - Reminders
        {event: 'openReminders', controller: 'Reminders', method: 'day' },
		{event: 'openRemindersWeek', controller: 'Reminders', method: 'week' },
		{event: 'openRemindersMonth', controller: 'Reminders', method: 'month' },
        {event: 'processReminder', controller: 'Reminders', method: 'processReminder' },
        
        // - Reports
        {event: 'drilldownFunctionality', controller: 'ReportsDrilldown', method: 'drilldownFunctionality'},
        {event: 'submitCommisionReport', controller: 'Reports', method: 'submitCommisionReport'},
        {event: 'rpt_dd_getLevel2', controller: 'ReportsDrilldown', method: 'getDrillDown_Level2'},
        {event: 'rpt_dd_getDetail', controller: 'ReportsDrilldown', method: 'getDrillDown_Detail'},
        
		// - ODS
		{event: 'get_user_ifs_files', controller: 'ODS', method: 'get_user_ifs_files'},
        {event: 'get_user_spool_files', controller: 'ODS', method: 'get_user_spool_files'},
        {event: 'delete_ifs_file', controller : 'ODS', method : 'delete_ifs_file'},
        {event: 'delete_spoolfile', controller : 'ODS', method : 'delete_spoolfile'},
        {event: 'release_spoolfile', controller : 'ODS', method : 'release_spoolfile'},
        {event: 'hold_spoolfile', controller : 'ODS', method : 'hold_spoolfile'},
        {event: 'update_spoolfile_outq', controller : 'ODS', method : 'update_spoolfile_outq'},
        {event: 'open_spoolfile', controller : 'ODS', method : 'ping_spoolfile'},
        {event: 'open_ifs_file', controller : 'ODS', method : 'ping_ifs_file'},
        
        // - Ordering
        {event : 'order_step_1', controller : 'Ordering', method : 'order_step_1'},
        {event : 'order_step_2', controller : 'Ordering', method : 'order_step_2'},
        {event : 'order_step_3', controller : 'Ordering', method : 'order_step_3'},
        {event : 'order_step_4', controller : 'Ordering', method : 'order_step_4'},
        {event : 'order_step_5', controller : 'Ordering', method : 'order_step_5'},
        {event : 'submit_order_step_2', controller : 'Ordering', method : 'submit_order_step_2'},
        {event : 'submit_order_step_3', controller : 'Ordering', method : 'submit_order_step_3'},
        {event : 'submit_order_step_5', controller : 'Ordering', method : 'submit_order_step_5'},
        {event : 'cancel_order', controller : 'Ordering', method : 'cancel_order'},
        {event : 'return_to_selections', controller: 'SelectionItems', method: 'loadItems'},
        
        // - Related Items
        {event : 'submit_related_items', controller : 'RelatedItems', method : 'submit_related_items'}
	],

	//Form submissions. The controller method will be passed a serialized version of the form's inputs.
	//It is also possible to store additional data on the form with $(form).store('payload', data).
	//The additional data will be extended/overwritten with the form contents.
    forms: [
         // - Application
        {action: '#selectionLookup', controller: 'Application', method: 'selectionLookup'},

        // - Reminders
        {action: '#updateReminder', controller: 'Reminders', method: 'updateReminder'},
        {action: '#openNewReminder', controller: 'Reminders', method: 'update' },
        
        // - Reports
        {action: '#rpt_cr_AddFilter', controller: 'Reports', method: 'addFilter'},
        {action: '#rpt_cr_RmvFilterOption', controller: 'Reports', method: 'removeFilter'},
        {action: '#rpt_cr_GetLookupListing', controller: 'Reports', method: 'filterLookupListing'},
        {action: '#rpt_dd_getSummary', controller: 'ReportsDrilldown', method: 'getDrillDown_Summary'},
                
        // - Customer Search
        {action: '#openCustomerSearch', controller: 'CustomerSearch', method: 'init'},
        {action: '#getCustomers', controller: 'CustomerSearch', method: 'getCustomers'},
        {action: '#getCustomersMore', controller: 'CustomerSearch', method: 'getCustomersMore'},
        {action: '#openNewCustomer', controller: 'CustomerSearch', method: 'openNewCustomer'},
        {action: '#addCustomer', controller: 'CustomerSearch', method: 'addCustomer'},
        {action: '#updateCustomer', controller: 'CustomerSearch', method: 'updateCustomer'},
        {action: '#addCustomerAndCreateSelection', controller: 'CustomerSearch', method: 'addCustomerAndCreateSelection'},
        {action: '#addCustomerAndUpdateSelection', controller: 'CustomerSearch', method: 'addCustomerAndUpdateSelection'},

        // - Selection
        {action: '#createSelection', controller: 'Selection', method: 'createSelection'},
        {action: '#addNotePad', controller: 'Selection', method: 'addNotePad'},
        {action: '#selectionSearchBuyerAccount', controller: 'Selection', method: 'selectionSearchBuyerAccount' },
        {action: '#selectionSearchBuyerAccountMore', controller: 'Selection', method: 'selectionSearchBuyerAccountMore' },
        {action: '#selectionSearchBuyerAccountSort', controller: 'Selection', method: 'selectionSearchBuyerAccountSort' },
        {action: '#submitPrint', controller: 'Selection', method: 'printSelectionSubmit' },
        

        // - Selection Search
        {action: '#openSelectionSearch', controller: 'SelectionSearch', method: 'init'},
		{action: '#quickSelectionLookup', controller: 'SelectionSearch', method: 'quickSelectionLookup'},
		{action: '#search_results_more', controller: 'SelectionSearch', method: 'more' },
        {action: '#search_results_submit', controller: 'SelectionSearch', method: 'openSelectionFileResultsDetails' },
		
		// - References
        {action: '#addReferenceRecord', controller: 'References', method: 'addReferenceRecord'},
        
        // - Jobs
        {action: '#addJobInfoRecord', controller: 'Jobs', method: 'addJobInfoRecord'},
         
        // - Selection Items
        {action: '#getItems', controller: 'ItemSearch', method: 'getItems'},
        {action: '#removeSelectionItems', controller: 'SelectionItems', method: 'removeSelectionItems'},
        {action: '#addSelectionItemRecord', controller: 'SelectionItems', method: 'addSelectionItem'},
        {action: '#gotoPlaceOrder', controller: 'Ordering', method: 'init'},
        {action: '#setSelectionItemRecord', controller: 'EditLine', method: 'setSelectionItemRecord'},
        
        // - BOM/KIT Items
        {action: '#addSelectionItems', controller: 'Kits', method: 'addSelectionItems'},
        
        // -  Ordering
        {action: '#complete_order_header', controller : 'Ordering', method : 'submit_order_step_3'},
        {action: '#send_message_lines', controller : 'Ordering', method : 'submit_order_step_4'}
        
	],

	//Links. The controller will match a regular expression with the link's href attribute
	//If the regex has capturing groups, they will be mapped to object keys and passed to the controller, if the parameters property is defined
	//Like forms, payload data can be bound to links.
    links: [
        // - Application
        {href: '#help', controller: 'Application', method: 'showHelp'},
		{href: '#logout', controller: 'Application', method: 'logout'},
		{href: '#selectionLookup/:ssm_select', controller: 'Application', method: 'selectionLookup'},

        // - Dashboard
		{href: '#openDashboard', controller: 'Dashboard', method: 'init' },
		{href: '#getReminderDayListing_Dashboard', controller: 'Dashboard', method: 'getReminderDayListing'},

        // - Selections
    	{href: '#createSelection/:ssm_retailid', controller: 'Selection', method: 'createSelection'},
		{href: '#openLastSelection', controller: 'Selection', method: 'openLastSelection' },
		{href: '#openSelection/:ssm_id', controller: 'Selection', method: 'openSelection'},
        {href: '#openSelectionDetail/:option', controller: 'Selection', method: 'openSelectionDetail'},
        {href: '#selectionToggleAltAddr', controller: 'Selection', method: 'selectionToggleAltAddr' },
        {href: '#setSelectionCustomer_ReopenSelection/:ssm_SelectionId/:ssm_PersonId', controller: 'Selection', method: 'setSelectionCustomer_ReopenSelection'},
        {href: '#clearSelectionReference/:ssm_ReferenceId', controller: 'Selection', method: 'clearSelectionReference' },
        {href: '#clearSelectionJobInfo/:ssm_jobInfoId', controller: 'Selection', method: 'clearSelectionJobInfo' },
        {href: '#clearSelectionDate', controller: 'Selection', method: 'clearSelectionDate' },
        {href: '#showSelectionPrintOptions/:ssm_id', controller: 'Selection', method: 'selectionPrint' },
        {href: '#promptBuyerAccountLookup/:clicked_id', controller: 'Selection', method: 'promptBuyerAccountLookup' },
        {href: '#promptBuyerAccountLookup/:clicked_id/:preSearchFilterId', controller: 'Selection', method: 'promptBuyerAccountLookup' },
        {href: '#refreshSelectionLogs/:ssm_id', controller: 'Selection', method: 'refreshLogs' },
        {href: '#statusOptions', controller: 'Selection', method: 'statusOptions' },
        {href: '#confirmSelectionCustomerSwap/:ssm_id', controller: 'Selection', method: 'confirmSelectionCustomerSwap'},

        // - Selection Search
        {href: '#openSelectionSearch', controller: 'SelectionSearch', method: 'init'},
        {href: '#copySelection/:ssm_id', controller: 'SelectionSearch', method: 'copySelection' },
        {href: '#rmvSelection/:ssm_id', controller: 'SelectionSearch', method: 'removeSelection' },
        
        // - Customer Search
        {href: '#openEditCustomer/:ssm_retailid', controller: 'CustomerSearch', method: 'openEditCustomer'},
        {href: '#closeEditCustomer/:ssm_retailid', controller: 'CustomerSearch', method: 'closeEditCustomer'},
        {href: '#openNewCustomer', controller: 'CustomerSearch', method: 'openNewCustomer'},

        // - Reminders
        {href: '#openReminder/:ssm_ForId', controller: 'Reminders', method: 'openReminder'},
        {href: '#openReminders', controller: 'Reminders', method: 'init' },
        {href: '#openRemindersDay/:mode', controller: 'Reminders', method: 'day'},
        {href: '#openRemindersWeek/:mode', controller: 'Reminders', method: 'week'},
        {href: '#openRemindersMonth/:mode', controller: 'Reminders', method: 'month' },
        {href: '#openReminderDetailUpd/', controller: 'Reminders', method: 'update' },

		// - Reports
		{href: '#openReports', controller: 'Reports', method: 'init'},
		{href: '#rpt_cr_GetLookupListing', controller: 'Reports', method: 'getLookupListing'},
		{href: '#rpt_dd_getLevel2/:level1_key1/:level1_key2', controller: 'ReportsDrilldown', method: 'getDrillDown_Level2'},
		{href: '#rpt_dd_openSelection/:ssm_id', controller: 'ReportsDrilldown', method: 'openSelectionFromDrilldown'},
	
		// - ODS
		{href: '#openODS', controller: 'ODS', method: 'init'},		
		
		// Selection Items
		{href: '#ssm_SelectionItems', controller: 'SelectionItems', method: 'loadItems'},
		{href: '#putSelectionItemsIntoAddMode', controller: 'SelectionItems', method: 'initiateAddMode'},
		{href: '#openItemDetails', controller: 'ItemDetails', method: 'init'},
		{href: '#showItemOptions', controller: 'SelectionItems', method: 'showItemOptions'},
		{href: '#clearSelectionItem_MessageLine/:ssm_Selectionid/:ssm_Line/:ssm_Name', controller: 'EditLine', method: 'clearMessageLine'},
		
		// - Reference List Editor
		{href: '#editReferenceList/:referenceId/:index', controller: 'References', method: 'init'},
		
		// - Job List Editor
		{href: '#editJobsList/:jobId/:index', controller: 'Jobs', method: 'init'},
		
		// - Item Search
		{href : '#openItemSearch', controller: 'ItemSearch', method: 'init'},
		
		// - Open Macro Messages
		{href : '#openMacroMessages', controller : 'EditLine', method : 'openMacroMessages'},
		
		// - Open Edit Line
		{href : '#openEditLine/:ssm_line/:ssm_id', controller : 'EditLine', method : 'init'},
		
		// -- Ordering
		{href : '#printOrderQuote/:ssm_ReferenceId', controller : 'Ordering', method : 'printOrderQuote'}
		

    ]
});
