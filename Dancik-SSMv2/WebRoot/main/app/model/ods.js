(function ($) {
	$App.Model.Extend('SSM.Ajax', 'ODS', {
		initialize: function () {
			this._super();
		},
		
		get_user_ifs_files : function (data, callback, errorCallback) {
			var _this = this;
			
			_this.post(data, '../../dancik-aws/ods/getUserAppListing', callback, errorCallback);
		},
		
		get_user_spool_files : function (data, callback, errorCallback) {
			var _this = this;
			
			_this.post(data, '../../dancik-aws/ods/getSpoolfileListing', callback, errorCallback);
		},
		
		delete_ifs_file : function (data, callback, errorCallback) {
			var _this = this;
			
			_this.post(data, '../../dancik-aws/ods/removeIFSFile', callback, errorCallback);
		},
		
		delete_spoolfile : function (data, callback, errorCallback) {
			var _this = this;
			
			_this.post(data, '../../dancik-aws/ods/deleteSpoolfile', callback, errorCallback);
		},
		
		release_spoolfile : function (data, callback, errorCallback) {
			var _this = this;
			
			_this.post(data, '../../dancik-aws/ods/releaseSpoolfile', callback, errorCallback);
		},
		
		hold_spoolfile : function (data, callback, errorCallback) {
			var _this = this;
			
			_this.post(data, '../../dancik-aws/ods/holdSpoolfile', callback, errorCallback);
		},
		
		update_spoolfile_outq : function (data, callback, errorCallback) {
			var _this = this;
			
			_this.post(data, '../../dancik-aws/ods/updateSpoolfile', callback, errorCallback);
		},
		
		ping_spoolfile : function (data, callback, errorCallback) {
			var _this = this;
			
			_this.post(data, '../../dancik-aws/ods/pingSpoolFile', callback, errorCallback);
		},
		
		ping_ifs_file : function (data, callback, errorCallback) {
			var _this = this;
			
			_this.post(data, '../../dancik-aws/ods/pingIFSFile', callback, errorCallback);
		},
		
		open_spoolfile_pdf : function (data, callback, errorCallback) {
			var _this = this;			
	
			_this.get(data, '../../dws/exec/Splf2Pdf', callback, errorCallback);
		},
		
		open_spoolfile_text : function (data, callback, errorCallback) {
			var _this = this;			
	
			_this.get(data, '../../dws/exec/Splf2Txt', callback, errorCallback);
		},
		
		get_ods_folders : function (data, callback, errorCallback) {
			var _this = this;			
	
			_this.post(data, '../../dancik-aws/ods/getODSFolderListing', callback, errorCallback);
		}
	});
})(jQuery);
