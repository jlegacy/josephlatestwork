(function($) {
    $App.Model.Extend('SSM.Ajax', 'SelectionSearch', {
    	ajaxId : 'SSM_SelectionSearches',
    	
        initialize: function() {
            this._super();
        },

        openQuickSearchShortcuts: function(data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getQuickSearchResults', callback, errorCallback);
        },

        openSelectionFileResultsDetails: function(data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/getSelections', callback, errorCallback);
        },
        copySelection: function(data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/copySelection', callback, errorCallback);
        },
        rmvSelection: function(data, callback, errorCallback) {
            var _this = this;
            _this.get(data, '../../dancik-aws/ssm/rmvSelection', callback, errorCallback);
        }
        
    });
})(jQuery);