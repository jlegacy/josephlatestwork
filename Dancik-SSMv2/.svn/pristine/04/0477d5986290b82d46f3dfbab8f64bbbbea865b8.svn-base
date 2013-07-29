/*globals $App */
(function ($) {
	$App.Controller('SelectionSearch', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('SelectionSearch');
			this.model = $App.Model('SelectionSearch');
		},
		// ------------------------------------------------------------
		// -- Initialize and render the initial application skeleton
		// ------------------------------------------------------------
		init: function () {
			var _this = this, target;

			target = $App.View('Application').get_app_container();

			_this.view.init(target);
		},
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		more: function (data) {
			var _this = this;

			var neededConfig, target;
			target = $App.View('Application').get_app_container(),
				neededConfig = [
				"text_RetrievingRecords"
			];
			// flag to either replace results or append them
			data.more = "Y";
			// show busy //
			_this.view.busy();
			_this.view.hideResults();
			_this.model.openSelectionFileResultsDetails(data,
				function (results) {

					_this.view.unbusy();
					_this.view.showResults();
					_this.view.openSelectionFileResultsDetails(target, results, data);

				},
				function (errors) {
					$App.Fire("ajax_errors", errors,
						function (errors) {
							_this.view.set_error(errors);
						});
				}
			);
		},
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		openSelectionFileResultsDetails: function (data) {
			
			var _this = this, neededConfig, target;
			target = $App.View('Application').get_app_container(),
				neededConfig = [
				"text_RetrievingRecords"
			];

			// Load dummy page if search box being used on page other than search results//
			if (data && data.ssm_selectionPage == 'N') {
                _this.view.openSelectionFileResultsDetailsWait(target);
				_this.view.openSelectionFileResultsCheckBoxes(target, data);
			}

			_this.view.busy();
			_this.view.hideResults();
			_this.view.renderSearchForm(data);
			_this.model.openSelectionFileResultsDetails(data,
				function (results) {

					// no checkboxes selected //
					if (data.ssm_showRecords == 'N') {
						results.selections = [];
					}

					_this.view.clearResults();
//                    _this.view.openSelectionFileResultsHeadings(target, data);
					_this.view.openSelectionFileResultsDetails(target, results, data);
					_this.view.unbusy();
					_this.view.showResults();

				},
				function (errors) {
					$App.Fire("ajax_errors", errors,
						function (errors) {
							_this.view.set_error(errors);
						});
				}
			);
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		copySelection: function(data){
			var _this = this;
			
			callback = function(returnData) {
				$App.Utils.saveComplete();
				$App.Fire('info_message', {message : "Selection # " + returnData.selection.new_id + " was created."});
				
				// Open the copy of the selection
				$App.Fire('openSelection', {
	                ssm_id : returnData.selection.new_id
	            });
			},
			
			errorCallback = function(errorData) {
				$App.Utils.saveComplete();
				$App.Fire("ajax_errors", errorData);
			};
		
			$App.Utils.saveInProcess({showBlanket:true});
			_this.model.copySelection(data, callback, errorCallback);
				
			
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		removeSelection: function(data){
			var _this = this;
			
			callback = function(returnData) {
				$App.Utils.saveComplete();
//				
				$App.Fire('info_message', {message : "Selection# " + data.ssm_id + " successfully deleted."});
				
				_this.view.triggerFormSubmit();
			},
			
			errorCallback = function(errorData) {
				$App.Utils.saveComplete();
				$App.Fire("ajax_errors", errorData);
			};
		
			
			$App.Fire('confirm_message',{
				message: "You are about to delete a selection sheet. <br/> Do you want to continue?",
				title: "Confirm",
				callback: function(confirmResponse){
					if(confirmResponse){
						$App.Utils.saveInProcess({showBlanket:true});
						_this.model.rmvSelection(data, callback, errorCallback);
					}
				}
			});
			
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		quickSelectionLookup: function (data) {
			
			//determine if string starts with #
			var patt = /^(#)/g;
			var params = {};
			var result = patt.test(data.ssm_Search_SelectionId);

			// get rid of the search box pop up after submission
			$('#ssm_topSearchGo').trigger('focus');
			
			if (result) {
				params.ssm_id = data.ssm_Search_SelectionId.replace(/[^\d]/g, '');
                    $App.Fire('openSelection', params);
//                    $App.Utils.saveComplete();
				return;
			}

			var _this = this;
			var neededConfig, target;
			target = $App.View('Application').get_app_container(),
				neededConfig = [
				"text_RetrievingRecords"
			];

			if (data.ssm_Search_SelectionId == "") {
				_this.view.openQuickSearchShortcutsEmpty(target);
				return;
			}

			_this.view.busy();
			_this.view.openQuickSearchShortcutsInitLoading(target);

			data.ssm_Keyword = data.ssm_Search_SelectionId;
			_this.model.openQuickSearchShortcuts(data,
				function (results) {

					// if no data passed from model, dummy up to show zero totals//
					if (typeof results.selection_search_results == 'undefined') {
						var object1 = {
							"selection_search_results":
								{
									"jobinfo_count": "0",
									"all_count": "0",
									"customer_count": "0",
									"notepad_count": "0",
									"reference_count": "0",
									"notes_count": "0",
									"items_count": "0"
								}
						};

						$.extend(results, object1);
					}

					if (typeof results.customer_search_results == 'undefined') {
						var object2 = {
							"customer_search_results":
								{
									"reference_count": "0",
									"name_count": "0",
									"address_count": "0",
									"city_count": "0",
									"state_count": "0"
								}
						};

						$.extend(results, object2);
					}

					if (typeof results.selection == 'undefined') {
						var object3 = {
							"selection":
								{
									"found": "N"
								}
						};

						$.extend(results, object3);
					}

					_this.view.unbusy();
					_this.view.openQuickSearchShortcuts(target, results, data);
				},
				function (errors) {
					$App.Fire("ajax_errors", errors,
						function (errors) {
							_this.view.set_error(errors);
						});
				}
			);
		}
	});
})(jQuery);