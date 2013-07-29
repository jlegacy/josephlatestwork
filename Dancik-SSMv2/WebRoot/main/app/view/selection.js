(function ($) {
     $App.View('Selection', {
          inititialize: function () {
          },
          config: $App.Controller('Config').getConfig().config,
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          init: function (target, data) {
               var _this = this;

               target.html($App.Template("selection/initSelection.ejs").render(data));

               // -- Clear 'selected' tabs...
               $App.Fire('setActiveTab');

               // -- Preset the "Header" tab, as selected...
               $('#ssm_SelectionTabs').tabs();
               $("#ssm_SelectionTabs").tabs("select", "ssm_SelectionHeader");
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          createSelection: function (data) {
               $App.Fire('info_message', 'Selection #' + data.selection.new_id + ' was created');
               $App.Fire('openSelection', {
                    ssm_id: data.selection.new_id
               });
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          renderSelection: function (target, results, data) {
               var _this = this,
                       ssmStatus;

               $.extend(results, {
                    ssm_id: $App.Model('Selection').currentSelectionId
               });

               // -- Render Title...
               $('#ssm_Selection .header-reload').html($App.Template("selection/heading.ejs").render(results));

               // -- Set up 'Status', with an onChange delegate...
               ssmStatus = $('#ssm_status');
               ssmStatus
                       .data('payload', {
                    priorValue: $('#ssm_status').val()
               })
                       .bind("change", function () {
                    var newValue, priorValue, params = {};
                    newValue = ssmStatus.val();
                    priorValue = ssmStatus.data('payload').priorValue || '';
                    // -- Check to see if value has changed...
                    if (newValue !== priorValue) {
                         params.ssm_SelectionId = $App.Model('Selection').currentSelectionId;
                         params.ssm_StatusId = newValue;

                         $App.Fire('setSelectionStatus', params);
                         ssmStatus.data('payload', {
                              priorValue: newValue
                         });
                    }
               })
                       .find('option')
                       .each(function () {
                    if ($(this).prop('selected') == true) {
                         target.find("#ssm_activeStatus").html($(this).text());
                    }
               });
               // -----------------------
               // restrict options in the status dropdown based on the config
               target.find("#ssm_statusOptions li").each(function () {
                    switch ($(this).attr('name'))
                    {
                         case "O":
                              (_this.config.allow_reopening_selections) ? "" : $(this).remove();
                              break;
                         case "F":
                              (_this.config.allow_finalizing_selections) ? "" : $(this).remove();
                              break;
                         case "C":
                              (_this.config.allow_closing_selections) ? "" : $(this).remove();
                              break;
                         case "L":
                              (_this.config.allow_lost_selections) ? "" : $(this).remove();
                              break;
                    }
               });

            
            // -- Render Customer Information...
            $('#ssm_Selection_CustInfo').html($App.Template("selection/cust-info.ejs").render(results));
            $('#ssm_Selection_CustInfo .cust-info .editable').each (function(index){
                var tagName, element = $(this);	
            	
                // -- Set the 'payload' with the current value, for later testing...
                element.data('payload', {
                    priorValue: element.val()
                });
            	
                tagName = element.prop("tagName");	
            	
                if ( tagName.toLowerCase() === 'input' ) {
                    element.bind("blur", function() {
                        _this._setCustomerField($(this), results.header.rtl_id);
                     });
                } else if (tagName.toLowerCase() === 'select') {
                         element.bind("change", function () {
                              _this._setCustomerField($(this), results.header.rtl_id);
                         });
                    }
               });


               // -- Enable Blurs on Alternate Address
               $('#ssm_Selection_CustInfo .alt-addr .editable').each(function (index) {
                   var tagName, element = $(this);	

                    // -- Set the 'payload' with the current value, for later testing...
                    element.data('payload', {
                         priorValue: element.val()
                    });
                	
                    tagName = element.prop("tagName");	

                    if ( tagName.toLowerCase() === 'input' ) {
                        element.bind("blur", function() {
                            _this._setAltAddrField($(this));
                         });
                    } else if (tagName.toLowerCase() === 'select') {
                         element.bind("change", function () {
                              _this._setAltAddrField($(this));
                         });
                    }
               });

              
               // -- Fire off remaining loads...
               $App.Fire('loadSelectionNotes', data);
               $App.Fire('loadSelectionDates', data);
               $App.Fire('loadSelectionReferences', data);
               $App.Fire('loadSelectionJobInfo', data);
               $App.Fire('loadSelectionNotepad', data);
               $App.Fire('loadSelectionLogs', data);
               $App.Fire('loadSelectionItems', data);

               // -- Load watermarks
               $('#ssm_Selection_CustomerFirstName').watermark("First Name");
               $('#ssm_Selection_CustomerLastName').watermark("Last Name");
               $('#ssm_AltAddrFirstName').watermark("First Name");
               $('#ssm_AltAddrLastName').watermark("Last Name");

               // -- Auto-Tabs
               $('#ssm_Selection_CustomerZip5, #ssm_Selection_CustomerZip4, #ssm_Selection_CustomerPhoneAC, #ssm_Selection_CustomerPhone').autotab_magic();
               


               // check user restrictions and render status accordingly
               if (_this.config.inquiry_mode == "Y") {
                    $App.View('Selection').renderStatus("F");
               } else {
                    // -- Check the status of the selection to determine how to view...
                    _this.renderStatus(results.header.sts_id);
               }
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          statusOptions : function(){
          	var _this = this,
          	container= $('.header-reload'),
          	ssmStatus = container.find('#ssm_status');
          	
              // show or hide options
          	container.find("#ssm_statusOptions").toggle();
//              container.find('#ssm_statusOptions').focus();
              
              // close the dropdown if anything is clicked
//              container.on('blur', "#ssm_statusOptions", function(){
//              	$(this).hide();
//              });
              // handle the click event for the pseudo dropdown item
              container.on('click', "#ssm_statusOptions li", function(){
              	var selectedValue = $(this).attr('name'),
              	selectedText = $(this).text();
              	
              	// set the value of the real dropdown to the clicked item
              	ssmStatus.find("option")
              		.each(function(){
  	            		if($(this).val() == selectedValue){
  	            			$(this).prop('selected', true);
  	            		}
  	            	});
              	$(this).closest("#ssm_statusOptions")
              		.hide()
              		.closest(".ssm-styled-select")
              		.find("#ssm_activeStatus")
              		.html(selectedText);
              	ssmStatus.trigger("change")
              		
              	
              });
              //place global document mouseup handler, if not over expected element then close drop down search
              $(document).mouseup(function () {
                   if ($(this).attr('id') !== 'ssm_statusOptions')
                   {
                        container.find("#ssm_statusOptions").hide();
                   };
              });
          	
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          setBusy_References: function () {
               $('#ssm_Selection_References').html($App.Template("application/busy.ejs").render({"msg": "Loading results"}));
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          renderSelectionReferences: function (results, data) {
               var _this = this;

               $('#ssm_Selection_References').html($App.Template("selection/references.ejs").render(results));
               $('#ssm_Selection_References .editable').each(function (index) {
                    var tagName, element = $(this);

                    // -- Set the 'payload' with the current value, for later testing...
                    element.data('payload', {
                         priorValue: element.val()
                    });
                    element.bind("change", function () {
                         var priorValue,
                                 newValue,
                                 regex,
                                 hdrid,
                                 params = {};

                         newValue = element.val();
                         priorValue = element.data('payload').priorValue || '';
                         // -- Check to see if value has changed...
                         if (newValue !== priorValue) {

                              regex = /^hdrid_(.*)$/;   // -- Split out name 'hdrid_1234' to ['hdrid_'], [1234]

                              hdrid = element.attr("name").match(regex);

                              params.ssm_SelectionId = $App.Model('Selection').currentSelectionId;
                              params.ssm_ReferenceId = hdrid[1];
                              params.ssm_PersonId = newValue;

                              $App.Fire('setSelectionReference', params);
                              element.data('payload', {
                                   priorValue: newValue
                              });
                         }

                    });
               });
               // check user restrictions and render status accordingly
               if (_this.config.inquiry_mode == "Y") {
                    $App.View('Selection').renderStatus("F");
               } else {
                    // -- Check the status of the selection to determine how to view...
                    _this.renderStatus();
               }

          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          renderSelectionDates: function (results, data) {
               var _this = this;

               // -- Render the template for the date fields...	
               $('#ssm_Selection_Dates').html($App.Template("selection/dates.ejs").render(results));

               // -- Set deligates and payloads for all editable fields...
               $('#ssm_Selection_Dates .editable').each(function (index) {
                    var tagName, element = $(this);

                    // -- Set the 'payload' with the current value, for later testing...
                    element.data('payload', {
                         priorValue: element.val()
                    });
                    element.bind("blur", function () {
                         _this._setDateData($(this));
                    });
               });

               $('#ssm_Selection_Dates .ssm-dates').each(function () {
                    var target,
                            params = {};

                    target = $(this).siblings();

                    $(this).click(function (e) {
                         if (!$(target).prop('disabled')) {
                              $(this).datepicker("show");
                         }
                    })

                    // -- Establish Date Picker calendar.
                    $(target).datepicker({
                         dateFormat: 'mm/dd/y',
                         showOtherMonths: true,
                         selectOtherMonths: true,
                         showButtonPanel: true,
                         closeText: "Close",
                         showOn: "button",
                         dayNamesShort: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
                         beforeShow: function (input) {
                              $(this).attr('readonly', true);
                         },
                         onClose: function (dateText) {
                              $(this).attr('readonly', false);
                         },
                         onSelect: function (dateText) {
                              _this._setDateData($(this));
                         }
                    })

               });

               // check user restrictions and render status accordingly
               if (_this.config.inquiry_mode == "Y") {
                    $App.View('Selection').renderStatus("F");
               } else {
                    // -- Check the status of the selection to determine how to view...
                    _this.renderStatus();
               }
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          renderSelectionNotes: function (results, data) {
               var _this = this;
               $('#ssm_selection_notes_busy .ssm_busy').hide();
               $('#ssm_selection_notes_textarea').show();


               $('#ssm_SelectionNotes textarea').html(results.notes.notes);


               // -- Set up "blur" on Notes...
               element = $('#ssm_SelectionNotes textarea');
               // -- Set the 'payload' with the current value, for later testing...
               element.data('payload', {
                    priorValue: element.val()
               });

               element.unbind("blur");
               element.bind("blur", function (o) {
                    var priorValue,
                            newValue,
                            params = {};

                    newValue = element.val();
                    priorValue = element.data('payload').priorValue || '';
                    // -- Check to see if value has changed...
                    if (newValue !== priorValue) {
                         params.ssm_SelectionId = $App.Model('Selection').currentSelectionId;
                         params.ssm_Data = newValue;

                         $App.Fire('setSelectionNotes', params);
                         element.data('payload', {
                              priorValue: newValue
                         });
                    }
               });
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          setBusy_JobInfo: function () {
               $('#ssm_Selection_JobInfo').html($App.Template("application/busy.ejs").render({"msg": "Loading results"}));
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          renderSelectionJobInfo: function (results, data) {
               var _this = this;

               $('#ssm_Selection_JobInfo').html($App.Template("selection/job-info.ejs").render(results));
               $('#ssm_Selection_JobInfo .editable').each(function (index) {
                    var tagName, element = $(this);
                    var type;

                    // -- Set the 'payload' with the current value, for later testing...
                    element.data('payload', {
                         priorValue: element.val()
                    });

                    tagName = element.prop("tagName");

                    if (tagName.toLowerCase() === 'input') {
                         element.bind("blur", function () {
                              _this._setJobInfoData($(this), tagName);
                         });
                    } else if (tagName.toLowerCase() === 'select') {
                         element.bind("change", function () {
                              _this._setJobInfoData($(this), tagName);
                         });
                    }
               });

               // check user restrictions and render status accordingly
               if (_this.config.inquiry_mode == "Y") {
                    $App.View('Selection').renderStatus("F");
               } else {
                    // -- Check the status of the selection to determine how to view...
                    _this.renderStatus();
               }
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          renderSelectionLogs: function (results, data) {
               var _this = this;

               $.extend(results, data);

               $('#ssm_Selection_Logs').html($App.Template("selection/logs.ejs").render(results));

               // -- Check the status of the selection to determine how to view...
               // check user restrictions and render status accordingly
               if (_this.config.inquiry_mode == "Y") {
                    $App.View('Selection').renderStatus("F");
               } else {
                    // -- Check the status of the selection to determine how to view...
                    _this.renderStatus();
               }
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          setBusy_Logs: function () {
               $('#ssm_Selection_Logs').html($App.Template("application/busy.ejs").render({"msg": "Loading results"}));
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          renderSelectionNotepad: function (results, data) {
               //
               var _this = this, container;

               $.extend(results, {
                    ssm_SelectionId: $App.Model('Selection').currentSelectionId
               });

               container = $($App.Template("selection/notepads.ejs").render(results));

               $(results.notepads).each(function (index, entry) {
                    var isEven = ((index % 2) == 1) ? true : false,
                            cssClassname = (isEven) ? 'even' : '',
                            rowContainer;

                    $.extend(entry, {klassname: cssClassname});
                    entry.data = _this.checkForLink(entry.data);
                    rowContainer = $($App.Template("selection/notepad-record.ejs").render(entry));
                    container.find(".data-collection").append(rowContainer);
               });

               $('#ssm_Selection_NotePad').html(container);



               // check user restrictions and render status accordingly
               if (_this.config.inquiry_mode == "Y") {
                    $App.View('Selection').renderStatus("F");
               } else {
                    // -- Check the status of the selection to determine how to view...
                    _this.renderStatus();
               }
          },
          checkForLink: function (text) {
               var _this = this,
                       matchArray = [],
                       tempMatch = '',
                       regEx = /(http(s)?\:\/\/)?(www\.)?[A-Za-z\-\_\.0-9]+\.(com|net|org|gov|edu)\/?/g;

               if (regEx.test(text)) {
                    matchArray = text.match(regEx);
                    $(matchArray).each(function (index, match) {
                         tempMatch = match;

                         // If it starts with www.
                         tempMatch = (/^www\./.test(match)) ? 'http://' + match : match;

                         //if it doesnt start with either www. or http://
                         tempMatch = (!(/^www\./.test(match)) && !(/^http\:\/\//.test(match))) ? 'http://' + match : tempMatch;

                         realLink = '<a href="' + tempMatch + '" target="_blank">' + match + '</a>';
                         text = text.replace(match, realLink);
                    });
               }
               return text;
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          _setDateData: function (element) {
               var priorValue,
                       newValue,
                       regex,
                       hdrid,
                       params = {},
                       _this = this;

               newValue = element.val();
               priorValue = element.data('payload').priorValue || '';
               // -- Check to see if value has changed...
               if (newValue !== priorValue) {

                    regex = /^hdrid_(.*)$/;   // -- Split out name 'hdrid_1234' to ['hdrid_'], [1234]
                    hdrid = element.attr("name").match(regex);

                    params.ssm_SelectionId = $App.Model('Selection').currentSelectionId;
                    params.ssm_DateTypeId = hdrid[1];
                    params.ssm_Date = newValue;

                    $App.Fire('setSelectionDate', params);
                    element.data('payload', {
                         priorValue: newValue
                    });
               }
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          _setJobInfoData: function (element, tagName) {
               var priorValue,
                       newValue,
                       regex,
                       hdrid,
                       params = {},
                       _this = this;

               newValue = element.val();
               priorValue = element.data('payload').priorValue || '';
               // -- Check to see if value has changed...
               if (newValue !== priorValue) {

                    regex = /^hdrid_(.*)$/;   // -- Split out name 'hdrid_1234' to ['hdrid_'], [1234]
                    hdrid = element.attr("name").match(regex);

                    params.ssm_SelectionId = $App.Model('Selection').currentSelectionId;
                    params.ssm_JobInfoId = hdrid[1];

                    // determine type if text from input field or id from dropdown//
                    switch (tagName) {
                         case 'INPUT':
                              {
                                   params.ssm_Id = '';
                                   params.ssm_Value = newValue;
                                   break;
                              }
                         case 'SELECT':
                              {
                                   params.ssm_Id = newValue;
                                   params.ssm_Value = '';
                                   break;
                              }
                    }

                    $App.Fire('setSelectionJobInfo', params);
                    element.data('payload', {
                         priorValue: newValue
                    });
               }
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          _setCustomerField: function (element, id) {
               var priorValue,
                       newValue,
                       params = {};

               newValue = element.val();
               priorValue = element.data('payload').priorValue || '';
               // -- Check to see if value has changed...
               if (newValue !== priorValue) {
                    params.ssm_id = id;
                    params.ssm_Name = element.attr("name");
                    params.ssm_Data = newValue;

                    $App.Fire('setSelectionCustomerField', params);
                    element.data('payload', {
                         priorValue: newValue
                    });


                    // -- Alter the Title for Name if it has been adjusted...
                    if ($.inArray(params.ssm_Name, ['firstname', 'lastname']) > -1) {
                         $('#ssm_SelectionCustomerName').html($('#ssm_Selection_CustomerFirstName').val().toUpperCase() + ' ' + $('#ssm_Selection_CustomerLastName').val().toUpperCase());
                    }
               }
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          _setAltAddrField: function (element) {
              var priorValue,
	              newValue,
	              params = {};
	
		      newValue = element.val();
		      priorValue = element.data('payload').priorValue || '';
		      // -- Check to see if value has changed...
		      if (newValue !== priorValue) {
		           params.ssm_SelectionId = $App.Model('Selection').currentSelectionId;
		           params.ssm_Name = element.attr("name");
		           params.ssm_Data = newValue;
		
		           $App.Fire('setSelectionAltAddr', params);
		           element.data('payload', {
		                priorValue: newValue
		           });
		      }
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          openSelectionDetail: function (data) {
               var _this = this;
               var params = {};
               $('#ssm_SelectionCategories .category-option').removeClass('selected');
               $('#ssm_SelectionCategories .' + data.option).addClass('selected');

               $('#ssm_SelectionDetails .category-detail').addClass('hide');
               $('#ssm_SelectionDetails .category-detail.' + data.option).removeClass('hide');
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          selectionToggleAltAddr: function () {
               $('#ssm_Selection_CustInfo .alt-addr .data').toggleClass('hide');

               $('#ssm_Selection_CustInfo .alt-addr .ssm-toggle')
                       .toggleClass('ssm-expand')
                       .toggleClass('ssm-collapse');
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          renderStatus: function (sts) {
               var statusValue,
                       _this = this,
                       container = $('#ssm_Selection');

               // first check for user restrictions
               if (_this.config.inquiry_mode == "Y") {
                    // disable the status drop down
                    container.find('#ssm_pseudoStatus').addClass('editable-hidable')
                            .closest('.ssm-styled-select').addClass('editable');
                    // remove the "Create New Selection / Reminder" header
//            	container.find("#newSelectionButtons").remove()
                    $(".ssm-main").addClass('inquiry');

               }

               // -- Remove 'classes' from main DIV...
               $.each(['closed', 'open'], function (i, v) {
                    container.removeClass(v);
               });


               statusValue = sts || container.find('#ssm_status').val();

               switch (statusValue) {
                    case 'F':
                    case 'C':
                    case 'L':
                         container.addClass('closed');
                         container.find('.editable').prop('disabled', true);
                         container.find('.editable-hidable').hide();

                         break;
                    default:
                         container.find('.editable').prop('disabled', false);
                         container.find('.editable-hidable').show();
                         break;
               }


          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          setActiveSelectionTab: function (element) {
               $("#ssm_SelectionTabs li a").removeClass('active').addClass('not-active');
               $(element).removeClass('not-active').addClass('active');
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          promptBuyerAccountDetail: function (results, data) {
               var _this = this,
                       getEjsDetails,
                       popupElement,
                       targetElement,
                       id,
                       params = {},
                       newValue,
                       priorValue,
                       container = _this.globalGlue.AccountSearchContainer;

               container.find('#ssm_form_buyerAccount .ssm_busy').hide();

               getEjsDetails = $App.Template("selection/openBuyerAccountDetails.ejs").render(results);

               container.find('#ssm_popup_table_buyer_details').append(getEjsDetails);
               _this.setAltRowColorBuyerAccount();

               //Set totals for label search result box//
               container.find('#buyer_account_results').html(_this.createResultsLabel(results.queryinfo, data));
               container.find('.footer .range').html(_this.createResultsLabel(results.queryinfo, data).replace(/(\-\s?\d{2,3}).*/gi, "$1"));

               //set hidden field last displayed record
               container.find('#ssm_StartingRecord_id').val(results.queryinfo["nextstartingrecord"]);


               if (results.queryinfo["nextstartingrecord"] == 0) {
                    container.find('#buyer_account_select').hide();
                    container.find('#buyer_account_select_more').hide();
               } else {
                    container.find('#buyer_account_select').show();
                    container.find('#buyer_account_select_more').show();
               }

               if (results.queryinfo["querysize"] == "0") {
                    container.find('#ssm_SelectionSearch .results_table').hide();
               } else {
                    container.find('#ssm_SelectionSearch .results_table').show();
               }

               //setup clicks on buyer account items//
               container.find('.ssm_popup_data_row').off();
               container.find('.ssm_popup_data_row').on('click', function () {
                    var id = $(this).attr('id');
                    popupElement = id.split("_");

                    targetElement = (container.find('#ssm_TargetBox_id').val()).split("_");

                    if (_this.globalGlue.AccountIdTarget == 'billingAccount_7') {
                         //set value of field
                         priorValue = $('#billingAccount-id_' + targetElement[1]).html();

                         $('#billingAccount-name_' + targetElement[1]).html(container.find('#buyerAccount-popup-name_' + popupElement[1]).html());
                         $('#billingAccount-id_' + targetElement[1]).html(container.find('#buyerAccount-popup-id_' + popupElement[1]).html());

                         newValue = $('#billingAccount-id_' + targetElement[1]).html();

                         if (priorValue !== newValue) {
                              params.ssm_SelectionId = $App.Model('Selection').currentSelectionId;
                              params.ssm_ReferenceId = targetElement[1];
                              params.ssm_PersonId = $('#billingAccount-id_' + targetElement[1]).html();

                              //                    if (_this.globalGlue.AccountIdTarget == 'billingAccount_7') {
                              $App.Fire('setSelectionReference', params);
                              //                    }
                         }
                    } else {
                         var theNewValue = container.find('#buyerAccount-popup-id_' + popupElement[1]).html(),
                                 theNewTarget = container.closest('#printContainer').find('#' + _this.globalGlue.AccountIdTarget);
//                	container.closest('#printContainer').find('#' + _this.globalGlue.AccountIdTarget).val(container.find('#buyerAccount-popup-id_' + popupElement[1]).html());
                         theNewTarget.val(theNewValue);
                         theNewTarget.closest(".containerRow").find("[name=ssm_UsePricingAccount]")
                                 .prop("checked", true)
                                 .val(theNewValue);
                    }

                    //close buyer account info
                    if (_this.globalGlue.AccountIdTarget == 'billingAccount_7') {
                         $('#ssm_SelectionDetails .category-detail').addClass('hide');
                         $('#ssm_SelectionDetails .category-detail.references').removeClass('hide');
                    } else {
                         container.hide();
                         container.closest('#printContainer').find('#ssm_submitPrint').show();
                         container.closest("#printContainer").find(".ssm_crumb").hide();
                    }
               });

               // query info "Results 1-12 of records for ..."
               container.find('#buyer_account_results').show();



          },
          // ------------------------------------------------------------
          // -- Used to help make some of the functions more modular
          // -- Global Glue - What holds it all together
          // -- CONTENTS:
          // ---- _this.globalGlue.AccountSearchContainer
          // ---- _this.globalGlue.AccountIdTarget
          // ------------------------------------------------------------        
          globalGlue: {},
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          promptBuyerAccountInit: function (results, data) {
               var _this = this,
                       container;

               switch (data.clicked_id) {
                    case "billingAccount_7":
                         container = $('#ssm_Selection_BuyerAccount');
                         $('#ssm_SelectionDetails .category-detail').addClass('hide');
                         container.removeClass('hide');
                         break;
                    case "ssm-printBuyerSearch":
                         container = $('#ssm_billingAccountSearch');
                         // hide the print dialog contents  
                         container.closest('#printContainer').find('#ssm_submitPrint').fadeOut();
                         container.show();
                         container.closest("#printContainer").find(".ssm_crumb").show();
                         break;
               }
               ;

               // place needed info into the global object for later access
               _this.globalGlue = {
                    AccountSearchContainer: container,
                    AccountIdTarget: data.clicked_id
               };


               container.html($App.Template("selection/openBuyerAccountContainer.ejs").render(results));
               $('#ssm_billingAccountSearch .title').hide();
               container.closest("#printContainer").on('click', "#ssm_back-to-print", function () {
                    container.fadeOut();
                    container.closest("#printContainer").find(".ssm_crumb").hide();
                    container.closest("#printContainer").find('#ssm_submitPrint').show();
               });
               container.find('#buyer_account_results').hide();

               //Initialize starting record//
               container.find('#ssm_StartingRecord_id').val(0);

               //Store Hidden Field with Target DropDown Box ID
               container.find('#ssm_TargetBox_id').val(data.clicked_id);

               container.find('#ssm_SelectionDetails .category-detail').addClass('hide');
               container.removeClass('hide');
               
               //Set up Clicks on Sort Dropdowns
               container.find('#ssm_buyer_account_search').off();
               container.find('#ssm_buyer_account_search').on('click', function () {
                    container.find('#ssm_StartingRecord_id').val(0);
                    container.find('#ssm_form_buyerAccount').attr("action", '#selectionSearchBuyerAccount');
                    container.find('#ssm_form_buyerAccount').submit();
               });

               //Set up Clicks on Sort Dropdowns
               container.find('#ssm_buyer_account_search_more').off();
               container.find('#ssm_buyer_account_search_more').on('click', function () {
                    container.find('#ssm_form_buyerAccount').attr("action", '#selectionSearchBuyerAccountMore');
                    container.find('#ssm_form_buyerAccount').submit();
               });

               //Set up Clicks on Sort Dropdowns
               container.find('#ssm_OrderBy_id').on('change', function () {
                    var params = {
                         ssm_keyword: container.find('#ssm_select_customer').val(),
                         ssm_OrderBy: container.find('#ssm_OrderBy_id').val(),
                         ssm_OrderBy_Desc: container.find('#ssm_OrderBy_Desc_id').val()
                    };
                    $App.Fire('selectionSearchBuyerAccount', params);
               });

               container.find('#ssm_OrderBy_Desc_id').on('change', function () {
                    var params = {
                         ssm_keyword: container.find('#ssm_select_customer').val(),
                         ssm_OrderBy: container.find('#ssm_OrderBy_id').val(),
                         ssm_OrderBy_Desc: container.find('#ssm_OrderBy_Desc_id').val()
                    };
                    $App.Fire('selectionSearchBuyerAccount', params);
               });

               // -- If ssm_keyword was passed in, this means a pre-search has occurred, and that
               // ---- it's value should be loaded into the keyword field's value...
               if (data.ssm_keyword) {
            	   $('#ssm_select_customer').val( data.ssm_keyword );
               };
               
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          createResultsLabel: function (query, data) {
               var start, end, results;

               start = 1;
               end = query.nextstartingrecord - 1;


               if (query.eof == "Y") {
                    end = query.querysize;
               }

               results = 'Results '
                       + start
                       + ' - '
                       + end
                       + ' of '
                       + query.querysize
                       + ' records for ' + '<b>'
                       + ((data.ssm_keyword > "") ? data.ssm_keyword : "'Empty Search'")
                       + '</b>';

               if (query.querysize == 0) {
                    results = "No selections found for <b> "
                            + ((data.ssm_keyword > "") ? data.ssm_keyword : "'Empty Search'");
               }

               return results;
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          selectionSearchBuyerAccountClear: function (target, results, data) {
               $('#ssm_popup_table_buyer_details').html('');
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          setAltRowColorBuyerAccount: function () {
               $('.data_row:even').css("background-color", "#F4F4F4");
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          addNotePad: function (results, data) {
               var _this = this, recordData,
                       regEx = /http:\/\/(www\.)?[A-Za-z\-\_\.0-9]+\.(com|net|org|gov|edu)\/?/g,
                       matchArray = [];

               $('#ssm_Notepad_Data').val('');

               recordData = {
                    klassname: 'new',
                    date: '*Recently Added*',
                    data: data.ssm_Data
               };

               recordData.data = _this.checkForLink(recordData.data);

               $('#ssm_Selection_NotePad .data-collection').append(
                       $App.Template("selection/notepad-record.ejs").render(recordData)
                       );
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          clearSelectionReference: function (data, element) {

               var _this = this;
               var tagName, tagType;
               var dropElement;

               //clear on screen field//
               tagName = 'hdrid_' + data.ssm_ReferenceId;

               tagType = $('#ssm_Selection_References').find('[name=' + tagName + ']').prop('tagName');

               switch (tagType) {
                    case 'SELECT':
                         {
                              //clear on screen field//
                              dropElement = 'select[name=' + tagName + ']';
                              $(dropElement).val('');

                              //cause field to self update
                              $(dropElement).change();
                              break;
                         }
                         // Non Select //
                    default:
                         {

                              tagName = '#billingAccount-name_' + data.ssm_ReferenceId;
                              $(tagName).html('');

                              tagName = '#billingAccount-id_' + data.ssm_ReferenceId;
                              $(tagName).html('');

                              $App.Fire('setSelectionReference', {
                                   ssm_SelectionId: $App.Model('Selection').currentSelectionId,
                                   ssm_ReferenceId: data.ssm_ReferenceId,
                                   ssm_PersonId: 0
                              });
                         }
               }


          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          clearSelectionJobInfo: function (data, element) {

               var _this = this;
               var tagName, tagType;
               var dropElement;


               //clear on screen field//
               tagName = 'hdrid_' + data.ssm_jobInfoId;

               tagType = $('#ssm_Selection_JobInfo').find('[name=' + tagName + ']').prop('tagName');

               switch (tagType) {
                    case 'SELECT':
                         {
                              dropElement = $('#ssm_Selection_JobInfo').find('[name=' + tagName + ']');
                              $(dropElement).val('');

                              //cause field to self update
                              $(dropElement).change();
                              break;
                         }

                    case 'INPUT':
                         {
                              dropElement = $('#ssm_Selection_JobInfo').find('[name=' + tagName + ']');
                              $(dropElement).val('');

                              //cause field to self update
                              $(dropElement).blur();
                              break;
                         }
               }

          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          clearSelectionDate: function (element) {
               var parent, editable, tagname;

               parent = $(element).parents('.parent');
               editable = $(parent).find('input.editable');

               $(editable)
                       .val('')
                       .trigger('blur');
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          busy: function () {
               $('#ssm_CustomerSearch .ssm_busy').show();
               $('#ssm_CustomerSearch .instructions').hide();
               $('#ssm_popup_table_buyer_details').hide();
               $('#buyer_account_results').hide();
               $('#ssm_Selection_BuyerAccount .header').hide();
               $('#ssm_Selection_BuyerAccount .footer').hide();
          },
          unbusy: function () {
               $('#ssm_CustomerSearch .ssm_busy').hide();
               $('#ssm_popup_table_buyer_details').show();
               $('#buyer_account_results').show();
               $('#ssm_Selection_BuyerAccount .header').show();
               $('#ssm_Selection_BuyerAccount .footer').show();
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          busy_SearchBuyerAcct: function () {
               $('#ssm_form_buyerAccount .ssm_busy').show();
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          unbusy_SearchBuyerAcct: function () {
               $('#ssm_form_buyerAccount .ssm_busy').hide();
          },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          saveInProcess: function () {
               $('#ssm_Selection .savingIndicator').addClass('save-inprocess');
          },
          saveComplete: function () {
               $('#ssm_Selection .savingIndicator').removeClass('save-inprocess');
  },
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          selectionPlaceOrder: function () {
               alert('Place Order Not Implemented');
          },
          
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          confirmSelectionCustomerSwap: function (data) {
        	  $App.Fire('confirm_message' , {
        		  message  : "Are you sure you want to change the customer?",
        		  width: 400,
        		  callback : function (confirmResponse) {
        			  if (confirmResponse){
        				  $App.Fire("gotoCustomerSearchForSelection", data)
        			  }
        		  }
        	  });               
          },
          
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          selectionPrint: function (results) {
               var _this = this,
                       ssm_id = $App.Model('Selection').currentSelectionId,
                       dialog_width = 500,
                       printBaseTemplate = $App.Template('selection/selectionPrint.ejs'),
                       printTitleTemplate = $App.Template('selection/selectionPrintTitle.ejs'),
                       $dialog = $(printBaseTemplate.render(results));
//			Define and open the popup window
               $dialog.dialog({
                    autoOpen: false,
                    title: printTitleTemplate.render(
                            {
                                 msg: "Print Selection#: " + ssm_id,
                                 width: parseInt(dialog_width - 16)
                            }
                    ),
                    modal: true,
                    width: dialog_width,
                    close: function () {
                         //remove modal
                         $(this).remove();
                    },
                    position:
                            {
                                 my: "top",
                                 at: "top",
                                 of: window
                            }
               });
               $dialog.dialog('open');

               $dialog.find(".subSection:last").css({borderBottom: "none"});
               $dialog.find(".subSection:first").css({paddingBottom: "5px"});

               // check the print consumer name checkbox if specified
               if (results.precheck_printconsumernames == "Y") {
                    $dialog.find("#parm_PrintConsumer").prop('checked', true);
               }
               
               // check the print summary checkbox if specified
               if (results.precheck_printsummarypage == "Y") {
                    $dialog.find("#parm_PrintSummary").prop('checked', true);
               }
               
               // abide by control panel user restrictions
               if (!_this.config.allow_printing_prices) {
                    $dialog.find("[type=radio]").not(":first").each(function () {
                         $(this).closest(".containerRow").remove();
                    });
                    $dialog.find("[type=radio]").prop("checked", true);
               }
               if (_this.config.show_account_list_during_print_selection == "N") {
                    $dialog.find("#ssm-printBuyerSearch").closest(".containerRow").remove();
               }
               
               // attach the ssm_Id to the form
               $dialog.find("#ssm_submitPrint").data('payload', {ssm_Id: ssm_id});

          },
          
          // ------------------------------------------------------------
          // --
          // ------------------------------------------------------------
          printSelectionSubmit: function (data) {
			var _this = this, 
				ssm_id = $App.Model('Selection').currentSelectionId,
				service_url,
				$dialog,
				$iframe,
				h =$(window).height(),
				w = $(window).width();
	               
				service_url = '../../dancik-aws/ssm/printSelection/pdf?' + $.param( $.extend(data, { 
					"filename" : "Selection " + ssm_id,
					"content-disposition" : "inline"					
				}))
			
                $iframe = $("<iframe />");
	            $dialog = $("<div></div>").append($iframe);   
     			
	               // -- Define and open the popup window
	           $dialog.dialog({
	                autoOpen: false,
	                title: "Selection#: " + ssm_id,
	                modal: true,
	                width: (w - 50),
	                height: (h - 50),
	                close: function () {
	                     //remove modal
	                     $(this).remove();
	                },
	                position:
	                        {
	                             my: "center",
	                             at: "center",
	                             of: window
	                        }
	           });
	           
               $iframe.attr({
            	   src : service_url,
            	   height : +(h - 100), 
            	   width : +(w - 75)
               });
	           $dialog.dialog('open');
          }
     });
})(jQuery);
