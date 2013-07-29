(function ($) {
	$App.Model.Extend('SSM.Ajax', 'Jobs', {
		initialize: function () {
			this._super();
		},
		
//		Get Job details 
		loadJobDetails : function (data, callback, errorCallback) {
			this.get(data, '../../dancik-aws/ssm/getJobInfoDetails', callback, errorCallback);
		},
//		Update Job Info
		setJobInfo : function(data, callback, errorCallback) {
			this.get(data, '../../dancik-aws/ssm/setJobInfoDetailFields', callback, errorCallback);
		},
//		Get a Job's Details
		getJobInfoDetail : function(data, callback, errorCallback) {
			this.get(data, '../../dancik-aws/ssm/getJobInfoDetail', callback, errorCallback);
		},
//		Add a new job
		addJobInfoRecord : function(data, callback, errorCallback) {
			this.get(data, '../../dancik-aws/ssm/addJobInfoDetailRecord', callback, errorCallback);
		}
	});
})(jQuery);