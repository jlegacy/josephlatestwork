/*globals $App */
(function ($) {
	$App.Controller('ReportsDrilldown', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('ReportsDrilldown');
			this.model = $App.Model('ReportsDrilldown');
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
		// -
		// ------------------------------------------------------------
		drilldownFunctionality: function(container){
			var _this = this;
			
			_this.view.drilldownFunctionality(container);
		},
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		getDrillDown_Summary: function(data){
			var _this = this;
			
			$App.Utils.saveInProcess({showBlanket : true});
			_this.model.getDrillDown_Summary(data,
					// Callback
					function (results) {
						$.extend(data, results);
						_this.view.init(data);
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
		// -
		// ------------------------------------------------------------
		getDrillDown_Level2: function(data){
			var _this = this,
			params = {
					level1_Key1: data.level1_key1,
					level1_Key2: data.level1_key2
			};
			$.extend(params, _this.view.collectFormValues());

//			$App.Utils.saveInProcess({showBlanket : true});
			_this.model.getDrillDown_Summary(params,
					// Callback
					function (results) {
						$.extend(results, params);
						_this.view.expandViewBy(results);
//						$App.Utils.saveComplete();
					},
					// ErrorCallback
					function (errorData){
						$App.Fire("ajax_errors", errorData);
//						$App.Utils.saveComplete();
					}
			);
		},
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		getDrillDown_Detail: function(data){
			var _this = this;
			
			$App.Utils.saveInProcess({showBlanket : true});
			// get the data and display the details
			_this.model.getDrillDown_Detail(data,
					// Callback
					function (results) {
						$.extend(results, data);
						_this.view.openDrilldownDetail(results);					
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
		// - Confirm before opening a selection from the report
		// ------------------------------------------------------------
		openSelectionFromDrilldown: function(data){
			var _this = this;
			
			$App.Fire('confirm_message',{
				message: "You are about to leave this report. <br/> Do you want to continue?",
				title: "Confirm",
				callback: function(confirmResponse){
					if(confirmResponse){
						$App.Fire('openSelection', data);
					}
				}
			});
		}

	
		
		
	});
})(jQuery);