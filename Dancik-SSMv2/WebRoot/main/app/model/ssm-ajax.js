/*global $App jQuery*/
(function ($) {
	$App.Model.Extend('DWS.Ajax', 'SSM.Ajax', {
		
		/**** "Private" methods ****/
		_send_request: function(obj, url, method, callback, errorCallback) {
			var _this = this;
			var errorCallback = errorCallback || _this.handleErrors;

			var obj = _this.out_filter(obj);

			var ajax_options = {
				url: url,
				type: method,
				traditional: true,
				dataType: 'json',
				success: function(data) {
					if( data && data.errors ) {
						errorCallback( data.errors );
					} else {
						try {
							callback( _this.in_filter(data) );
						} catch(exception) {
							$App.Log.exception(exception);
							errorCallback([
								{errmsg: 'Error communicating with server.'}
							]);
						}
					}
				},
				error: function(response) {
					//Don't do anything if this was a manual abort.
					if( !response.aborted ) {
						errorCallback([
							{errmsg: 'Error communicating with server.'}
						]);
					}
				}
			}
			// GET requests do not use json
			if( method != 'GET') {
				ajax_options.contentType = "application/json; charset=utf-8";
				ajax_options.data = JSON.stringify(obj);
				ajax_options.headers = {"X-DANCIK-APIS-REQUEST-ENCODING": "JSON", "x-dancik-apis-request-encoding": "JSON"};				
				ajax_options.requestHeaders  = {"x-dancik-apis-request-encoding": "JSON", "X-DANCIK-APIS-REQUEST-ENCODING": "JSON"};				
			} else {
				ajax_options.data = obj;
			}

			if( _this.ajaxId ) {
				//if this is a named request, set up the complete callback
				ajax_options.complete = _this._wrapNamedComplete(ajax_options.complete, _this.ajaxId);
				_this.cancelRequest(_this.ajaxId);
				_this.ajaxTracker.named[_this.ajaxId] = $.ajax(ajax_options);
			} else if ( _this.queueId ) {
				//if this is a queued request, set up the success & error handlers
				ajax_options.success = _this._wrapQueuedSuccess(ajax_options.success, _this.queueId);
				errorCallback = _this._wrapQueuedError(errorCallback, _this.queueId);
				var queue = _this.ajaxTracker.queued[_this.queueId] = _this.ajaxTracker.queued[_this.queueId] || [];
				//put a function that makes the request on the queue
				queue.push( function() {
					$.ajax(ajax_options);
				});
				//if this is the only thing in the queue, execute it.
				if( queue.length == 1 ) {
					queue[0]();
				}
			} else {
				//otherwise, just make the request
				$.ajax(ajax_options);
			}

		},		

		
		_doFilterCallback: function (callback, errorCallback, data) {
			var _this = this,
				errorCallback = errorCallback || _this.handleErrors;
			try {
				_this._doCallback(callback, errorCallback, _this.in_filter(data));
			} catch(exception) {
				$App.Log.exception(exception);
				errorCallback([
					{errmsg: 'Error communicating with server.'}
				]);
			}
		},
		_doCallback: function (callback, errorCallback, data) {
			var _this = this,
				errorCallback = errorCallback || _this.handleErrors;
			try {
				callback(data);
			} catch(exception) {
				$App.Log.exception(exception);
				errorCallback([
					{errmsg: 'Error communicating with server.'}
				]);
			}

		},
		
		
		handleErrors: function (errors) {
			var modified_errors = $.map(errors, function (error) {
				if ($.isPlainObject(error)) {
					return error;
				} else {
					return {errmsg: error};
				}
			});
			$App.Fire('ajax_errors', modified_errors);
			$App.Fire('clear_overlay');
		}
		
	});
})(jQuery);