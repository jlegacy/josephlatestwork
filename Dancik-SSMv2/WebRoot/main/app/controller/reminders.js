/*globals $App */
(function($) {
    $App.Controller('Reminders', {
        // ------------------------------------------------------------
        // -
        // ------------------------------------------------------------
        initialize: function() {
            this.view = $App.View('Reminders');
            this.model = $App.Model('Reminders');
        },
        // ------------------------------------------------------------
        // -- Initialize and render the initial application skeleton
        // ------------------------------------------------------------
        init: function() {
            var _this = this, 
            		target, 
            		data = {};
            
            target = $App.View('Application').get_app_container(),

            // -- Set Reminders as the active tab.
            $App.Fire('setActiveTab',  $('#tab_reminders'));
            
            _this.view.renderLayout(target);
            
            _this.model.getForDate(data,
                function(results) {
                    _this.view.initDayPage(target, results, data);
                },
                function(errors) {
                    $App.Fire("ajax_errors", errors, function(errors) {
                        _this.view.set_error(errors);
                        _this.view.unbusy();
                    });
                }
			);
            
        },
        // ------------------------------------------------------------
        // -- 
        // ------------------------------------------------------------
        day: function(data) {
            var _this = this,
            neededConfig,
            target;
            
            target = $App.View('Application').get_app_container(),
            
            neededConfig = [
            "text_RetrievingRecords"
            ];

            var strDate = new Date();

            switch (data.mode) {
                case 'reset': {
                    // Take current date, derive offsets to get start week/end week day
                    strDate.setDate(strDate.getDate());
	
                    data.ssm_ForDate = ((strDate.getMonth() + 1) + '/' + strDate.getDate() + '/' + (strDate.getFullYear() % 100));
                    data.ssm_ForDateLong = ((strDate.getMonth() + 1) + '/' + strDate.getDate() + '/' + strDate.getFullYear());
                    break;
                }
                case 'forward': {  // Get Current Day if Forward //
                    //get stored begin/end dates//
                    strDate = new Date($('#ssm_reminders_forward_week_link').data('payload').endweek);
                    strDate.setDate(strDate.getDate() + 1);
	
                    data.ssm_ForDate = ((strDate.getMonth() + 1) + '/' + strDate.getDate() + '/' + (strDate.getFullYear() % 100));
                    data.ssm_ForDateLong = ((strDate.getMonth() + 1) + '/' + strDate.getDate() + '/' + strDate.getFullYear());
                    break;
                }
                case 'backward': {  // Get Current Day if Backward //
                    // retrieve stored values for end week //
                    //get stored begin/end dates//

                    strDate = new Date($('#ssm_reminders_backward_week_link').data('payload').startweek);
                    strDate.setDate(strDate.getDate() - 1);
                    data.ssm_ForDate = ((strDate.getMonth() + 1) + '/' + strDate.getDate() + '/' + (strDate.getFullYear() % 100));
                    data.ssm_ForDateLong = ((strDate.getMonth() + 1) + '/' + strDate.getDate() + '/' + strDate.getFullYear());
                    break;
                }
            }

            _this.view.busy();
            _this.model.getForDate(data,
                function(results) {
                    // -- Set Reminders as the active tab.
                    $App.Fire('setActiveTab',  $('#tab_reminders'));
                    _this.view.initDayPage(target, results, data);
                },
                function(errors) {
                    $App.Fire("ajax_errors", errors,
                        function(errors) {
                            _this.view.set_error(errors);
                            _this.view.unbusy();
                        });
                }
                );
        },
       
        // ------------------------------------------------------------
        // -- Initialize and render the initial application skeleton
        // ------------------------------------------------------------
        week: function(data) {

            var _this = this;
            var target;
            var neededConfig;
            target = $App.View('Application').get_app_container(),
            neededConfig = [
            "text_RetrievingRecords"
            ];

            var strDate = new Date();
            var endDate = new Date();
            var currDate = new Date();


            // Get Current Week if Reset //
            switch (data.mode) {
                case 'reset':
                {

                    var weekDayNumber = currDate.getDay();

                    // Take current date, derive offsets to get start week/end week day
                    var startDayNumber = (weekDayNumber * -1);
                    var endDayNumber = (6 - weekDayNumber);

                    strDate.setDate(strDate.getDate() + startDayNumber);
                    endDate.setDate(endDate.getDate() + endDayNumber);

                    _this.setupWeekCalendarDates(data, strDate, endDate);

                    break;
                }
                // Get Current Week if Forward //
                case 'forward':
                {
                    //get stored begin/end dates//

                    strDate = new Date($('#ssm_reminders_backward_week_link').data('payload').startweek);
                    endDate = new Date($('#ssm_reminders_forward_week_link').data('payload').endweek);

                    strDate.setDate(strDate.getDate() + 7);
                    endDate.setDate(endDate.getDate() + 7);

                    _this.setupWeekCalendarDates(data, strDate, endDate);

                    break;

                }
                case 'backward':
                {
                    // retrieve stored values for end week //
                    //get stored begin/end dates//

                    strDate = new Date($('#ssm_reminders_backward_week_link').data('payload').startweek);
                    endDate = new Date($('#ssm_reminders_forward_week_link').data('payload').endweek);

                    strDate.setDate(strDate.getDate() - 7);
                    endDate.setDate(endDate.getDate() - 7);

                    _this.setupWeekCalendarDates(data, strDate, endDate);

                    break;
                }
                
                case 'current':
                {
                    // retrieve stored values for end week //
                    //get stored begin/end dates//

                    strDate = new Date($('#ssm_reminders_backward_week_link').data('payload').startweek);
                    endDate = new Date($('#ssm_reminders_forward_week_link').data('payload').endweek);

                    _this.setupWeekCalendarDates(data, strDate, endDate);

                    break;
                }
                
            }

            _this.view.busy();
            _this.model.getForDateRange(data,
                function(results) {
                    // -- Set Reminders as the active tab.
                    $App.Fire('setActiveTab', $('#tab_reminders'));
            	
                    _this.view.initWeekPage(target, results, data);
                },
                function(errors) {
                    $App.Fire("ajax_errors", errors,
                        function(errors) {
                            _this.view.set_error(errors);
                            _this.view.unbusy();
                        });

                }
                );
        },
        // ------------------------------------------------------------
        // -- Initialize and render the initial application skeleton
        // ------------------------------------------------------------
        month: function(data) {

            var _this = this;
            var target;
            var neededConfig;
            target = $App.View('Application').get_app_container(),
            neededConfig = [
            "text_RetrievingRecords"
            ];

            var strDate = new Date();
            var endDate = new Date();
            var currDate = new Date();
            var wrkDate = new Date();

            // Get Current Week if Reset //
            switch (data.mode) {
                case 'reset':
                { //set all dates relevant to 1st day of month//
                    currDate.setDate(1);
                    strDate.setDate(1);
                    endDate.setDate(1);
                    wrkDate.setDate(1);

                    addMonth = (strDate.getMonth());

                    _this.setupMonthCalendarDates(data, addMonth, strDate, endDate, wrkDate, currDate);

                    break;
                }
                // Get Current Week if Forward //
                case 'forward':
                {

                    //set all dates relevant to 1st day of month//
                    //get stored begin/end dates//
                    strDate = new Date($('#ssm_reminders_forward_week_link').data('payload').currentMonth);
                    endDate = new Date($('#ssm_reminders_forward_week_link').data('payload').currentMonth);
                    wrkDate = new Date($('#ssm_reminders_forward_week_link').data('payload').currentMonth);
                    currDate = new Date($('#ssm_reminders_forward_week_link').data('payload').currentMonth);

                    var addMonth = (strDate.getMonth() + 1);

                    _this.setupMonthCalendarDates(data, addMonth, strDate, endDate, wrkDate, currDate);

                    break;
                }
                case 'backward':
                {
                    // retrieve stored values for end week //
                    //get stored begin/end dates//

                    //set all dates relevant to 1st day of month//
                    //get stored begin/end dates//
                    strDate = new Date($('#ssm_reminders_backward_week_link').data('payload').currentMonth);
                    endDate = new Date($('#ssm_reminders_backward_week_link').data('payload').currentMonth);
                    wrkDate = new Date($('#ssm_reminders_backward_week_link').data('payload').currentMonth);
                    currDate = new Date($('#ssm_reminders_backward_week_link').data('payload').currentMonth);

                    addMonth = (strDate.getMonth() - 1);

                    _this.setupMonthCalendarDates(data, addMonth, strDate, endDate, wrkDate, currDate);

                    break;
                }
                
                case 'current':
                {
                    // retrieve stored values for end week //
                    //get stored begin/end dates//

                    //set all dates relevant to 1st day of month//
                    //get stored begin/end dates//
                    strDate = new Date($('#ssm_reminders_backward_week_link').data('payload').currentMonth);
                    endDate = new Date($('#ssm_reminders_backward_week_link').data('payload').currentMonth);
                    wrkDate = new Date($('#ssm_reminders_backward_week_link').data('payload').currentMonth);
                    currDate = new Date($('#ssm_reminders_backward_week_link').data('payload').currentMonth);

                    addMonth = (strDate.getMonth());

                    _this.setupMonthCalendarDates(data, addMonth, strDate, endDate, wrkDate, currDate);

                    break;
                }
            }

            _this.view.busy();
            _this.model.getForDateRange(data,
                function(results) {
                    // -- Set Reminders as the active tab.
                    $App.Fire('setActiveTab', $('#tab_reminders'));
            	
                    _this.view.initMonthPage(target, results, data);
                },
                function(errors) {
                    $App.Fire("ajax_errors", errors,
                        function(errors) {
                            _this.view.set_error(errors);
                            _this.view.unbusy();
                        });
                }
                );
        },
        // Add Reminder //

        processReminder: function(data) {
            var _this = this,
            target,
            neededConfig;
            
            target = $App.View('Application').get_app_container(),
            
            neededConfig = [
            "text_RetrievingRecords"
            ];

            if (data.updatetype == 'delete') {

                // _this.view.busy();
                _this.model.deleteReminder(data,
                    function(results) {
                        $App.Fire('info_message', 'Delete Successful');
                        _this.view.initUpdatePage(target, results, data);
                        $App.Fire('openReminderDetailUpd', data);

                    },
                    function(errors) {
                        $App.Fire("ajax_errors", errors,
                            function(errors) {
                                _this.view.set_error(errors);
                            //    _this.view.unbusy();
                            });

                    }
                    );

            }

            if (data.updatetype == 'insert') {

                // _this.view.busy();
                _this.model.insertReminder(data,
                    function (results) {
                        delete data.ssm_Brief;
                        delete data.ssm_Full;
                        $App.Fire('info_message', 'Insert Successful');
                        _this.view.initUpdatePage(target, results, data);
                        $App.Fire('openReminderDetailUpd', data);
                    },
                    function(errors) {
                        $App.Fire("ajax_errors", errors,
                            function(errors) {
                                _this.view.set_error(errors);
                            });

                    }
                    );
            }

            if (data.updatetype == 'update') {

                _this.view.busy();
                _this.model.updateReminder(data,
                    function(results) {
                        $App.Fire('info_message', 'Update Successful');
                        _this.view.initUpdatePage(target, results, data);
                        $App.Fire('openReminderDetailUpd', data);
                    },
                    function(errors) {
                        $App.Fire("ajax_errors", errors,
                            function(errors) {
                                _this.view.set_error(errors);
                                _this.view.unbusy();
                            });

                    }
                    );
            }


        },

        // ------------------------------------------------------------
        // -- Initialize and render the initial application skeleton
        // ------------------------------------------------------------
        update: function(data) {

            var _this = this;
            var target;
            var neededConfig;
            target = $App.View('Application').get_app_container(),
            neededConfig = [
            "text_RetrievingRecords"
            ];
            
            _this.view.busy();
            _this.model.getForDate(data,
                function(results) {
                    _this.view.initUpdatePage(target, results, data);
                },
                function(errors) {
                    $App.Fire("ajax_errors", errors,
                        function(errors) {
                            _this.view.set_error(errors);
                            _this.view.unbusy();
                        });

                }
                );
        },

        // ------------------------------------------------------------
        // ------------------------------------------------------------
        // ------------------------------------------------------------
        openReminder: function(data) {
            var target;
            var neededConfig;
            target = $App.View('Application').get_app_container(),
            neededConfig = [
            "text_RetrievingRecords"
            ];


            var _this = this;

            _this.model.getForDate(data,
                function(results) {
                    // -- Set Reminders as the active tab.
                    $App.Fire('setActiveTab', $('#tab_reminders'));
            	
                    _this.view.initUpdatePage(target, results, data);
                },
                function(errors) {
                    $App.Fire("ajax_errors", errors);
                    _this.view.unbusy();
                }
                );
        },
        
        //Setup Month calendar begin/end days, determine if 5 or 6 weeks
        setupMonthCalendarDates: function (data, addMonth, strDate, endDate, wrkDate, currDate) {
            strDate.setMonth(addMonth);
            endDate.setMonth(addMonth);
            wrkDate.setMonth(addMonth);
            currDate.setMonth(addMonth);

            var weekDayNumber = strDate.getDay();
            var currMonth = strDate.getMonth() + 1;

            // Take current date, derive offsets to get start week/end week day
            var startDayNumber = (weekDayNumber * -1);

            // determine how far out to get data, need to display either 5 or 6 weeks worth of data
            // depending in how many days in month
            // 35 days = 5 weeks of data
            // 42 days = 6 weeks of data

            var endDayNumber = 35;
            //look ahead to first day of sixth week, if months match then use week, if not do not pull.
            wrkDate.setDate(wrkDate.getDate() + startDayNumber);
            wrkDate.setDate(wrkDate.getDate() + endDayNumber);
            var wrkDateMonth = wrkDate.getMonth();
            wrkDateMonth = wrkDateMonth + 1;

            //Once determined if using/not using 6th week then pull records for 5 or 6 weeks.
            if (currMonth == wrkDateMonth) {
                endDayNumber = 41;
            } else {
                endDayNumber = 34;
            }

            strDate.setDate(strDate.getDate() + startDayNumber);

            endDate.setDate(endDate.getDate() + (endDayNumber + startDayNumber));

            data.ssm_BeginDateRange = ((strDate.getMonth() + 1) + '/' + strDate.getDate() + '/' + (strDate.getFullYear() % 100));
            data.ssm_EndDateRange = ((endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' + (endDate.getFullYear() % 100));

            data.ssm_BeginDateRangeLong = ((strDate.getMonth() + 1) + '/' + strDate.getDate() + '/' + strDate.getFullYear());
            data.ssm_EndDateRangeLong = ((endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' + endDate.getFullYear());

            data.ssm_current_month_year = (currDate.getMonth() + 1) + '/' + currDate.getDate() + '/' + (currDate.getFullYear());

        },
        
        setupWeekCalendarDates: function (data, strDate, endDate) {

            data.ssm_BeginDateRange = ((strDate.getMonth() + 1) + '/' + strDate.getDate() + '/' + (strDate.getFullYear() % 100));
            data.ssm_EndDateRange = ((endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' + (endDate.getFullYear() % 100));

            data.ssm_BeginDateRangeLong = ((strDate.getMonth() + 1) + '/' + strDate.getDate() + '/' + strDate.getFullYear());
            data.ssm_EndDateRangeLong = ((endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' + endDate.getFullYear());

        }
    });
})(jQuery);