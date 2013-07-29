(function ($) {
	$App.View('ODS', {
		initialize: function () {
		},
		config: null,
		populate_folders: function (data) {
			folderOptions = $("#ssm_folderSelect");
			$(data.folders).each(function (index, folder) {
				var folder;
				if (folder.name1 == 'SSM') {
					folder = $('<option selected="selected">' + folder.name1 + '</option>');
				} else {
					folder = $('<option>' + folder.name1 + '</option>');
				}
				folderOptions.append(folder);
			});

			// Populate the IFS Table on load of the ODS Page 
			$App.Fire('get_user_ifs_files');
		},
		init: function (data) {
			//
			var _this = this,
				// Template Variables 
				baseTemplate = $App.Template('ods/base.ejs'),
				ifsOptionsTemplate = $App.Template('ods/ifs_popup/body.ejs'),
				ifsOptionsTitle = $App.Template('ods/ifs_popup/title.ejs'),
				spoolfileOptionsTemplate = $App.Template('ods/spoolfile_popup/body.ejs'),
				spoolfileOptionsTitle = $App.Template('ods/spoolfile_popup/title.ejs'),
				dialog_width = 0,
				container = $(baseTemplate.render()),
				otherScreens = $("#appMainBody *"),
				mainApp = $("#appMainBody"),
				folderOptions = container.find("#ssm_folderSelect");


			// -- Preset the "Header" tab, as selected...
			container.find(".ssm_tabs").tabs();
			container.find(".ssm_tabs").tabs("select", "ssm_SelectionHeader");

			// Remove any potentially existing instances of this interface from the DOM
			$("#ssm_ODSContainer").remove();

			// Hide other screens and append this one of appMainBody
			otherScreens.hide();
			// Turn Around and redisplay new selection button bar//
			$('#ssm_Dashboard').show();
			$('#newSelectionButtons').show();
			$('#newSelectionButtons *').show();

			mainApp.append(container);

			// ----------------------------------------
			// Events - Bind all events below
			// ----------------------------------------

			folderOptions.change(function () {
				container.find("#ssm_odsIFS .ssm_busy").show();
				$App.Fire('get_user_ifs_files');
			});
			
			// Convert outq link to input on click
			container.on('click','a.outq', function(event){
				event.preventDefault();
				var outq_Value = $(this).text();
				$(this).closest("td").html('<input type="text" value="' + outq_Value +'" class="outq colWidth-100 upper"/>');
			});
			
			// Change outQ
			container.find('#ssm_odsSpoolfile').on('blur', 'input.outq', function () {
				var row = $(this).closest("tr"),
					data = row.data('data'),
					outq = $(this).val(),
					updateData = {
				ods_Job         : data.jobname,
					ods_User        : data.username,
					ods_JobNumber   : data.jobnumber,
					ods_PrinterFile : data.printfile,
					ods_SpoolFile   : data.spoolfile,
					ods_Outq        : outq
				};

				// 
				// 
				if(data.outq != outq){
					$App.Fire('update_spoolfile_outq', updateData);
				}
				// turn the input back into a link
				$(this).closest("td").html('<a href="#" class="outq colWidth-100 upper">' + outq +'</a>');
				
			});

			// Refresh Button
			container.find("a[href=#refresh]").click(function () {
				// Find the active link and tricker a click of it to refresh
				var activeTab = container.find(".tab.ui-state-active"),
					tabText = activeTab.text();

				// Reload the IFS Tab Files	
				if (tabText == "IFS") {
					container.find("#ssm_odsIFS .ssm_busy").show();
					$App.Fire('get_user_ifs_files');
				}
				// Reload the Spoolfiles
				else if (tabText = "Spoolfile") {
					container.find("#ssm_odsSpoolfile .ssm_busy").show();
					$App.Fire('get_user_spool_files');
				}
			});

			// IFS Tab Click ( Have to Fire event because it won't go through the routes )
			container.find("a[href=#ssm_odsIFS]").click(function () {
				//IF.... there are no already existing records
				// This will save loading the same files over and over when switching between tabs.  We also have the refresh button if they 
				// want an updated listing
				if (container.find("#ifs_table tbody tr").size() == 0) {
					container.find("#ssm_odsIFS .ssm_busy").show();
					$App.Fire('get_user_ifs_files');
				}
			});

			// Spool Tab Click ( Have to Fire event because it won't go through the routes )
			container.find("a[href=#ssm_odsSpoolfile]").click(function () {
				// same as IFS Table
				if (container.find("#spoolfile_table tbody tr").size() == 0) {
					container.find("#ssm_odsSpoolfile .ssm_busy").show();
					$App.Fire('get_user_spool_files');
				}
			});

			// IFS Table Options Click
			container.find('#ssm_odsIFS').on('click', 'a[href=#options]', function () {
				var row = $(this).closest("tr"),
					data = row.data("data"),
					openFileObj = {
				ods_AppCode  : "SSM",
					ods_FileName : data.filename,
					parm_Suffix   : data.suffix
				}
				//
				dialog_width = 250;

				// Define and open the popup window
				$dialog = $('<div id="ifsOptionsPopupBody" class="ssm-NotificationDialog"></div>')
					.html(ifsOptionsTemplate.render(data))
					.dialog({
					autoOpen: false,
					title: ifsOptionsTitle.render(
						{
							width: parseInt(dialog_width - 16)
						}
					),
					modal: true,
					close: function () {
						$(this).remove();
					},
					width: dialog_width + 'px'
				});
				$dialog.dialog('open');

				// If its an Excel File, show the Excel icon				
				if (data.suffix.toLowerCase() == ".xls") {
					//
					$dialog.find(".pdf").removeClass("pdf").addClass("excel").attr('title',"Open Excel");
				}
				// If its an CSV File, show the Doc icon				
				if (data.suffix.toLowerCase() == ".csv") {
					//
					$dialog.find(".pdf").removeClass("pdf").addClass("doc").attr('title',"Open CSV");
				}
				// If its a DOC File, show the Word icon				
				if (data.suffix.toLowerCase() == ".doc") {
					//
					$dialog.find(".pdf").removeClass("pdf").addClass("ms-word").attr('title',"Open DOC");
				}

				$dialog.find(".openPDF").click(function () {
					$App.Fire('open_ifs_file', openFileObj);
				});

				// Handle delete option click
				$dialog.find(".delete").click(function () {

					// Confirm Deletion of the spoolfile
					$App.Fire('confirm_message',
						{
							message: "Are you sure you want to delete this IFS file?",
							width: 400,
							callback: function (doDelete) {
								if (doDelete) {
									$App.Fire("delete_ifs_file", {
										ods_AppCode: 'ssm',
										ods_File: data.filename
									});
								}
							}
						}
					);
				});
			});

			// Spoolfile Table Options Click
			container.find('#ssm_odsSpoolfile').on('click', 'a[href=#options]', function () {
				var row = $(this).closest("tr"),
					data = row.data("data"),
					spoolfileActionData = {
					ods_Job: data.jobname,
					ods_User: data.username,
					ods_JobNumber: data.jobnumber,
					ods_PrinterFile: data.printfile,
					ods_SpoolFile: data.spoolfile
				},
				dialog_width = 275;

				// Define and open the popup window
				$dialog = $('<div id="spoolfileOptionsPopup" class="ssm-NotificationDialog"></div>')
					.html(spoolfileOptionsTemplate.render(data))
					.dialog({
					autoOpen: false,
					title: spoolfileOptionsTitle.render(
						{
							width: parseInt(dialog_width - 16)
						}
					),
					modal: true,
					close: function () {
						$(this).remove();
					},
					width: dialog_width + 'px'
				});
				$dialog.dialog('open');

				// Spoolfile as text document
				$dialog.find(".openText").click(function () {
					var tempObj = {};
					$.extend(tempObj, spoolfileActionData, {type: "TXT"});
					$App.Fire('open_spoolfile', tempObj);
				});

				// Spoolfile as PDF
				$dialog.find(".openPDF").click(function () {
					var tempObj = {};
					$.extend(tempObj, spoolfileActionData, {type: "PDF"});
					$App.Fire('open_spoolfile', tempObj);
				});

				$dialog.find(".hold").click(function () {
					// 
					$App.Fire('hold_spoolfile', spoolfileActionData);
				});

				$dialog.find(".release").click(function () {
					// 
					$App.Fire('release_spoolfile', spoolfileActionData);
				});

				// Handle Delete spoolfile click
				$dialog.find(".delete").click(function () {
					//
					//
					// Confirm Deletion of the spoolfile
					$App.Fire('confirm_message',
						{
							message: "Are you sure you want to delete this Spoolfile?",
							width: 400,
							callback: function (doDelete) {
								if (doDelete) {
									$App.Fire('delete_spoolfile', spoolfileActionData);
								}
							}
						}
					);

				});
			});
		},
		// Update the view after a delete of a IFS file
		post_ifs_delete: function (worked) {
			// If the delete worked, send success message
			if (worked) {
				$App.Fire('info_message', {message: 'File successfully deleted.'});
			}

			// Remove the deleted row and the popup menu
			$App.Fire('get_user_ifs_files');
			$("#ifsOptionsPopupBody").remove();
		},
		// Update the view after the delete of a spoolfile		
		post_spoolfile_action: function (message) {
			$App.Fire('info_message', {message: message});
			$("#spoolfileOptionsPopup").remove();

			// Reload the spoolfile data
			$App.Fire('get_user_spool_files');	},
		// Populate the Spoolfile table
		display_spoolfile_table: function (data, container) {
			// 
			var _this = this,
				container = (container) ? container : $("#ssm_odsSpoolfile"),
				spoolBody = container.find("#spoolfile_table tbody"),
				spoolfileRowTemplate = $App.Template('ods/spool_row.ejs');

			// Clear any existing rows
			spoolBody.find("tr").remove();

			// Remove the loading box
			container.find(".ssm_busy").hide();

			$(data).each(function (i, row) {
				var spoolRow = $(spoolfileRowTemplate.render(row));

				//Add data to the row
				spoolRow.data('data', row);

				// Add the rows
				spoolBody.append(spoolRow);
			});

			// Apply Table Styles
			$App.Utils.applySsmTableStyles({
				table: container.find(".ssmTableWrapper"),
				evenOdd: "odd"
			});
		},
		// Append the data to IFS the table
		populate_ifs_table: function (data, container) {
			var ifsRowTemplate = $App.Template('ods/ifs_row.ejs'),
				container = (container) ? container : $("#ssm_ODSContainer"),
				ifsBody = container.find("#ifs_table tbody"),
				folder = container.find("#ssm_folderSelect").val();


			//
			//
			// 
			//Remove any existing rows
			ifsBody.find("tr").remove();

			// Remove the loading box
			container.find("#ssm_odsIFS .ssm_busy").hide();

			$(data.files).each(function (i, file) {
				var row = $(ifsRowTemplate.render(file)),
					testFolder = file.fulllink.replace('/' + file.filename, "");

				// Previous command stripped off the file name.
				// This command removes everything before the slashes, giving me the folder name containing the file
				testFolder = testFolder.replace(/.*\/(.*)/gi, "$1");

				if (testFolder == folder) {
					// Append data to the row
					row.data("data", file);

					// Add the row to the table
					ifsBody.append(row);
				}
			});

			// Apply Table Styles
			$App.Utils.applySsmTableStyles({
				table: container.find(".ssmTableWrapper"),
				evenOdd: "odd"
			});
		}
	});
})(jQuery);

