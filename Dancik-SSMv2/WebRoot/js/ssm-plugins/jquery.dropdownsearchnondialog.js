/* Dropdown search plugin. requires the serializeObject plugin */
(function($){

//Default options
var defaults = {
	/*Basic settings*/
	idField: 'id',                             //Record field to show as id
	idElement: undefined,                      //CSS selector, element, or jquery collection of fields to populate with id when a record is selected - defaults to target element
	descriptionField: 'description',           //Record field to show as description
	descriptionElement: undefined,             //CSS selector, element, or jquery collection of fields to populate with description when a record is selected
	onSelect: $.noop,                          //Function to run when user selects an option - will be passed the full record for the selected option
	onDrop: $.noop,							   //Function to run when the dropdown is created - passed in the options to be modified
	appendTo: document.body,                   //Element dropdown box should be appended to when opened
	dropdownClass: '',                         //Extra class name to assign
	/* Search settings */
	searchable: true,                          //Flag inidicating if the user can search the result sets (only works if url is specified);
	title: '',                                 //Title to display for dropdown
	idParam: 'id',                             //Search parameter for id
	descriptionParam: 'description',           //Search parameter for description
	startParam: 'meta_starting_record',        //Search parameter indicating starting record to return
	countParam: 'meta_max_records',            //Search parameter indicating number of records to return
	sortParam: 'meta_order_by',                //Search parameter indicating field to sort by
	dirParam: 'meta_descending',               //Search parameter indicating sort direction
	ascendingValue: false,                     //Value of dirParam indicating ascending sort
	descendingValue: true,                     //Value of sortParam indiicating descending sort
	queryParams: {},                           //Additional URL parameters to pass to server when loading data
	in_filter: $.noop                          //function to modify incoming data before display
	/*Optional settings */
	//descriptionNext						   //true to use the element after the input as the description element
	//preloadedContent:                        //Static content to display. Required if no url.
	//url:                                     //URL to hit to load data. Required if no preloadedContent.
	//file:                                    //filename to hit in file query service - changes default settings for many other options
	//hideId: true
	//hideDescription: true
	//resultsField: 'records' || 'results'     //Field in ajax response containing list of records to display
	//countField: 'querysize' || 'total_count' //Field in ajax response containing record count
	//orderParam: 'parameterName'			   //Parameter to use orderby instead of sort and dir
};

//methods that can be called on an element using this plugin.
var pluginMethods = {
	init: function(opts) {
		var
			options = $.extend({}, opts);
			$targets = this.filter('input:text').not('.ssm-dropped'),  //only works on text inputs
			$handles = $();

		//wrap the inputs in a span, and insert the dropdown handle after them.
		$targets
			.wrap('<span class="ssm-dropdown-wrapper"/>')
			.after('<img class="ssm-dropdown-handle" src="../images/bullet_arrow_down.png" alt="Select" title="Select"/>')
			.addClass('ssm-dropped');
		$handles = $targets.next();

		//If a file has been specified, add/override some defaults
		if( options.file ) {
			options = $.extend(true, {
				url: '../../dws/jsonservice/Popup2Search_WebService/exec',
				searchable: true,
				idParam: 'filterId',
				descriptionParam: 'filterDescr',
				startParam: 'startingRec',
				countParam: 'maxRows',
				sortParam: 'orderBy',
				dirParam: 'sortDirection',
				ascendingValue: 'ASC',
				descendingValue: 'DESC',
				queryParams: {
					file: options.file
				}
			}, options);
		}
		options = $.extend({},defaults,options);
		options.searchable = options.searchable && options.url; //disable searching if no url specified
		
		//Store option data for each element
		$targets.each(function(){
			var
				$target = $(this),
				opts = $.extend({}, options);

			opts.idElement = opts.idElement || $target;
			$target.data('dropdownSearchNonDialog', {options: opts});
		});

		$handles.bind('click.dropdownSearchNonDialog', function(event){
			var $input = $(this).prev();
			pluginMethods.open.call($input, {}, event);
		});

		return this;
	},

	open: function(options) {
		var
			$targets = this.not(':disabled'),
			$dropdowns = $(),
			options = options || {};

		$targets.each( function() {
			var
				$input = $(this),
				$positionParent = $input.offsetParent(),
				inputOffset = $input.offset(),
				opts = $.extend(options, $input.data('dropdownSearchNonDialog').options),
				$appendTo = $(opts.appendTo),
				$dropdown;
			
			if (opts.onDrop.call($input, opts) === false) {
				return;
			}

			$dropdown = buildDropdown.call($input, opts.preloadedData, opts)
			positionDropdown($dropdown, $input, $appendTo);

			$input.data('dropdownSearchNonDialog').dropdown = $dropdown;
			$dropdowns = $dropdowns.add($dropdown);

		});

		setTimeout( function(){watchClose($dropdowns)}, 0);

		return this;
	},

	close: function() {
		var $targets = this;

		$targets.each( function() {
			var
				$input = $(this),
				$dropdown = $input.data('dropdownSearchNonDialog').dropdown;

			if( $dropdown ) {
				$dropdown.remove();
				delete $input.data('dropdownSearchNonDialog').dropdown;
			}
		});

		return this;
	},
	
	destroy: function () {
		var $targets = this.filter('.ssm-dropped'),
			$handles = $targets.next(),
			$parents = $targets.parent();
		
		$handles.unbind('.dropdownSearchNonDialog').remove();
		$targets.unwrap().removeClass('ssm-dropped');
		
		return this;
	}

};

var buildDropdown = function(data, opts) {
	var
		$dropdown = $('<div/>',{'class': 'ssm-dropdown ' + opts.dropdownClass || ''}),
		$list = $('<div/>', {'class': 'ssm-dropdown-list'}),
		$appendTo = $(opts.appendTo),
		$titlebar,
		$header,
		$footer;
	
	//urls have dynamic data, even if not searchable
	if (opts.url) {
		$dropdown.addClass('searchable');
	}
	
	//build the header & footer if needed
	if(opts.searchable) {
		$titlebar = $('<div/>', {'class': 'ssm-dropdown-title'});
		$titlebar.append(
			opts.title +
			'<a href="#close" class="ssm-dropdown-close">Close</a>'
		).appendTo($dropdown);

		$header = $('<form/>', {'class': 'ssm-dropdown-search'});
		$header.append(
			'<table class="ssm-dropdown-header">'+
				'<tr class="one ssm-dropdown-labels">'+
				'</tr>'+
				'<tr class="two">'+
				'</tr>'+
			'</table>'
		).appendTo($dropdown);
		
		if (!opts.hideId) {
			$header.find('.one').append('<th class="ssm-dropdown-id">ID<span class="ssm-dropdown-sort-dir"></span></th>');
			$header.find('.two').append('<th class="ssm-dropdown-id"><input name="'+opts.idParam+'" type="text"/></th>');
		}
		if (!opts.hideDescription) {
			$header.find('.one').append('<th class="ssm-dropdown-description">Description<span class="ssm-dropdown-sort-dir"></span></th>');
			$header.find('.two').append(
				'<th class="ssm-dropdown-description">'+
					'<input name="'+opts.descriptionParam+'" type="text"/>'+
					'<a href="#refresh" class="ssm-dropdown-refresh">Refresh</a>'+
				'</th>'
			);
		}

		$footer = $('<div/>', {'class': 'ssm-dropdown-footer'});
		$footer.append(
			'<span class="record_count"></span> of <span class="total_count"></span> <button>More</button>'
		);

		$header.delegate('input', 'keypress', {dropdown: $dropdown, opts: opts}, autoSearchHandler);
		$header.delegate('tr.ssm-dropdown-labels th', 'click', {opts: opts}, sortHandler);
		$footer.find('button')
			.click(function(event){
				event.preventDefault();
				var queryParams = $(this).data('queryParams');
				search($dropdown, opts, queryParams);
			});
	} else {
		
	}

	//build the record listing
	$list.html(
		'<table>'+
			'<tr class="ssm-dropdown-message">'+
				'<td colspan=2>Loading.</td>'+
			'</tr>'+
		'</table>'
	);
	$list.appendTo($dropdown);

	if( $footer ) {
		$dropdown.append($footer);
	}

	init_search($dropdown, opts);

	//Bind event handlers and place dropdown on the page.
	$dropdown
		.delegate('div.ssm-dropdown-list tr', 'click', {opts: opts}, selectRecord)
		.delegate('a.ssm-dropdown-close', 'click', function(event){
			event.preventDefault();
			$dropdown.remove();
		})
		.delegate('a.ssm-dropdown-refresh', 'click', function(event) {
			event.preventDefault();
			search($dropdown, opts);
		})
		.appendTo($appendTo);

	return $dropdown;
}

var autoSearchHandler = function(event) {
	var
		$form = $(this).closest('form'),
		timeout = $form.data('timeout');
	clearTimeout(timeout);
	timeout = setTimeout(function() {
		init_search(event.data.dropdown, event.data.opts);
	}, 500);
	$form.data('timeout', timeout);
}

var sortHandler = function(event) {
	var
		$th = $(this),
		$form = $th.closest('form'),
		opts = event.data.opts;

	//set sort field
	if( $th.hasClass('ssm-dropdown-id') ) {
		$form.data('sortField', opts.idField);
	} else {
		$form.data('sortField', opts.descriptionField);
	}
	
	//Clear other header sort classes
	$th.siblings()
		.removeClass('ascending')
		.removeClass('descending')
	
	if( !$th.hasClass('ascending') ) {
		//make ascending
		$th
			.removeClass('descending')
			.addClass('ascending');
		$form.data('sortDir', opts.ascendingValue);
	} else {
		//make descending
		$th
			.removeClass('ascending')
			.addClass('descending');
		$form.data('sortDir', opts.descendingValue);
	}

	init_search($form.closest('div.ssm-dropdown'), opts);
}

var reset = function($dropdown, opts) {
	var
		$form = $dropdown.find('form.ssm-dropdown-search'),
		queryData = $form.serializeObject(),
		sortField = $form.data('sortField'),
		sortDir = $form.data('sortDir');

	$.extend(queryData, opts.queryParams);
	if (opts.orderParam) {
		queryData[opts.orderParam] = (sortField || '') + ' ' + (sortDir || '');
	} else {
		queryData[opts.sortParam] = sortField || '';
		queryData[opts.dirParam] = sortDir || '';
	}
	queryData[opts.startParam] = 0;
	queryData[opts.countParam] = 25;
	
	//store query params on more button
	$dropdown.find('.ssm-dropdown-footer button').data('queryParams', queryData);

	//clear table results
	$dropdown.find('div.ssm-dropdown-list').html( '<table></table>');
	
	return queryData;
}

var init_search = function ($dropdown, opts) {
	//setup/clear out previous search
	var queryData = reset($dropdown, opts);
	//Load data
	if (opts.preloadedContent) {
		loadData($dropdown, opts, opts.preloadedContent);
	}
	if (opts.url) {
		search($dropdown, opts, queryData);
	}
} 

var search = function($dropdown, opts, queryData) {
	$dropdown.addClass('working');
	if (!opts.searchable) {
		$dropdown.append('<div class="working"></div>');
	}
	getData(queryData, opts, function(results, total_count) {
		if (queryData != undefined ){
			var displayed_count = queryData[opts.startParam] + results.length;
			//update starting parameter, queryData will be submitted again with more button
			queryData[opts.startParam] = displayed_count;
			loadData($dropdown, opts, results);
			updateFooter($dropdown, queryData, displayed_count, total_count);
		}
		$dropdown.removeClass('working');
		$dropdown.find('.working').remove();
	});
}

var loadData = function($dropdown, opts, data) {
	opts.in_filter(data);
	
	var
		$table = $dropdown.find('div.ssm-dropdown-list table');

	$.each(data, function(idx,record) {
		$tr = $('<tr/>',{'class': 'ssm-mouseover1'})
				.data('record',record)
				.appendTo($table);
		
		if (!opts.hideId) {
			$tr
				.append(
					'<td class="ssm-dropdown-id" valign="top">' +
						record[opts.idField] +
					'</td>'
				)
		}
		if (!opts.hideDescription) {
			$tr
				.append(
					'<td class="ssm-dropdown-description" valign="top">' +
						record[opts.descriptionField] +
					'</td>'
				)
		}
	});
}

//TODO: make this so it aborts an existing request
var getData = function(queryData, opts, callback) {
	if( opts.preloadedData ) {
		callback(opts.preloadedData);
	} else if(opts.url) {
		var data = $.extend(queryData, opts.queryParams);

		//TODO: move this dumb-ass case-sensitivity handling to the backend where it belongs.
		data[opts.idParam] = (data[opts.idParam] || '').toUpperCase();
		data[opts.descriptionParam] = (data[opts.descriptionParam] || '').toUpperCase();

		request = $.ajax({
			url: opts.url,
			data: data,
			success: function(data){
				var
					data = data || {},
					results,
					total_count;

				//parse JSON if data is not an object
				if (!$.isPlainObject(data)) {
					data = $.parseJSON(data);
				}
				
				//Parse the response data into a list of records and a count
				//If no field names provided, check the common cases.
				if( opts.resultsField ) {
					results = data[opts.resultsField] || [];
				} else {
					results = data.records || data.results || [];
				}

				if( opts.countField ) {
					reults = data[opts.countField];
				} else {
					total_count = data.querysize || data.total_count || results.length;
				}

				callback(results, total_count);
			}
		});
	}
}

var updateFooter = function($dropdown, moreParams, record_count, total_count) {
	var $footer = $dropdown.find('.ssm-dropdown-footer');
	
	$dropdown.find('.no-records').remove();

	if( $footer.length > 0 ) {
		$footer.find('button').data('queryParams', moreParams);

		$footer.find('.record_count').html( record_count );
		$footer.find('.total_count').html(total_count);
		if( record_count >= total_count ) {
			$footer.find('button').hide()
		} else {
			$footer.find('button').show();
		}
	}
	
	if (record_count === 0) {
		$dropdown.find('.ssm-dropdown-list').append('<div class="no-records">No Records Found</div>');
	}
}


var selectRecord = function(event) {
	var
		opts = event.data.opts,
		$tr = $(this),
		record = $tr.data('record');

	populateElements(opts.idElement, record[opts.idField]);
	populateElements(opts.descriptionElement, record[opts.descriptionField]);
	if (opts.descriptionNext) {
		populateElements(opts.idElement.parent().next(), record[opts.descriptionField]);
	}
	opts.onSelect(record, opts);
	
	$tr.closest('.ssm-dropdown').remove();
}

var populateElements = function(elements, value) {
	var $elements = $(elements);
	$elements.filter('input').val(value).change();
	$elements.not('input').html(value);
}

var positionDropdown = function($dropdown, $positionTo, $appendTo) {
	var
		baseOffset,
		inputOffset = $positionTo.offset(),
		position,
		toEdges,
		appendPositioning = $appendTo.css('position');

	if( !appendPositioning || appendPositioning == 'static' ) {
		baseOffset = $appendTo.offsetParent().offset();
	} else {
		baseOffset = $appendTo.offset();
	}

	position = {
		top: inputOffset.top - baseOffset.top + $positionTo.outerHeight(),
		left: inputOffset.left - baseOffset.left
	}

	toEdges = {
		bottom: $(window).height() - (position.top + $dropdown.outerHeight()),
		right: $(window).width() - (position.left + $dropdown.outerWidth())
	}

//	position.top = (toEdges.bottom > 5) ? position.top : (position.top - (5 - toEdges.bottom));
//	position.left = (toEdges.right > 5) ? position.left : (position.left - (5 - toEdges.right));

	$dropdown.css(position);
}

var watchClose = function($dropdowns) {
	$(document).bind('click.dropdownCancel', function(event) {
		var $clicked = $(event.target);
		//close the dropdown if the click was outside of it
		if( $dropdowns.has($clicked).length == 0 ) {
			$dropdowns.remove();
			//TODO: remove corresponding input data referencing dropdown object?
			$(document).unbind(event); //unbind this handler
		}
	});
}


// Calls the init method above for $(selector).dropdownSearchNonDialog() and $(selector).dropdownSearchNonDialog({...})
// Calls other methods for $(selector).dropdownSearchNonDialog('methodName', arg1, arg2...):w
jQuery.fn.dropdownSearchNonDialog = function(method) {
	if( pluginMethods[method] ) {
		return pluginMethods[method].apply( this, Array.prototype.slice.call(arguments,1) );
	} else if( typeof method === 'object' || !method ) {
		return pluginMethods.init.apply(this, arguments);
	} else {
		$.error('Method ' + method + ' does not exist on jQuery.dropdownSearchNonDialog');
	}
};
	
})(jQuery);
