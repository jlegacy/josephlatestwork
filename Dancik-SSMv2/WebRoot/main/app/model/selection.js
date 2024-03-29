(function ($) {
    $App.Model.Extend('SSM.Ajax', 'Selection', {
    	currentSelectionId : null,
    	showPrices : null,
        initialize: function () {
            this._super();
        },
        reset: function () {
            var _this = this;
            _this.currentSelectionId = null;
        },

        createSelection: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/addSelection', callback, errorCallback);
        },
        


        getSelectionHeader: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getSelection_Header', 
           		function (results) {
            		if (results  && results.header) {
            			_this.currentSelectionId = results.header.id;
            			$App.Fire("setLastSelectionID");
            		}
	    			callback(results);
	    		},
           		errorCallback
            );
        },
        getSelectionDates: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getSelection_Dates', callback, errorCallback);
        },
        getSelectionReferences: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getSelection_References', callback, errorCallback);
        },
        
        getSelectionNotes: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getSelection_Notes', callback, errorCallback);
        },
        
        getSelectionJobInfo: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getSelection_JobInfo', callback, errorCallback);
        },
        
        setSelectionCustomer: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/setSelectionCustomer', callback, errorCallback);
        },
        setSelectionCustomerField: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/setCustomerFields', callback, errorCallback);
        },
        setSelectionNotes: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/setSelectionNotes', callback, errorCallback);
        },
        setSelectionAltAddr: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/setSelectionAltAddr', callback, errorCallback);
        },
        setSelectionJobInfo: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/setSelectionJobInfo', callback, errorCallback);
        },
        setSelectionReference: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/setSelectionReference', callback, errorCallback);
        },
        setSelectionDate: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/setSelectionDate', callback, errorCallback);
        },
        setSelectionStatus: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/setSelectionStatus', callback, errorCallback);
        },
        
        
        selectionInitialLoad: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getInitialLoad_ViewSelection', callback, errorCallback);
        },	
        
        getSelectionLogs: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getSelection_Logs', callback, errorCallback);
        },
        getSelectionNotePad: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getSelection_Notepad', callback, errorCallback);
        },
        
        addNotePad: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/setSelectionNotepad', callback, errorCallback);
        },
        
        getBuyerAccounts: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getBillingAccounts', callback, errorCallback);
        },
        getInitialLoad_PrintSelection: function (data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getInitialLoad_PrintSelection', callback, errorCallback);
        }
        
        
    });
})(jQuery);