
(function($) {
    $App.View('Reminders', {
    	config: $App.Controller('Config').getConfig().config,

        initialize: function () {
        },
        
        // ------------------------------------------------------------
        // -- Renders the initial application layout
        // ------------------------------------------------------------
        renderLayout: function(target) {
//        	if (_this.config.inquiry_mode == "Y"){
//        		 target.html($App.Template("reminders/base.ejs").render());
//            } else {
//            	target.html($App.Template("dashboard/createNewHeader.ejs").render());
//            	 target.append($App.Template("reminders/base.ejs").render());
//            }
        	target.html($App.Template("dashboard/createNewHeader.ejs").render());
       	 	target.append($App.Template("reminders/base.ejs").render());
        },

        // ------------------------------------------------------------
        // -- Function : initDayPage
        // ------------------------------------------------------------
        initDayPage: function(target, results, data) {
            var _this = this;
            _this.results = results;
            _this.data = data;
            var btnActive;

            // get accompanying month data to fill in calendar
            _this.getCalendarDataDay(_this.data);

//            $('#ssm_NavigationBar_Title').html('Reminders');
            target.html($App.Template("dashboard/createNewHeader.ejs").render());
            target.append($App.Template("reminders/day.ejs").render(_this.results, _this.data));
//            if (_this.config.inquiry_mode == "Y"){
//          		 target.html($App.Template($App.Template("reminders/day.ejs").render(_this.results, _this.data));
//              } else {
//              	target.html($App.Template("dashboard/createNewHeader.ejs").render());
//              	 target.append($App.Template($App.Template("reminders/day.ejs").render(_this.results, _this.data));
//              }

            //  Establish Date Picker calendar.
            $('#ssm_Dashboard_Calendar').datepicker({
                dateFormat: 'mm/dd/y',
                showOtherMonths: true,
                selectOtherMonths: true,
                dayNamesShort: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
                onSelect: function(dateText) {
                    $App.Fire('getReminderDayListing_DayView', {
                        ssm_ForDate: dateText
                    });
                }
            });
            // -- Set date in datepicker
            $('#ssm_Dashboard_Calendar').datepicker("setDate", data.ssm_ForDate);

            $("#ssm_reminder_mainPage_links a.mini-calendar").removeClass('calendar-opacity');
            $("#ssm_reminder_mainPage_links a.mini-calendar.calendar-1").addClass('calendar-opacity');

            // Store start week/end week in buttons//
            $('#ssm_reminders_backward_week_link').data('payload', {
                startweek: data.ssm_ForDate
            });

            // Store start week/end week in buttons//
            $('#ssm_reminders_forward_week_link').data('payload', {
                endweek: data.ssm_ForDate
            });

            $('#ssm_weekPage_dateInfo label').text(data.datestring);

            //Loop through data and plug in to day divs on page//
            $.each(results, function(index, value) {
                $.each(value, function(idx, keyvalue) {
                    if (typeof keyvalue.brief != 'undefined') {
//                        var link = '<a href=\"#openReminder/' + keyvalue.id + '\"' + 'class=\'ssm-link\'' + '>' + keyvalue.brief + '</a>';
                    	var link = '<a href="#openReminder/' + keyvalue.id + '"' + 'class="ssm-link">' + keyvalue.brief + '</a>';
                        $('div#ssm_Dayview_left').append('<div class="ssm_weekview_detail_link ssm-day-link">' + (idx + 1) + '.   ' + link + '</div>');
                        $('div#ssm_Dayview_left').append('<div class="ssm_weekview_detail_link ssm-day-link">' + '<div class="notes"><b>Notes:</b> ' + keyvalue.description + '</div></div>');
                        $('div#ssm_Dayview_left').find('a').data('payload', {
                            ssm_ForDate: keyvalue.mdy
                        });
                        $('div#ssm_Dayview_left').append('<div class="ssm_divider"></div>');
                    }
                });
            });

        },

        // ------------------------------------------------------------
        // -- Function : Update Page
        // ------------------------------------------------------------
        initUpdatePage: function(target, results, data) {
            var _this = this,
            	dateTrigger,
            	dateTarget;
            _this.results = results;
            _this.data = data;
            var btnActive;
            
            $App.Fire('setActiveTab', $('#tab_reminders'));
//            $('#ssm_NavigationBar_Title').html('Reminders');
//            
            target.html($App.Template("dashboard/createNewHeader.ejs").render());
            target.append($App.Template("reminders/details.ejs").render(_this.results, _this.data));
            
//            if (_this.config.inquiry_mode == "Y"){
//         		 target.html($App.Template("reminders/details.ejs").render(_this.results, _this.data));
//             } else {
//             	target.html($App.Template("dashboard/createNewHeader.ejs").render());
//             	 target.append($App.Template("reminders/details.ejs").render(_this.results, _this.data));
//             }

            // -- Establish Date Picker calendar.
            $('#ssm_Dashboard_Calendar').datepicker({
                dateFormat: 'mm/dd/y',
                showOtherMonths: true,
                selectOtherMonths: true,
                dayNamesShort: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
                defaultDate : data.ssm_ForDate,
                onSelect: function(dateText) {
                    $App.Fire('openReminderDetailUpd', {
                        ssm_ForDate: dateText
                    });
                }
            });

            dateTrigger = $('#ssm_Dayview_left img.ssm-dates'); 
            dateTarget = dateTrigger.siblings();
            // -- Establish Date Picker calendar.
            dateTarget.datepicker({
                dateFormat: 'mm/dd/y',
                showOtherMonths: true,
                selectOtherMonths: true,
                showButtonPanel: true,
//                closeText : "Close",
//                showOn: "button",
                dayNamesShort: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
                defaultDate : data.ssm_ForDate
            });
            dateTrigger.click(function() {
                $(this).datepicker('show');
            });            

            // -- Set date in datepicker
            $('#ssm_dayview_right_date_display.title').text('Reminders on ' + data.ssm_ForDate);

            $("#ssm_reminder_mainPage_links a.mini-calendar").removeClass('calendar-opacity');
            $("#ssm_reminder_mainPage_links a.mini-calendar.calendar-1").addClass('calendar-opacity');

            // - Loop through data and plug in to day divs on page//
            $.each(results, function(index, value) {
-                $.each(value, function(idx, keyvalue) {
                    if (typeof keyvalue.brief != 'undefined') {
//                        var link = '<a href=\"#openReminder/' + keyvalue.id + '\"' + '>' + (keyvalue.brief.substr(0, 31)) + '</a>';
//                        $('div#ssm_Reminders_Detail_Listing').append('<div class=\"ssm_detailview_count\">' + (idx + 1) + '.' + '</div>' + '<div class="ssm_detailview_link">' + link + '</div>');
                    	 var link = '<a href="#openReminder/' + keyvalue.id + '"' + '>' + (keyvalue.brief.substr(0, 31)) + '</a>';
                         $('div#ssm_Reminders_Detail_Listing').append('<div class="ssm_detailview_count">' + (idx + 1) + '.' + '</div>' + '<div class="ssm_detailview_link">' + link + '</div>');
                        $('div#ssm_Reminders_Detail_Listing').find('a').data('payload', {
                            ssm_ForDate: keyvalue.mdy
                        });
                    }

                    // check for matching id if passed //
                    if (typeof data.ssm_ForId != 'undefined') {
                        if (data.ssm_ForId == keyvalue.id) {
                            $('div#ssm_input_date input').val(keyvalue.mdy);
                            $('div#ssm_input_brief input').val(keyvalue.brief);
                            $('div#ssm_input_description textarea').val(keyvalue.description);
                        }
                    }
                });
            });


            //if no id passed must be insert//
            if (typeof data.ssm_ForId == 'undefined') {
                $('div#ssm_input_date input').val(data.ssm_ForDate);
                $('div#ssm_input_brief input').val(data.ssm_Brief);
                $('div#ssm_input_description textarea').val(data.ssm_Full);
            }

            // check save and delete buttons clicks
            $('input#ssm_save_button').click(function() {

                if (typeof data.ssm_ForId != 'undefined') {
                    data.updatetype = 'update';
                    data.ssm_Id = data.ssm_ForId;
                } else {
                    data.updatetype = 'insert';
                }

                data.ssm_Date = $('div#ssm_input_date').find('input').val();
                data.ssm_Brief = $('div#ssm_input_brief').find('input').val();
                data.ssm_Full = $('div#ssm_input_description').find('textarea').val();

                // Check for html begin and ending tag markers in reminder//
                var testHtml;
                testHtml = $('div#ssm_input_brief').find('input').val();
                if (testHtml.match('[<>]') != null) {
                    $App.Fire("errors", 'Invalid Characters < > in Subject');
                    return;
                }

                testHtml = $('div#ssm_input_description').find('textarea').val();
                if (testHtml.match('[<>]') != null) {
                    $App.Fire("errors", 'Invalid Characters < > in Notes');
                    return;
                }

                $App.Fire('processReminder', data);

                //clear id if exists//
                if (typeof data.ssm_ForId != 'undefined') {
                    delete data.ssm_ForId;
                }
                
                
                //Always blank record fields after update/insert/update//
                data.ssm_ForDate = data.ssm_Date;
                delete data.ssm_Brief;
                delete data.ssm_Full;
                $App.Fire('openReminderDetailUpd', data);
   
            });
            
            // check save and delete buttons clicks
            $('input#ssm_delete_button').click(function() {
                if (typeof data.ssm_ForId != 'undefined') {
                    data.ssm_Id = data.ssm_ForId;
                    data.updatetype = 'delete';
                } else {
                    data.updatetype = 'error';
                }
                // conrim the deletion of the reminder
                $App.Fire('confirm_message',{
    				message: "Are you sure?",
    				title: "Verify Delete Reminder",
    				callback: function(confirmResponse){
    					if(confirmResponse){
    						 $App.Fire('processReminder', data);
                             //deleting for-id allows program to know when a record should be added or updated.  Once a reminder is updated, then
                             //the for id is deleted thus putting program in into insert//
                             if (typeof data.ssm_ForId != 'undefined') {
                                 delete data.ssm_ForId;
                             }
                             $App.Fire('openReminderDetailUpd', data);
    					}
    				}
    			});
  /*              
                var $dialog = $('<div id="reminderPopup"></div>')
                .html('Are you sure?')
                .dialog({
                    autoOpen: false,
                    title: 'Verify Delete Reminder',
                    modal:true,
                    open: function(event, ui) {
                        $('.ui-dialog-titlebar-close').hide();
                    },
                    buttons: {
                        "Yes": {
                            text: "Yes",
                            click: function() { 
                                
                                $App.Fire('processReminder', data);
                                //deleting for-id allows program to know when a record should be added or updated.  Once a reminder is updated, then
                                //the for id is deleted thus putting program in into insert//
                                if (typeof data.ssm_ForId != 'undefined') {
                                    delete data.ssm_ForId;
                                }
                                $App.Fire('openReminderDetailUpd', data);
                                
                                $(this).dialog("close");
                            }
                        },
                        
                        "No": {
                            text: "No",
                            click: function() { 
                               
                                $(this).dialog("close");
                            }
                        
                        }
                    }
                    
                });
               
                $dialog.dialog('open');
*/
               
            });
        },

        // ------------------------------------------------------------
        // -- Function : initWeekPage
        // ------------------------------------------------------------
        initWeekPage: function(target, results, data) {
            var _this = this;
            _this.results = results;
            _this.data = data;
            var btnActive;

            // get accompanying month data to fill in calendar
            _this.getCalendarData(_this.data);

//            $('#ssm_NavigationBar_Title').html('Reminders');
            target.html($App.Template("dashboard/createNewHeader.ejs").render());
            target.append($App.Template("reminders/week.ejs").render(_this.results, _this.data));
            
            $("#ssm_reminder_mainPage_links a.mini-calendar").removeClass('calendar-opacity');
            $("#ssm_reminder_mainPage_links a.mini-calendar.calendar-7").addClass('calendar-opacity');

            // Store start week/end week in buttons//
            $('#ssm_reminders_backward_week_link').data('payload', {
                startweek: data.ssm_BeginDateRangeLong
            });

            // Store start week/end week in buttons//
            $('#ssm_reminders_forward_week_link').data('payload', {
                endweek: data.ssm_EndDateRangeLong
            });

            $('#ssm_weekPage_dateInfo label').text(data.weekDatestring);

            //append add date icons to calendar
            _this.appendAddIcons(data);

            //append day numbers to calendar
            _this.appendDayNumbers(data);

            //create hovers over add icons
            //  _this.setupHoverOnAddIcons(data);

            //append reminders to calendar//
            $.each(results, function(index, value) {
                $.each(value, function(idx, keyvalue) {
                    var dayNumber = "#" + parseInt(keyvalue.m, 10) + '-' + parseInt(keyvalue.d, 10),
                    link = '<a href="#openReminder/' + keyvalue.id + '" class="ssm-link">' + keyvalue.brief + '</a>';
                    $(dayNumber).append("<div class='ssm_weekview_detail_link'>" + link + "</div>");
                    $(dayNumber).append('<div class="ssm_divider"></div>');
                    $(dayNumber).find('a').data('payload', {
                        ssm_ForDate: keyvalue.m + '/' + keyvalue.d + '/' + (keyvalue.y % 100)
                    });
                });
            });

            // dynamically alter heights on week table day columns based how many
            // reminders.  Since used float left had issues getting css styles to
            // display correctly.
            // determine height of max data column and set css min-height accordingly
            // if overflow

            // loop throught get max div size and set all others to same size //
            var maxSize = 0;
            $('.ssm_weekview_data_column').each(function() {
                if (maxSize < $(this).height()) {
                    maxSize = $(this).height();
                }
            });
            // add additional padding to bottom of week view table
            maxSize = maxSize + 30;
            $('.ssm_weekview_data_column').each(function() {
                $(this).height(maxSize);
            });

            // initially hide all add icons
            //   $('div#ssm_add_hover').hide();

            // Show/Unshow Weekend columns
            _this.setWeekendView(_this);

            $('input.ssm_show_weekend').click(function() {
                if ($('input.ssm_show_weekend').attr('checked')) {
                    _this.showWeek = 'Y';
                } else {
                    _this.showWeek = 'N';
                }

                data.mode = 'current';
                $App.Fire('openRemindersWeek', data);
            });

        },

        setupHoverOnAddIcons: function (data) {
            $.each(data.weekdayDay, function (index, value) {
                var daynumber = '#' + value;
                $(daynumber).hover(function () {
                    $(this).find('div#ssm_add_hover').show();
                },
                function () {
                    $(this).find('div#ssm_add_hover').hide();
                });
            });

        },

        appendDayNumbers: function (data) {
            $.each(data.weekdayDay, function (index, value) {
//                var link = '<a href=\"#openRemindersDay/' + data.weekdayNum[index] + '\"' + 'class=\'ssm-link\'' + '>' + data.weekdayNum[index] + '</a>';
            	var link = '<a href="#openRemindersDay/' + data.weekdayNum[index] + '" class="ssm-link">' + data.weekdayNum[index] + '</a>',
                dayNumber = '#' + value;
                $(dayNumber).append('<div id="ssm_weekview_detail">' + link + '</div>');
                $(dayNumber).find('a').data('payload', {
                    ssm_ForDate: data.weekdayDate[index]
                });

            });

        },

        appendAddIcons: function (data) {
            $.each(data.weekdayDate, function (index, value) {
//                var link = '<div id=\"ssm_add_hover\"> <a href=\"#openReminderDetailUpd/' + '\"' + 'class=\'ssm_week_add_icon\'' + '>' + '</a></div>';
            	var link = '<div id="ssm_add_hover"><a href="#openReminderDetailUpd/" class="ssm_week_add_icon"></a></div>',
                dayNumber = '#ssm_week_add_reminder' + data.weekdayDay[index];
                $(dayNumber).append(link);
                $(dayNumber).find('a').data('payload', {
                    ssm_ForDate: value
                });
            });
        },

        setWeekendView: function (_this) {

            //Set show weekends checkbox//
            //Box defaults to yes
            if (_this.showWeek == null || _this.showWeek == 'Y') {
                $('input.ssm_show_weekend').attr('checked', true);
                _this.showWeek = 'Y';
            }

            if (_this.showWeek == 'Y') {
                $('div#ssm_dynamic_resize').find('.weekend').show();
                $('div#ssm_lower_body').find('.ssm_weekView_dayName').width(120);
                $('.ssm_weekview_data_column').width(135);
                $("#Saturday-hdr").css({borderRight:"0px solid #000", width:"124px"});
                $("#Saturday-dtl .ssm_weekview_data_column, #Saturday-dtl .ssm_weekview_data_column .ssm_weekView_day ").css({borderRight:"0px solid #000", width:"139px"});
//                $('div#ssm_header_line').find('.ssm_top_line').width(135);
//                $('div#Saturday-lin').css('border-top-right-radius', '4px');
//                $('div#Sunday-lin').css('border-top-left-radius', '4px');

            } else {
                $('div#ssm_dynamic_resize').find('.weekend').hide();
                $('div#ssm_lower_body').find('.ssm_weekView_dayName').width(174);
                $('.ssm_weekview_data_column').width(189);
                $("#Friday-hdr").css({borderRight:"0px solid #000", width:"179px"});
                $("#Friday-dtl .ssm_weekview_data_column, #Friday-dtl .ssm_weekview_data_column .ssm_weekView_day ").css({borderRight:"0px solid #000", width:"195px"});
                $("#ssm_Monthview_Section .ssm_detailview_link").css({width:"173px"});
//                $('div#ssm_header_line').find('.ssm_top_line').width(189);
//                $('div#Friday-lin').css('border-top-right-radius', '4px');
//                $('div#Monday-lin').css('border-top-left-radius', '4px');
            }

        },


        // ------------------------------------------------------------
        // -- Function : initMonthPage
        // ------------------------------------------------------------
        initMonthPage: function(target, results, data) {
            var _this = this;
            _this.results = results;
            _this.data = data;
            var btnActive;

            // get accompanying month data to fill in calendar
            _this.getCalendarData(_this.data);

//            $('#ssm_NavigationBar_Title').html('Reminders');
            target.html($App.Template("dashboard/createNewHeader.ejs").render());
            target.append($App.Template("reminders/month.ejs").render(_this.results, _this.data));
//           if (_this.config.inquiry_mode == "Y"){
//        	   	target.html($App.Template("reminders/month.ejs").render(_this.results, _this.data));
//           } else {
//        	   	target.html($App.Template("dashboard/createNewHeader.ejs").render());
//           	 	target.append($App.Template("reminders/month.ejs").render(_this.results, _this.data));
//           }
            $("#ssm_reminder_mainPage_links a.mini-calendar").removeClass('calendar-opacity');
            $("#ssm_reminder_mainPage_links a.mini-calendar.calendar-31").addClass('calendar-opacity');

            // Store start week/end week in buttons//
            $('#ssm_reminders_backward_week_link').data('payload', {
                currentMonth: data.ssm_current_month_year
            });

            // Store start week/end week in buttons//
            $('#ssm_reminders_forward_week_link').data('payload', {
                currentMonth: data.ssm_current_month_year
            });

            $('#ssm_weekPage_dateInfo label').text(data.monthDatestring);

            //append add date icons to calendar
            _this.appendAddIcons(data);

            //append day numbers to calendar
            _this.appendDayNumbers(data);

            //create hovers over add icons
            //   _this.setupHoverOnAddIcons(data);

            //append reminder data to calendar//
            var saveDayNumber = new Array();
            $.each(results, function(index, value) {
                $.each(value, function(idx, keyvalue) {
                	 var dayNumber = "#" + parseInt(keyvalue.m, 10) + '-' + parseInt(keyvalue.d, 10);

                    // if processed as a link because more than three entries do not process again
                    if ($.inArray(dayNumber, saveDayNumber) != -1) {
                        return true;
                    }

                    var count = $(dayNumber).children("div#ssm_monthview_detail_link").size();

                    if (count == 3) {
//                        var link = '<a href=\"#openRemindersDay/' + keyvalue.id + '\"' + 'class=\'extended\'' + '></a>';
                    	var link = '<a href="#openRemindersDay/' + keyvalue.id + '" class="extended"></a>';
                        $(dayNumber).append('<div id="ssm_monthview_link">' + link + '</div>');
                        saveDayNumber[idx] = dayNumber;
                        $(dayNumber).find('a').data('payload', {
                            ssm_ForDate: keyvalue.mdy
                        });
                        return true;
                    }

                    //only allow 3 divs in calendar
//                    link = '<a href=\"#openReminder/' + keyvalue.id + '\"' + 'class=\'ssm-link\'' + '>' + (keyvalue.brief).substring(0, 20) + '</a>';
                    link = '<a href="#openReminder/' + keyvalue.id + '" class="ssm_detailview_link">' + (keyvalue.brief).substring(0, 20) + '</a>';
                    $(dayNumber).append('<div id="ssm_monthview_detail_link">' + link + '</div>');
                    $(dayNumber).find('a').data('payload', {
                        ssm_ForDate: keyvalue.mdy
                    });
                });
            });

            //loop through and color backgrounds based on dates, current day - yellow, non-month day - grey
            $.each(data.weekdayDay, function(index, value) {

                var today = new Date();
                var todayMonthDay = '#' + (today.getMonth() + 1) + '-' + today.getDate();

                var currDate = new Date(data.ssm_current_month_year);
                var currMonth = '#' + (currDate.getMonth() + 1) + '-';

                var dayNumber = '#' + value;
                //set current day to special background//
                if (todayMonthDay == dayNumber) {
                    $(dayNumber).parent('div.ssm_day_container').css('background-color', '#ffffcc');
                    $(dayNumber).find('div#ssm_monthview_detail_link').css('background-color', '#ffffcc');
                    $(dayNumber).find('div#ssm_weekview_detail').css('background-color', '#ffffcc').css('background-image', 'none');
                    $(dayNumber).find('div#ssm_monthview_link').css('background-color', '#ffffcc');
                }

                //set days not in current month special background//
                if (dayNumber.search(currMonth) == -1) {
                    $(dayNumber).parent('div.ssm_day_container').css('background-color', '#f4f4f4');
                    $(dayNumber).find('div#ssm_monthview_detail_link').css('background-color', '#f4f4f4');
                    $(dayNumber).find('div#ssm_weekview_detail').css('background-color', '#f4f4f4').css('background-image', 'none');
                    $(dayNumber).find('div#ssm_monthview_link').css('background-color', '#f4f4f4');
                    $(dayNumber).find('a').css('color', '#999');
                }
            });

            // initially hide all add icons
            //    $('div#ssm_add_hover').hide();

            //Show/not-show 6th week//
            // if days pulled only for 5 weeks then hide 6th week in calendar
            if (data.daysCount <= 35) {
                $('div#week6').hide();
            }

            // Show/Unshow Weekend columns
            _this.setWeekendView(_this);

            // Fire to show/not-show weekend columns //
            $('input.ssm_show_weekend').click(function() {
                if ($('input.ssm_show_weekend').attr('checked')) {
                    _this.showWeek = 'Y';
                } else {
                    _this.showWeek = 'N';
                }
                data.mode = 'current';
                $App.Fire('openRemindersMonth', data);
            });

        },
        // Return all  accompanying information to fill month calendar
        getCalendarData: function (data) {

            //Create additional data for all days of week regardless if any reminders exists//
            var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

            var weekdayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
            "Saturday"];

            var strDate = new Date(data.ssm_BeginDateRangeLong);
            var endDate = new Date(data.ssm_EndDateRangeLong);
            var monthDate = new Date(data.ssm_current_month_year);

            // Get date difference between two dates and create additional information
            var days = Date.UTC((endDate.getFullYear()), endDate.getMonth(), endDate.getDate(), 0, 0, 0)
            - Date.UTC((strDate.getFullYear()), strDate.getMonth(), strDate.getDate(), 0, 0, 0);

            days = (days / 1000 / 60 / 60 / 24) + 1;

            var weekdayDay = new Array(days);
            var weekdayDate = new Array(days);
            var weekdayNum = new Array(days);

            //Show correct date string in view//
            data.monthDatestring = monthNames[monthDate.getMonth()] + ' ' + monthDate.getFullYear();

            //Show correct date string in view//
            data.weekDatestring = monthNames[strDate.getMonth()] + ' ' + strDate.getDate() + ', ' + strDate.getFullYear() + ' - ' + monthNames[endDate.getMonth()] + ' ' + endDate.getDate() + ', ' + endDate.getFullYear();

            //Put Calendar Days and Dates into an Array for Easy Retrieval in View//
            for (var i = 0; i < days; i++) {
                weekdayDay[i] = (strDate.getMonth() + 1) + '-' + strDate.getDate();
                weekdayNum[i] = (strDate.getDate());

                weekdayDate[i] = ('0' + (strDate.getMonth() + 1)).slice(-2) + '/'
                + ('0' + strDate.getDate()).slice(-2) + '/'
                + (strDate.getFullYear() % 100);

                strDate.setDate(strDate.getDate() + 1);
            }

            //Set Day Name//
            data.weekdayName = weekdayName;
            //Set Day Unique Div Value//
            data.weekdayDay = weekdayDay;
            //Set Date Values//
            data.weekdayDate = weekdayDate;
            //Set VisiDay Value//
            data.weekdayNum = weekdayNum;
            data.daysCount = days;
        },

        getCalendarDataDay: function (data) {

            // -- Check for 19xx and convert to 20xx if needed, depends on on browser.  
        	// -- Noticed that firefox and chrome return different centurys chrome would return 20xx while firefox/ie would return 19xx.
            var strDate = new Date(data.ssm_ForDate);
            if (strDate.getFullYear() < 2000) {
                var fullyear = (strDate.getFullYear() + 100);
                strDate.setFullYear(fullyear);
            }

            var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

            var weekdayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
            "Saturday"];

            //Show correct date string in view//
            data.datestring = weekdayName[strDate.getDay()] + ', ' + monthNames[strDate.getMonth()] + ' ' + strDate.getDate() + ', ' + strDate.getFullYear();
        },




        // ------------------------------------------------------------
        // -- Function : loadMainPage
        // ------------------------------------------------------------
        loadMainPage: function() {
            var _this = this;
        },

        // ------------------------------------------------------------
        // -- Function : busy
        // ------------------------------------------------------------
        busy: function() {
            $("#ssm_Reminders").find(".data-table").addClass("loading");
        },
        // ------------------------------------------------------------
        // -- Function : unbusy
        // ------------------------------------------------------------
        unbusy: function() {
            $("#ssm_Reminders").find(".data-table").removeClass("loading");
        }
    });
})(jQuery);