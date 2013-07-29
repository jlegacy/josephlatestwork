/*globals $App */
(function ($) {
	$App.Controller('Jobs', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('Jobs');
			this.model = $App.Model('Jobs');
		},
		
		init : function (options) {
			//
			var _this = this, needs_list = ['jobinfo_hdrs'];			
//			Pass Job Types Object to the view
			var callback = function(data) {
				_this.view.initialize_view(data, options);
			}			
			$App.Model("Cache").getCacheData(needs_list, callback);							
		},
		
//		Add a new Job Description
		addJobInfoRecord : function(data) {
			var _this = this;
			$.extend(data, {ssm_headerid : $("#ssm_job_type_select").val() });
			
			// Callback Function 
			var callback = function(obj) {
				$("#ssm_job_add_mode").hide();				
				_this.loadJobDetails({
					ssm_headerid : data.ssm_headerid
				});
				$App.Utils.saveComplete();
				$App.Fire("info_message", {message : "Job Information successfully added."});
			}
			// Error Callback function
			var errorCallback = function(obj) {
				$App.Fire("ajax_errors", errorResults);
				$App.Utils.saveComplete();
			}
			
			$App.Utils.saveInProcess({showBlanket : true});
			_this.model.addJobInfoRecord(data,callback,errorCallback);
		},
		
		loadJobDetails : function(data){
			var _this = this;
			
			// Callback Function 
			var callback = function(obj) {
				$App.Utils.saveComplete();
				_this.view.render_rows(obj);
			}
			// Error Callback function
			var errorCallback = function(errorResults) {				
				$App.Fire("ajax_errors", errorResults);
				$App.Utils.saveComplete();
			}			
			
			$App.Utils.saveInProcess({showBlanket : true});
			_this.model.loadJobDetails(data,callback,errorCallback);
		},
		
		setJobInfo : function(data) {
			var _this = this;
			
			// Callback Function 
			var callback = function(obj) {
//				Fire the call to refresh the row
				_this.getJobInfoDetail({
					ssm_id : data.ssm_id,
					ssm_headerid : data.ssm_headerid,
					existing_row : data.existing_row
				});
				$App.Fire("info_message", {message : "Job Information successfully updated."});
			}
			// Error Callback function
			var errorCallback = function(errorResults) {
				$App.Fire("ajax_errors", errorResults);
			}
			
			_this.model.setJobInfo(data, callback, errorCallback);
		},
		
		getJobInfoDetail : function(data) {
			var _this = this,
			existing_row = data.existing_row;
			
			// Callback Function 
			var callback = function(obj) {
				_this.view.update_row(obj,existing_row);
			}
			// Error Callback function
			var errorCallback = function(obj) {
			 	
			}
			_this.model.getJobInfoDetail(data,callback,errorCallback);
		}
	});
})(jQuery);