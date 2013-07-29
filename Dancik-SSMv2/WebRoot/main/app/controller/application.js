/*globals $App */
(function ($) {
	$App.Controller('Application', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('Application');
			this.model = $App.Model('Application');
		},
		// ------------------------------------------------------------
		// -- Initialize and render the initial application skeleton
		// ------------------------------------------------------------
		init: function (form) {
			$App.Controller('Config').reset();
			$App.Controller("Cache").reset();
			
			var _this = this,
				config = $App.Controller('Config').getConfig();
			
			if (config.errors) {
				 $App.Controller('NotAuthorized').init();
			} else {
				_this.view.renderApp(config);
			}
		},
		
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		openHelp: function () {
			var _this = this;
			_this.view.openHelp();
		},
		
        // ------------------------------------------------------------
        // 
        // ------------------------------------------------------------
		setActiveTab: function(element) {
			var _this = this;
			_this.view.setActiveTab(element);
        },
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		logout: function (data) {
		    alert('Application.logout() not yet implemented');
		},
		// ------------------------------------------------------------
		// -- 
		// ------------------------------------------------------------
		showNotificationDialog: function (data) {
			var _this = this;
			// -- data = { header: "xx", detail : "xxx" }
			_this.view.showNotificationDialog(data);
		},
		// ------------------------------------------------------------
		// -- 
		// ------------------------------------------------------------
		setLastSelectionMsg: function (data) {
		},
		
		
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		ssm_errors: function (data) {
			if ($.isArray(data)) {
				data = {
					errors: data
				}
			}
			var systemViolation = $.grep(data.errors, function (n, i) {
				return /^NOTALLW/.test(n.errid);
			});
			var userConfigViolation = $.grep(data.errors, function (n, i) {
				return /^USRCNFG/.test(n.errid);
			});
			var userInActive = $.grep(data.errors, function (n, i) {
				return /^NOTACTV/.test(n.errid);
			});
			
			
			if (session.length > 0) {
				$App.Fire("session_error", session[0]);
			} else if (data.callback) {
				data.callback(data.errors);
			} else {
				$App.Fire('ajax_errors', data.errors);
			}
		},
		showHelp: function () {
			this.view.showHelp();
		}
	});
})(jQuery);