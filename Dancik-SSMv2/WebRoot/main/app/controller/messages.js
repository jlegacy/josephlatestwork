/*globals $App */
(function ($) {
	$App.Controller('Messages', {
	
		initialize: function () {
			this.view = $App.View('Messages');
		},
		
		confirm_message : function (options) {
			//
			var _this = this;
			
			_this.view.confirm_message(options);
		},
		
		warn_message : function (options) {
			var _this = this;
			
			_this.view.warn_message(options);
		}
		
	});
})(jQuery);