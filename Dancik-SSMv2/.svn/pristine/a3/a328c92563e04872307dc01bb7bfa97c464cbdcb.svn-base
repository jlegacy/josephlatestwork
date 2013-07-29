/*globals $App*/
(function ($) {
	$App.Model.Extend("SSM.Ajax", "Config", {
		config: {},
		ieBrowser : false,
		ieVersion : 0,

		reset: function () {
			var _this = this;
			_this.config = {};
		},
		getInitialConfig: function(configList) {
			var _this = this,
					i,
					data = {},
					parameters = $j.extend({},
						_this.session_vars, 
						{ ssm_reqfields : configList.join(',') }
					);
			
			// -- Do a one-time load of Browser information.
			if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
				 _this.ieBrowser = true;
				 _this.ieVersion = 'ieVersion', new Number(RegExp.$1);
			}
			
			// -- This does not use the standard _this.post method because it is synchronous
			$.ajax({ url : '../../dancik-aws/ssm/getInitialLoad', 
				data: parameters,
				type: 'POST',
				async: false, 
				success: function (json) {
					if (json.config) {
						json.config = _this.yn2bool(json.config);
					}
					data = json;
				}
			});

			// -- Salvage Config settings...
			_this.config = data.config;
			
			return data;
		},
		getConfig: function (data, callback, errorCallback) {
			var _this = this,
				post_data = {},
				return_data = {};
			
			//place a single string config setting in to the proper structure
			if ($.isPlainObject(data) && data.fields && (typeof(data.fields)).toLowerCase() == "string") {
				data = {fields: [data.fields]};
			}
			//place array config settings in to proper structure
			if ($.isArray(data)) {
				if (data.length > 0) {
					data = {fields: data};
				} else {
					data = {};
				}
			}
			
			if ($.isPlainObject(data) && $.isArray(data.fields)) {
				//look for previously loaded settings
				data.fields = $.map(data.fields, function (setting, index, undefined) {
					var setting_lower = setting.toLowerCase();
					if (_this.config[setting_lower] !== undefined) {
						//put previously loaded settings in to return data
						return_data[setting_lower] = _this.config[setting_lower];
						//remove them from list of requested settings
						return null;
					}
					//if setting was not previously loaded, leave it in the list
					return setting;
				});
				
				if (data.fields.length > 0) {
					//if there are more settings to be loaded, then put them in the post data
					post_data.d24reqFields = data.fields.join(",");
				} else {
					//if all settings have already been loaded, then call the callback
					_this._doCallback(callback, errorCallback, return_data);
					//prevent calling the server
					return;
				}
			}
			
			_this.post(post_data, '../../dancik-aws/ssm/getConfig', 
				function (results) {
					//store loaded settings
					$.extend(_this.config, results);
					$.extend(return_data, results);
					callback(return_data);
				}, 
				errorCallback
			);
		},
		in_filter: function (json) {
			var _this = this;
			
			json = _this.yn2bool(json);
			if (json.config) {
				json.config = _this.yn2bool(json.config);
			}
			return json;
		},
		yn2bool: function (json) {
			var allow_regex = /^allow/,
				deny_regex = /^deny/,
				restrict_regex = /^restrict/;
			
			$.each(json, function (key, value) {
				if (allow_regex.test(key) || deny_regex.test(key) || restrict_regex.test(key)) {
					json[key] = value == "Y";
				}
			});
			
			if (json.supresscatandprodlisting_ifnorecords) {
				json.supresscatandprodlisting_ifnorecords = json.supresscatandprodlisting_ifnorecords == "Y";
			}

			return json;
		}
	});
})(jQuery);