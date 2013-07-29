/*globals $App */
(function ($) {
	$App.Controller('ODS', {		
		initialize : function () {
			this.view = $App.View('ODS');
			this.model = $App.Model('ODS');						

			//$App.Controller('Config').getConfig().config.user_id = 'MBAYER';
			
			// Take the spaces out of the user_id field
			$App.Controller('Config').getConfig().config.user_id = $App.Controller('Config').getConfig().config.user_id.replace(/\s/gi,"");
		},
		
		init : function () {
			// 
			var _this = this,
				data = {},
			
				callback = function (results) {
					//
					_this.view.populate_folders(results);					
				},
				
				errorCallback = function (errorResults) {
					//
					$App.Fire('ajax_errors',errorResults);
				};											
				
			$App.Utils.saveInProcess({showBlanket:true});
			_this.view.init();
			_this.model.get_ods_folders(data, callback, errorCallback);
		},
		
		// Load IFS Files
		get_user_ifs_files : function () {
			// 
			var _this = this,
				target = $App.View('Application').get_app_container(),
				data = {
					ods_AppCode : 'ssm'
				},
				
				callback = function (results) {
					// 
					$App.Utils.saveComplete();
					$App.Fire('setActiveTab', $('#tab_ods'));
					_this.view.populate_ifs_table(results);
				},
				
				errorCallback = function (errorResutls) {
					// 
					$App.Utils.saveComplete();
					$App.Fire('setActiveTab', $('#tab_ods'));
					_this.view.populate_ifs_table(errorResutls);
				};			
			
			// Call the model
//			$App.Utils.saveInProcess({showBlanket:true});		
			_this.model.get_user_ifs_files(data, callback, errorCallback);
		},
		
		// Load Spool Files
		get_user_spool_files : function () {
			// 
			var _this = this,
				data = {
					ods_User: $App.Controller('Config').getConfig().config.user_id					
				},
				
				callback = function (results) {
					// 
					$App.Utils.saveComplete();					
					
					_this.view.display_spoolfile_table(results);					
				},
				
				errorCallback = function (errorResults) {
					// 
					$App.Utils.saveComplete();
					$App.Fire('ajax_errors',errorResults);
				};			
				
			$App.Utils.saveInProcess({showBlanket:true});	
			_this.model.get_user_spool_files(data, callback, errorCallback);
		},
		
		// Update Spoolfile outq
		update_spoolfile_outq : function (data) {
			// 
			var _this = this;
				
				callback = function (results) {
					// 
					$App.Utils.saveComplete();
					
					_this.view.post_spoolfile_action("Outq successfully updated.");
				},
				
				errorCallback = function (errorResults) {
					// 
					$App.Utils.saveComplete();					
					$App.Fire('ajax_errors',errorResults);					
				};
			
			$App.Utils.saveInProcess({showBlanket:true});	
			_this.model.update_spoolfile_outq(data, callback, errorCallback);						
		},
		
		// Delete spoolfile 
		delete_spoolfile : function (data) {
			// 
			var _this = this;
				
				callback = function (results) {
					// 
					$App.Utils.saveComplete();
					
					_this.view.post_spoolfile_action("Spoolfile successfully deleted.");
				},
				
				errorCallback = function (errorResults) {
					// 
					$App.Utils.saveComplete();					
					$App.Fire('ajax_errors',errorResults);					
				};
			
			$App.Utils.saveInProcess({showBlanket:true});	
			_this.model.delete_spoolfile(data, callback, errorCallback);						
		},		
		
		//Put Spoolfile in hold status
		hold_spoolfile : function (data) {
			// 
			var _this = this;
				
				callback = function (results) {
					// 
					$App.Utils.saveComplete();
					
					_this.view.post_spoolfile_action("Spoolfile is on hold.");
				},
				
				errorCallback = function (errorResults) {
					// 
					$App.Utils.saveComplete();					
					
					$App.Fire('ajax_errors',errorResults);					
				};
			
			$App.Utils.saveInProcess({showBlanket:true});	
			_this.model.hold_spoolfile(data, callback, errorCallback);
		},
		
		// Put Spoolfile in ready status (it will print)
		release_spoolfile : function (data) {
			// 
			var _this = this;
				
				callback = function (results) {
					// 
					$App.Utils.saveComplete();
					
					_this.view.post_spoolfile_action("Spoolfile successfully released.");
				},
				
				errorCallback = function (errorResults) {
					// 
					$App.Utils.saveComplete();
					
					$App.Fire('ajax_errors',errorResults);				
				};
			
			$App.Utils.saveInProcess({showBlanket:true});	
			_this.model.release_spoolfile(data, callback, errorCallback);
		},
		
		// Makes sure the spoolfile exists
		ping_spoolfile : function (data) {
			//
			var _this = this,
				openFileObj = {},
				baseURL = "",
				queryString,
				URL,
				
				callback = function (results) {
					//
					// If you're in this callback, then the spoolfile is there, open it
					// Because we're opening a file, we cannot do an AJAX call, so directly call the URL with the appropriate parameters
					baseURL = (data.type == "TXT") ? '../../dws/exec/Splf2Txt' : '../../dws/exec/Splf2Pdf',
					queryString = 	'?parm_Job=' + data.ods_Job +
									'&parm_User=' + $App.Controller('Config').getConfig().config.user_id +
									'&parm_JobNumber=' + data.ods_JobNumber +
									'&parm_PrinterFile=' + data.ods_PrinterFile +
									'&parm_Spoolfile=' + data.ods_SpoolFile +
									'&parm_Random=' + parseInt(Math.random() * 10000)+"",
					URL = baseURL + queryString;
					
					//
					window.location = URL;
					
					// It can take several seconds for the file to begin downloading, depending on file size.
					// Show a message to assure that the request was processed
					$App.Fire('info_message', {message : 'File download will begin momentarily.'});
				},
				
				errorCallback = function (errorResults) {
					//
					$App.Fire('ajax_errors', errorResults);					
				};
				
			_this.model.ping_spoolfile(data, callback, errorCallback);
		},
		
		ping_ifs_file : function (data) {
			//
			var _this = this,
				baseURL,
				queryString,
				URL,
			
				callback = function (results) {
					//
					// If you're in this callback, then the file is there, open it
					// Because we're opening a file, we cannot do an AJAX call, so directly call the URL with the appropriate parameters
					baseURL = "../../dws/exec/getIFS";
					queryString = 	"?parm_AppCode=" + data.ods_AppCode  +
									"&parm_FileName=" + data.ods_FileName +
									"&parm_Suffix=" + data.parm_Suffix ;
					URL = baseURL + queryString;
					
					//
					window.location = URL;
					
					// It can take several seconds for the file to begin downloading, depending on file size.
					// Show a message to assure that the request was processed
					$App.Fire('info_message', {message : 'File download will begin momentarily.'});
				},
				
				errorCallback = function (errorResults) {
					//
					$App.Fire('ajax_errors', errorResults);					
				};
			
			_this.model.ping_ifs_file(data, callback, errorCallback);				
		},
		
		// Delete and IFS File
		delete_ifs_file : function (data) {
			// 
			var _this = this;
				
				callback = function (results) {
					// 
					$App.Utils.saveComplete();					
					_this.view.post_ifs_delete(true);
				},
				
				errorCallback = function (errorResults) {
					// 
					$App.Utils.saveComplete();
					$App.Fire('ajax_errors', errorResults);
					_this.view.post_ifs_delete(false);
				};
			
			$App.Utils.saveInProcess({showBlanket:true});	
			_this.model.delete_ifs_file(data, callback, errorCallback);
		}
		
	});
})(jQuery);