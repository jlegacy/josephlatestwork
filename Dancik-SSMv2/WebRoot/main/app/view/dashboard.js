(function($) {
    $App.View('Dashboard', {
//    	config: $App.Controller('Config').getConfig().config,
    	config : {},
        initialize: function() {
        },
		
        // ------------------------------------------------------------
        // -- Renders the initial application layout
        // ------------------------------------------------------------
        init: function(target, config) {
            var _this = this;

            // -- Initialize and render the initial application skeleton
            $('#ssm_NavigationBar .title').empty();

            _this.config = config;
            target.html($App.Template("dashboard/createNewHeader.ejs").render());
            target.append($App.Template("dashboard/base.ejs").render({ config: _this.config }));

            // -- Establish Date Picker calendar.
            $j('#ssm_Dashboard_Calendar').datepicker({
                dateFormat: 'mm/dd/y',
                showOtherMonths: true,
                selectOtherMonths: true,
                dayNamesShort: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
                onSelect: function(dateText) {
                    $App.Fire('getReminderDayListing_Dashboard', {
                        ssm_ForDate: dateText
                    });
                }
            });

            // -- Fire off procedures...
            $App.Fire('getReminderDayListing_Dashboard');
            $App.Fire('getLastSelections_Dashboard');
            $App.View('Selection').renderStatus();
        },
		
        // ------------------------------------------------------------
        // -- 
        // ------------------------------------------------------------
        getReminderDayListing: function(data) {
             
                var usedDate = new Date(data.date.y, data.date.m - 1, data.date.d),
                nxtDate = new Date(),
                prvDate = new Date(),
                template = $App.Template("dashboard/dayReminders.ejs");

            $("#ssm_Dashboard_DayListing").html(template.render(data));

            // Go ahead and set calendar equal to wanted date
            $('#ssm_Dashboard_Calendar').datepicker('setDate', usedDate);

            // Set next day date and store it
            nxtDate = $('#ssm_Dashboard_Calendar').datepicker('getDate', '+1d');
            nxtDate.setDate(nxtDate.getDate() + 1);

            $('#ssm_reminders_forward_link').data('payload', {
                ssm_ForDate: (nxtDate.getMonth() + 1) + '/' + nxtDate.getDate() + '/' + (nxtDate.getFullYear() % 100)
            });

            // Set previous day date and store it
            prvDate = $('#ssm_Dashboard_Calendar').datepicker('getDate', '-1d');
            prvDate.setDate(prvDate.getDate() - 1);

            $('#ssm_reminders_backward_link').data('payload', {
                ssm_ForDate: (prvDate.getMonth() + 1) + '/' + prvDate.getDate() + '/' + (prvDate.getFullYear() % 100)
            });
            
            //Loop through data and plug in to day divs on page//
            $.each(data.reminders, function (index, keyValue) {
                    var dayNumber = '#' + 1;
                    var link = '<a href=\"#openReminder/' + keyValue.id + '\"' + 'class=\'ssm-link\'' + '>' + keyValue.brief + '</a>';
                    $(dayNumber).append('<div class=\"ssm_dashboardview_count\">' + (index + 1) + '.' + '</div>' + '<div id="ssm_dashboard_detail_link">' + link + '</div>');
                    $(dayNumber).append('<div id="ssm_divider"></div>');
                    $(dayNumber).find('a').data('payload', { ssm_ForDate: keyValue.m + '/' + keyValue.d + '/' + (keyValue.y % 100) });
            });


        },
        // ------------------------------------------------------------
        // -- 
        // ------------------------------------------------------------
        getLastSelections: function(data) {

            var template = $App.Template("dashboard/lastSelections.ejs");
            $("#ssm_Dashboard_SelectionsListing").html(template.render(data));
        },
        // ------------------------------------------------------------
        // -- Render the SSM ID in the heade 
        // ------------------------------------------------------------
        setLastSelectionID: function(){
        	var _this = this,
        	ssm_id = $App.Model('Selection').currentSelectionId,
        	link ="<a href='#openSelection/" 
        		+ ssm_id 
        		+"'>Last Selection#: " 
        		+ ssm_id 
        		+ "</a>";
        	$("#ssm_lastActiveSelection").html(link);
        }
    });
})(jQuery);