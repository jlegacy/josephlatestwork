(function ($) {
	$App.View('CustomerSearch', {
		config: {},
		selectionId: '', // -- Use if executing the Customer Search for within a Selection#

		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		inititialize: function () {
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		init: function (target, data) {
			var _this = this,
				breadCrumbActive,
				breadCrumbInactive,
				ssmId = data.ssm_id;

			_this.selectionId = '';
			// -- If 'ssm_id' was passed, then save for later use...
			if (data && data.ssm_id) {
				_this.selectionId = data.ssm_id;

			}
			target.html($App.Template("customerSearch/base.ejs").render(data));

			// Change the breadcrumb to reflect an Update to the Customer
			if (ssmId) {
				breadCrumbActive = "<a href='#openSelection/" + ssmId + "'>Selection#: " + ssmId + "</a>";
				target.find(".activeCrumbBody").html(breadCrumbActive);
				breadCrumbInactive = "Update Customer";
				target.find(".inactiveCrumbBody").html(breadCrumbInactive);
			}

			$App.Fire('setActiveTab', $('#tab_selections'));

		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		openNewCustomer: function () {
			var _this = this,
				inputs,
				temp = {};

			$('#ssm_CustomerSearch .new_record').removeClass('hide');
			$('#ssm_CustomerSearch .search').addClass('hide');


			// add clicks to cancel add customer icon//
			$('#ssm_CustomerSearch .new_record .cancel').off();
			$('#ssm_CustomerSearch .new_record .cancel').on('click', function () {
				$App.Fire('cancelCustomerCreate');
			});

			// add clicks to add customer//
			$('#ssm_CustomerSearch .new_record .create').off();
			$('#ssm_CustomerSearch .new_record .create').on('click', function () {
				var route = '#addCustomer';
				$('#ssm_addCustomer_form').attr("action", route);
				$('#ssm_addCustomer_form').submit();
			});


			// add clicks to insert customer and add selection//
			$('#ssm_CustomerSearch .new_record .create_and_select').off();
			$('#ssm_CustomerSearch .new_record .create_and_select').on('click', function () {
				var route;

				if (_this.selectionId != '') {
					route = '#addCustomerAndUpdateSelection';
				} else {
					route = '#addCustomerAndCreateSelection';
				}
				$('#ssm_addCustomer_form').attr("action", route);
				$('#ssm_addCustomer_form').submit();
			});

			// -- Auto-Tabs
			$('#ssm_zip5, #ssm_zip4, #ssm_areacode, #ssm_phone, #ssm_email').autotab_magic();
			
			
            // -- Load watermarks
            $('#ssm_firstname_customer').watermark("First Name");
            $('#ssm_lastname_customer').watermark("Last Name");

		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		addCustomer: function (results, data) {
			var _this = this;

			$App.Fire('cancelCustomerCreate', data);
			$App.Fire('info_message', 'Customer Added');
			$App.Fire('getCustomers', {
				ssm_keyword: data.ssm_firstname + ' ' + data.ssm_lastname
			});
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		cancelCustomerCreate: function () {
			var _this = this;
			$('#ssm_CustomerSearch .new_record').addClass('hide');
			$('#ssm_CustomerSearch .search').removeClass('hide');

			// -- Clear the form
			$('#ssm_CustomerSearch .new_record').find(':input').each(function () {
				switch (this.type) {
					case 'password':
					case 'select-multiple':
					case 'select-one':
					case 'text':
					case 'textarea':
						$(this).val('');
				}
			});
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		getCustomers: function (results, data) {
			var divId,
				getEjs,
				temp = {},
				_this = this;

			_this.results = results;
			_this.data = data;

			temp = $.extend({}, results, {
				config: _this.config,
				ssm_SelectionId: _this.selectionId
			});



			if (results.queryinfo.querysize > 0) {
				getEjs = $App.Template("customerSearch/search-results.ejs").render(temp);
				$('#ssm_CustomerSearch .results_table').append(getEjs);
			} else {
				$('.ssm_no_results').empty();
				getEjs = $App.Template("customerSearch/no-results-found.ejs").render(_this.data);
				$('.ssm_search_results').append(getEjs);
			}

			//Set totals for label search result box//
			$('label#selection_results_label').html(_this.createResultsLabel(results.queryinfo, data));

			$('#ssm_CustomerSearch .more_form').data('payload', $.extend(data, {
				ssm_StartingRecord: results.queryinfo["nextstartingrecord"]
			})
				);


			if (results.queryinfo["nextstartingrecord"] == 0) {
				$('#ssm_CustomerSearch .more_form').hide();
			} else {
				$('#ssm_CustomerSearch .more_form').show();
			}

			$('#selection_results_label').show();
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		createResultsLabel: function (query, data) {
			var start, end, results;
			// start = query.nextstartingrecord - $('.SSM-select').val();
			start = 1;
			end = query.nextstartingrecord - 1;


			if (query.eof == "Y")
			{
				end = query.querysize;
			}

			results = 'Results '
				+ start
				+ ' - '
				+ end
				+ ' of '
				+ query.querysize
				+ ' selections for ' + '<b>'
				+ data.ssm_keyword + '</b>';

			if (query.querysize == 0)
			{
				results = "No selections found for <b> "
					+ data.ssm_keyword + '</b>';
			}

			return results;
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		reloadCustomerCell: function (results, data) {
			if (results.customer) {
				$('#ssm_CustomerSearch .details_' + data.ssm_id + ' .data').html($App.Template("customerSearch/customer-table-view.ejs").render(results.customer));
			}
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		openEditCustomer: function (data) {
			var _this = this,
				id,
				form;

			id = data.ssm_retailid;
			// -- Toggle the view from Detail to Extended...
			$('#ssm_CustomerSearch .extended_' + id).toggle();
			$('#ssm_CustomerSearch .details_' + id).toggle();

			form = $('#form-extended-customer_' + id);

			// -- Loop through extended forms looking for input fields
			$(form).find(':input').each(function () {
				var element,
					tagName;
				element = $(this);
				tagName = element.prop("tagName");

				if (tagName.toLowerCase() === 'input') {
					element.bind("blur", function () {
						$(form).submit();
					});
				} else if (tagName.toLowerCase() === 'select') {
					element.bind("change", function () {
						$(form).submit();
					});
				}
			});
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		closeEditCustomer: function (data) {
			var _this = this,
				id,
				form;

			id = data.ssm_retailid;
			// -- Toggle the view from Detail to Extended...
			$('#ssm_CustomerSearch .extended_' + id).toggle();
			$('#ssm_CustomerSearch .details_' + id).toggle();

			form = $('#form-extended-customer_' + id).serializeObject();

			$App.Fire('reloadCustomerCell', {
				ssm_id: data.ssm_retailid
			});
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		busy: function () {
			$('#ssm_CustomerSearch .ssm_busy').show();
			$('#ssm_CustomerSearch .instructions').hide();
		},
		unbusy: function () {
			$('#ssm_CustomerSearch .ssm_busy').hide();
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		busyUpdatingCustomer: function (data) {
			$('#ssm_CustomerSearch .extended_' + data.ssm_id).append('<div class="mini-busy"/>');
		},
		unbusyUpdatingCustomer: function (data) {
			$('#ssm_CustomerSearch .extended_' + data.ssm_id + ' .mini-busy').remove();
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		busyUpdatingCustomerCell: function (data) {
			$('#ssm_CustomerSearch .details_' + data.ssm_id).append('<div class="mini-busy"/>');
		},
		unbusyUpdatingCustomerCell: function (data) {
			$('#ssm_CustomerSearch .details_' + data.ssm_id + ' .mini-busy').remove();
		},
		// ------------------------------------------------------------
		// --
		// ------------------------------------------------------------
		clearResults: function () {
			$('#ssm_CustomerSearch .results_table').empty();
		},
		showResults: function () {
			$('#ssm_CustomerSearch .results_table').show();
		},
		hideResults: function () {
			$('#ssm_CustomerSearch .results_table').hide();
		}

	});
})(jQuery);        