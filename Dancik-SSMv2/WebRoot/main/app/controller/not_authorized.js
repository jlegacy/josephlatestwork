/*globals $App */
(function ($) {
	$App.Controller('NotAuthorized', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('NotAuthorized');
		},
		// ------------------------------------------------------------
		// -- Initialize and render the initial application skeleton
		// ------------------------------------------------------------
		init: function (form) {
			var _this = this;
			_this.view.renderApp();
		}
	});
})(jQuery);