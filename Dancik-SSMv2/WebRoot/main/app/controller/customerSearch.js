/*globals $App */
(function ($) {
	$App.Controller('CustomerSearch', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('CustomerSearch');
			this.model = $App.Model('CustomerSearch');
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		init: function (data) {
			var _this = this,
				target,
				needed_lists = ['customertypes', 'states', 'status'];

			target = $App.View('Application').get_app_container();

			$App.Model("Cache").getCacheData(needed_lists,
				function (cachedResults) {
					$.extend(data, cachedResults);
					_this.view.init(target, data);
				}
			);
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		openNewCustomer: function () {
			var _this = this;
			_this.view.openNewCustomer();
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		updateCustomer: function (data) {
			var _this = this;

			_this.view.busyUpdatingCustomer(data);
			_this.model.updateCustomer(data,
				function (results) {
					_this.view.unbusyUpdatingCustomer(data);
				},
				function (errors) {
					$App.Fire("ajax_errors", errors,
						function (errors) {
							_this.view.set_error(errors);
						});
				});
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		getCustomers: function (data) {
			var _this = this,
				needed_lists = ['customertypes', 'states', 'status'];


			$App.Model("Cache").getCacheData(needed_lists,
				function (cachedResults) {
					_this.view.hideResults();
					_this.view.busy();
					_this.view.clearResults();
					_this.model.getCustomers(data,
						function (results) {
							_this.view.unbusy();
							_this.view.showResults();

							$.extend(results, cachedResults);
							// -- Set Reminders as the active tab.
							_this.view.getCustomers(results, data);
						},
						function (errors) {
							$App.Fire("ajax_errors", errors, function (errors) {
								_this.view.set_error(errors);
							});
						});
				});
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		getCustomersMore: function (data) {
			var _this = this,
				needed_lists = ['customertypes', 'states', 'status'];

			$App.Model("Cache").getCacheData(needed_lists,
				function (cachedResults) {
					_this.view.busy();

					_this.model.getCustomers(data,
						function (results) {
							_this.view.unbusy();

							$.extend(results, cachedResults);
							_this.view.getCustomers(results, data);
						},
						function (errors) {
							$App.Fire("ajax_errors", errors, function (errors) {
								_this.view.set_error(errors);
							});
						});
				});
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		openEditCustomer: function (data) {
			var _this = this;
			_this.view.openEditCustomer(data);
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		closeEditCustomer: function (data) {
			var _this = this;
			_this.view.closeEditCustomer(data);
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		cancelCustomerCreate: function () {
			var _this = this;
			_this.view.cancelCustomerCreate();
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		addCustomer: function (data) {
			var _this = this;

			_this.model.addCustomer(data, function (results) {
				_this.view.addCustomer(results, data);
			}, function (errors) {
				$App.Fire("ajax_errors", errors, function (errors) {
					_this.view.set_error(errors);
				});
			});
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		addCustomerAndCreateSelection: function (data) {
			var _this = this;

			_this.model.addCustomer(data, function (results) {
				data.ssm_RetailId = results.record.id;

				$App.Fire('info_message', 'Customer Added');
				$App.Fire('createSelection', data);
			},
				function (errors) {
					$App.Fire("ajax_errors", errors, function (errors) {
						_this.view.set_error(errors);
					});
				});
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		addCustomerAndUpdateSelection: function (data) {
			var _this = this;

			_this.model.addCustomer(data, function (results) {
				data.ssm_PersonId = results.record.id;

				$App.Fire('info_message', 'Customer Added');
				$App.Fire('setSelectionCustomer_ReopenSelection', data);

			}, function (errors) {
				$App.Fire("ajax_errors", errors, function (errors) {
					_this.view.set_error(errors);
				});
			});
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		reloadCustomerCell: function (data) {
			var _this = this;

			_this.view.busyUpdatingCustomerCell(data);
			_this.model.getCustomer(data, function (results) {
				_this.view.reloadCustomerCell(results, data);
				_this.view.unbusyUpdatingCustomerCell(data);
			},
				function (errors) {
					$App.Fire("ajax_errors", errors, function (errors) {
						_this.view.set_error(errors);
					});
				});
		}

	});
})(jQuery);    