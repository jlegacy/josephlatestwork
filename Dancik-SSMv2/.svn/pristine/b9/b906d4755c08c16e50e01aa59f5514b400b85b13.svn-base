/*globals $App */
(function ($) {
	$App.Controller('Reports', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('Reports');
			this.model = $App.Model('Reports');
		},
		// ------------------------------------------------------------
		// -- Initialize and render the initial application skeleton
		// ------------------------------------------------------------
		init: function () {
			var _this = this,
			target = $App.View('Application').get_app_container(),
			needed_config = [
                 "text_RetrievingRecords"
             ];
	
			$App.Model("Config").getConfig(needed_config,
				function (configResults) {
					// -- Set Selections as the active tab.
					$App.Fire('setActiveTab', $('#tab_reports'));			 
				
					_this.view.init(target, configResults);
				}
			);			
		},
		// ------------------------------------------------------------
		// -- Retrieve data for optional filters
		// ------------------------------------------------------------
		getLookupListing : function(data){
			_this = this;
			//data = "";
			//ssm_id = $App.Model('Selection').currentSelectionId;
			$App.Utils.saveInProcess({showBlanket : true});
			//var results = _this.model.getReportFilterItems();
			//$App.Utils.saveComplete();
			//_this.view.display_optional_filter(results);
			_this.model.getReportFilterItems(data,
					// Callback
					function (results) {
						$.extend(results, data);					
						_this.view.display_optional_filter(results);
						$App.Utils.saveComplete();
					},
					// ErrorCallback
					function (errorData){
						$App.Fire("ajax_errors", errorData);
						$App.Utils.saveComplete();
					}
			);			
			
		},
		// ------------------------------------------------------------
		// -- Add selected filter to respective optional filter section
		// ------------------------------------------------------------
		addFilter: function(data){
			var _this = this;
			
			_this.view.add_optional_filter(data);
		},
		// ------------------------------------------------------------
		// -- Remove selected filter from respective optional filter section
		// ------------------------------------------------------------
		removeFilter: function(data){
			var _this = this;
			
			_this.view.remove_optional_filter(data);
			
		},
		// ------------------------------------------------------------
		// -- Filter the filters with supplied ID and/or Description
		// ------------------------------------------------------------
		filterLookupListing: function(data){
			var _this = this;
			
			$App.Utils.saveInProcess({showBlanket : true});
			
			_this.model.getReportFilterItems(data,
					// Callback
					function (results) {
						$.extend(results, data);
						// clear out the existing results if the click didn't originate from the 'More' button
						if(!data.moreResultsFlag){
							_this.view.clear_dialog_results();
						};
						_this.view.load_filter_rows(results);
						$App.Utils.adjust_overlay();
//						_this.view.adjust_overlay();
						$App.Utils.saveComplete();
					},
					// ErrorCallback
					function (errorData){
						$App.Fire("ajax_errors", errorData);
						$App.Utils.saveComplete();
					}
			);		
			
		},
		
		submitCommisionReport: function(params){
			var _this = this;
			
			$App.Utils.saveInProcess({showBlanket : true});
			
			_this.model.submitCommisionReport(params,
					// Callback
					function (results) {
						$App.Fire('confirm_message',{
							message: "Your report has been submitted. <br/> Would you like to run a similar report?",
							title: "Report Submitted",
							callback: function(confirmResponse){
								if(!confirmResponse){
									_this.view.reset_to_defaults();
								}
							}
							
						});

						$App.Utils.saveComplete();
					},
					// ErrorCallback
					function (errorData){
						$App.Fire("ajax_errors", errorData);
						$App.Utils.saveComplete();
					}
			);		
			
		}
		
		
	});
})(jQuery);