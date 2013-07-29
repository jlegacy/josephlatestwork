(function ($)   {
    $App.View('Messages', {
        config: {},

        initialize: function () {
        
        },
        
        warn_message : function (options) {
        	//
        	// Templates and Defaults
        	var _this = this,
        		bodyTemplate = $App.Template('messages/warn/body.ejs'),
        		titleTemplate = $App.Template('messages/warn/title.ejs'),
        		confirmBodyContainer = $(bodyTemplate.render(options)),
        		defaultWidth = 400,
        		defaultTitle = "Warning";
        		defaultMessage = "";
        	
        	// Set defaults if there are no options passed in
        	options.message = (options.width) ? options.message :  defaultMessage; 
        	options.width = (options.width) ? options.width : defaultWidth;
        	options.title = (options.title) ? options.title : defaultTitle;
        	
        	$dialog = $('<div class="ssm-NotificationDialog"></div>')
	            .html(confirmBodyContainer.html())
	            .dialog({
	                autoOpen: false,
	                title: titleTemplate.render(options),
	                modal:true,
	                width : options.width               
	            });
	    	
			$dialog.dialog('open');
			
			// Close the dialog
			$dialog.find("input").click(function(){				
					$dialog.remove();
			});
        },

        confirm_message : function (options) {
        	//
        	// Templates and Defaults
        	var _this = this,
        		confirmBodyTemplate = $App.Template('messages/confirm/body.ejs'),
        		confirmTitleTemplate = $App.Template('messages/confirm/title.ejs'),
        		confirmBodyContainer = $(confirmBodyTemplate.render(options)),
        		defaultWidth = 400,
        		defaultTitle = "Confirmation",
        		defaultMessage = "";
        	
        	// Set defaults if there are no options passed in
        	options.message = (options.width) ? options.message :  defaultMessage; 
        	options.width = (options.width) ? options.width : defaultWidth;
        	options.title = (options.title) ? options.title : defaultTitle;
        	
        	// Create the dialog
        	$dialog = $('<div class="ssm-NotificationDialog"></div>')
	            .html(confirmBodyContainer.html())
	            .dialog({
	                autoOpen: false,
	                title: confirmTitleTemplate.render(options),
	                modal:true,
	                width : options.width               
	            });
        	
			$dialog.dialog('open');
			
			// Handle the selection
			$dialog.find("input").click(function(){
				
				var value = $(this).val();
//					
					doDelete = (value == "Yes") ? true : false;					
					
					options.callback(doDelete);
					$dialog.remove();
			});
        }
        
    });
})(jQuery);