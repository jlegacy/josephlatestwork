(function ($) {
	$App.Model.Extend('SSM.Ajax', 'Reminders', {
		initialize: function () {
			this._super();
		},

		insertReminder: function (data, callback, errorCallback) {
		    this.post(data, "../../dancik-aws/ssm/addReminder", callback, errorCallback);

		},

		deleteReminder: function (data, callback, errorCallback) {
		    this.post(data, "../../dancik-aws/ssm/rmvReminder", callback, errorCallback);

		},


		getReminder: function (data, callback, errorCallback) {
		    this.post(data, "../../dancik-aws/ssm/getReminder", callback, errorCallback);

		},

        updateReminder: function (data, callback, errorCallback) {
            this.post(data, "../../dancik-aws/ssm/setReminder", callback, errorCallback);

		},
		
		getForDate: function (data, callback, errorCallback) {
		    this.get(data, "../../dancik-aws/ssm/getRemindersForDate", callback, errorCallback);
		 
		    //if date not passed then use current date//
               if (typeof data.ssm_ForDate == 'undefined') {
                   var currDate = new Date();
                   data.ssm_ForDate = (currDate.getMonth() + 1) + '/' + currDate.getDate() + '/' + (currDate.getFullYear() % 100);
		    }
		},

		getForDateRange: function (data, callback, errorCallback) {
		    this.post(data, "../../dancik-aws/ssm/getRemindersForDateRange", callback, errorCallback);

		},

		retrieve: function (data, callback, errorCallback) {
		    this.post(data, "../../dancik-aws/ssm/getReminder", callback, errorCallback);
		}
	});
})(jQuery);