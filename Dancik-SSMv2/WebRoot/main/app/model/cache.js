/*globals $App*/
(function ($) {
	$App.Model.Extend("SSM.Ajax", "Cache", {
		cached: {},		
		
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		reset: function () {
			var _this = this;
			_this.cached = {};
		},
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		remove: function (id) {
			var _this = this;
			delete _this.cached[id];
		},

		// -----------------------------------------------------------
		// - Parameters (data) should be in the following construction.
		// - - ['mfgrs', 'roomtypes', 'roomareas']
		// ------------------------------------------------------------
		getCacheData: function (params, callback, errorCallback) {
			var _this = this,
				post_params = {},
				return_data = {};

			//look for previously loaded settings
			params.requests = $.map(params, function (request, index) {
				var request_lower = request.toLowerCase();
				if (_this.cached[request_lower] !== undefined) {
					// -- Put previously loaded settings in to return params
					return_data[request_lower] = _this.cached[request_lower];
					// -- Remove them from list of requested settings
					return null;
				}
				// -- If setting was not previously loaded, leave it in the list
				return request;
			});
			
			// -- if there are more settings to be loaded, then put them in the post params
			if (params.requests.length > 0) {
				post_params.ssm_requests = params.requests;
			} else {
				// -- If all settings have already been loaded, then call the callback
				_this._doCallback(callback, errorCallback, return_data);
				// -- prevent calling the server
				return;
			}
			
			_this.post(post_params, '../../dancik-aws/ssm/getCacheData', function (results) {
					// -- Store loaded settings
					$.extend(_this.cached, results);
					$.extend(return_data, results);
					
					callback(return_data);
				}, 
				errorCallback
			); 
				
		}
	});
})(jQuery);