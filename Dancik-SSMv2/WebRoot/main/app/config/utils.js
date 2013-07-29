//Registers a utility object which can contain functions, data, etc that are reused across the application.
//Don't abuse it!

(function($) {
    $App.Utils({
        test: function() {
            return 'test';
        },
        
        convertDateMDY: function(value) {
            var convertedDate = value.substr(0, 2) + '/' + value.substr(3, 2) + '/' + value.substr(8, 2);
            return convertedDate;
        },
        /* 	
         * Create a a Companies Drop Down List 
         *	Pass the jQuery <select> object 
         *	opts object
         *		selected_company - Will set a company option as selected if passed
         */
        companyDropDown : function(selection,opts) {
        	opts = (opts)?opts:{};
        	$App.Model("Cache").getCacheData(['company_nums'], function(obj) {
        		var options = '<option value=""></option>';
        		$(obj.company_nums).each(function(i,company){
        			if(opts.selected_company != '' && opts.selected_company == company.id){
        				options += '<option value="'+company.id+'" selected="selected">'+ company.id + " - " + company.description+'</option>';
        			}else{
        				options += '<option value="'+company.id+'">'+ company.id + " - " + company.description+'</option>';
        			}
        		});
        		selection.html(options);
        		
        		if(opts.callback){
        			opts.callback();
        		};
        	});
        },
        /* 	
         * Create a States Drop Down List 
         *	Pass the jQuery <select> object 
         *	opts object
         *		selected_state - Will set a state option as selected if passed
         */
        statesDropDown : function(selection,opts) {
        	opts = (opts)?opts:{};
        	$App.Model("Cache").getCacheData(['states'], function(obj) {
        		var options = '<option value=""></option>';
        		$(obj.states).each(function(i,state){
        			if(opts.selected_state != '' && opts.selected_state == state.id){
        				options += '<option value="'+state.id+'" selected="selected">'+state.description+'</option>';
        			}else{
        				options += '<option value="'+state.id+'">'+state.description+'</option>';
        			}
        		});
        		selection.html(options);
        	});
        },
        
        /* 	
         * Create a Room Types Drop Down List 
         *	Pass the jQuery <select> object 
         *	opts object
         *		selected_roomtype - Will set a roomtype option as selected if passed
         */
        roomTypesDropDown : function(selection,opts) {
        	opts = (opts)?opts:{};
        	$App.Model("Cache").getCacheData(['roomtypes'], function(obj) {
        		var options = '<option value=""></option>';
        		$(obj.roomtypes).each(function(i,roomtype){
        		//	
        			if(opts.selected_roomtype != '' && opts.selected_roomtype == roomtype.id){
        				options += '<option value="'+roomtype.id+'" selected="selected">'+roomtype.description+'</option>';
        			}else{
        				options += '<option value="'+roomtype.id+'">'+roomtype.description+'</option>';
        			}
        		});
        		selection.html(options);
        	});
        },
        
        /* 	
         * Create a Room Area Drop Down List 
         *	Pass the jQuery <select> object 
         *	opts object
         *		selected_roomarea - Will set a roomarea option as selected if passed
         */
        roomAreasDropDown : function(selection,opts) {
        	opts = (opts)?opts:{};
        	$App.Model("Cache").getCacheData(['roomareas'], function(obj) {
        		var options = '<option value=""></option>';
        		$(obj.roomareas).each(function(i,roomarea){
        			if(opts.selected_roomarea != '' && opts.selected_roomarea == roomarea.id){
        				options += '<option value="'+roomarea.id+'" selected="selected">'+roomarea.description+'</option>';
        			}else{
        				options += '<option value="'+roomarea.id+'">'+roomarea.description+'</option>';
        			}
        		});
        		selection.html(options);
        	});
        },
        
        /* 	
         * Create a Restriction Codes Drop Down List 
         *	Pass the jQuery <select> object 
         *	opts object
         *		selected_restrictioncode - Will set a restrictioncode option as selected if passed
         */
        restrictionCodesDropDown : function(selection,opts) {
        	opts = (opts)?opts:{};
        	$App.Model("Cache").getCacheData(['restrictioncodes'], function(obj) {
        		var options = '<option value=""></option>';
        		$(obj.restrictioncodes).each(function(i,restrictioncode){
        			if(opts.selected_restrictioncode != '' && opts.selected_restrictioncode == restrictioncode.id){
        				options += '<option value="'+restrictioncode.id+'" selected="selected">'+restrictioncode.description+'</option>';
        			}else{
        				options += '<option value="'+restrictioncode.id+'">'+restrictioncode.description+'</option>';
        			}
        		});
        		selection.html(options);
        	});
        },
        
        /* 	
         * Create a Prices Codes Drop Down List 
         *	Pass the jQuery <select> object 
         *	opts object
         *		selected_restrictioncode - Will set a restrictioncode option as selected if passed
         */
        priceCodesDropDown : function(selection,opts) {
        	opts = (opts)?opts:{};
        	$App.Model("Cache").getCacheData(['pricecodes'], function(obj) {
        		var options = '<option value=""></option>';
        		$(obj.pricecodes).each(function(i,pricecode){
        			if(opts.selected_pricecode != '' && opts.selected_pricecode == pricecode.id){
        				options += '<option value="'+pricecode.id+'" selected="selected">'+pricecode.description+'</option>';
        			}else{
        				options += '<option value="'+pricecode.id+'">'+pricecode.description+'</option>';
        			}
        		});
        		selection.html(options);
        	});
        },
        /* 	
         * Create a Prices Codes Drop Down List 
         *	Pass the jQuery <select> object 
         *	opts object
         *		selected_restrictioncode - Will set a restrictioncode option as selected if passed
         */
        priceCodesDropDown : function(selection,opts) {
        	opts = (opts)?opts:{};
        	$App.Model("Cache").getCacheData(['pricecodes'], function(obj) {
        		var options = '<option value=""></option>';
        		$(obj.pricecodes).each(function(i,pricecode){
        			if(opts.selected_pricecode != '' && opts.selected_pricecode == pricecode.id){
        				options += '<option value="'+pricecode.id+'" selected="selected">'+pricecode.description+'</option>';
        			}else{
        				options += '<option value="'+pricecode.id+'">'+pricecode.description+'</option>';
        			}
        		});
        		selection.html(options);
        	});
        },
        /* 	
         * Create a Warehouses Drop Down List 
         *	Pass the jQuery <select> object 
         *	opts object
         *		selected_warehouse - Will set a warehouse option as selected if passed
         */
      warehousesDropDown : function(selection,opts) {
        	opts = (opts)?opts:{};
        	$App.Model("Cache").getCacheData(['warehouses'], function(obj) {
        		var options = '<option value=""></option>';
        		$(obj.warehouses).each(function(i,warehouse){
        			if(opts.selected_warehouse != '' && opts.selected_warehouse == warehouse.id){
        				options += '<option value="'+ warehouse.id +'" selected="selected">'+ warehouse.description +'</option>';
        			}else{
        				options += '<option value="'+ warehouse.id +'">'+ warehouse.description +'</option>';
        			}
        		});
        		selection.html(options);
        	});
        },
        /* 	
         * Create a Status Drop Down List 
         *	Pass the jQuery <select> object 
         *	opts object
         *		selected_status - Will set a status option as selected if passed
         */
        statusesDropDown : function(selection,opts) {
        	opts = (opts)?opts:{};
        	$App.Model("Cache").getCacheData(['status'], function(obj) {
        		var options = '<option value=""></option>';
        		$(obj.status).each(function(i,stat){
        			if(opts.selected_status != '' && opts.selected_status == stat.id){
        				options += '<option value="'+stat.id+'" selected="selected">'+stat.description+'</option>';
        			}else{
        				options += '<option value="'+stat.id+'">'+stat.description+'</option>';
        			}
        		});
        		selection.html(options);
        	});
        },
        /* 	
         * Create a Selection_Warehouses Drop Down List 
         *	Pass the jQuery <select> object 
         *	opts object
         *		selected_warehouse - Will set a warehouse option as selected if passed
         */
      selectionWarehousesDropDown : function(selection,opts) {
        	opts = (opts)?opts:{};
        	$App.Model("Cache").getCacheData(['selection_warehouses'], function(obj) {
        		var options = '<option value=""></option>';
        		$(obj.selection_warehouses).each(function(i,warehouse){
        			if(opts.selected_warehouse != '' && opts.selected_warehouse == warehouse.id){
        				options += '<option value="'+ warehouse.id +'" selected="selected">'+ warehouse.description +'</option>';
        			}else{
        				options += '<option value="'+ warehouse.id +'">'+ warehouse.description +'</option>';
        			}
        		});
        		selection.html(options);
        	});
        },
        /* 	
         * Create a Users Drop Down List 
         *	Pass the jQuery <select> object 
         *	opts object
         *		selected_user - Will set a status option as selected if passed
         */
        selectionUsersDropDown : function(selection,opts) {
        	opts = (opts)?opts:{};
        	$App.Model("Cache").getCacheData(['selection_users'], function(obj) {
        		var options = '<option value=""></option>';
        		$(obj.selection_users).each(function(i,user){
        			if(opts.selected_user != '' && opts.selected_user == user.id){
        				options += '<option value="'+user.id+'" selected="selected">'+user.description+'</option>';
        			}else{
        				options += '<option value="'+user.id+'">'+user.description+'</option>';
        			}
        		});
        		selection.html(options);
        	});
        },
        
        /* 	
         * Create References Checkbox List 
         *	Pass the jQuery container object where the 
         *  checkbox list will reside 
         */
        referenceCheckboxList : function(container) {
        	var rows = "";

        	$App.Model("Cache").getCacheData(['reference_hdrs'], function(obj) {
        		$(obj.reference_hdrs).each(function(i,reference_hdr){
        			var row;
        			row = "<div class='containerRow'>";
        			row += "<input type='checkbox' value='"+ reference_hdr.id +"'> ";
        			row += "<span class='checkboxLabel'>"+ reference_hdr.description +"</span>";
        			row += "</div>";
        			rows += row;
        		});
        		container.html(rows);
        	});
        },
        
        /* 	
       		Create Unit of Measurement Dropdown List
       			Options:
       				selection - mandatory - The select object to populate
       				opts:
       					item - mandatory - the name of the item to get the UoM's for
       					selected_item - if an item is supplied, make it selected.  This is a preselected option, not the item itself
       				uoms: (optional) - If a UOM listing is already at hand, pass it in, to avoid Model call.
         */
        UOMDropDown : function(selection,opts, uoms) {
        	opts = (opts)?opts:{};
//        	
//        	
        	if(!opts.item || opts.item == ""){
        	} else if (uoms) {
        		var options = '<option value=""></option>';
        		$(uoms).each(function(i,uom){
        			if (uom != '') {
        				if(opts.selected_item != '' && opts.selected_item == uom){
        					options += '<option value="'+uom+'" selected="selected">'+uom+'</option>';
        				}else{
        					options += '<option value="'+uom+'">'+uom+'</option>';
        				}
        			}
        		});
        		selection.html(options);        		
        	} else{
	        	$App.Model("Application").itemUOMLookup( {item : opts.item} , function(obj) {
	        		var options = '<option value=""></option>';
	        		$(obj.uoms).each(function(i,uom){
	        			if(opts.selected_item != '' && opts.selected_item == uom.uom){
	        				options += '<option value="'+uom.uom+'" selected="selected">'+uom.uom+'</option>';
	        			}else{
	        				options += '<option value="'+uom.uom+'">'+uom.uom+'</option>';
	        			}
	        		});
	        		selection.html(options);
	        	},function(errorData){
	        		if(opts.errorCallback){
	        			opts.errorCallback(errorData);
	        		}
	        		else{
	        			$App.Fire("ajax_errors", errorData);
	        		}
	        	});
        	}
        },
        
        tableAlternatingRowBackground : function(table) {
        	table.find("tbody > tr:even()").css("background-color","#f4f4f4");
        },
        
//      Toggle Opacity Overlay Screen
//        Options:
//        	- showBlanket : whether or not to show the blanket
        saveInProcess: function (opts) {
        	opts = (!opts)?{showBlanket : false}:opts;        	
        	$('#ssm_Selection .savingIndicator').addClass('save-inprocess');
        	if(opts.showBlanket){
        		$('<div class="pageBlocker"/>').appendTo("body");
        		$('.pageBlocker').css('filter', 'alpha(opacity=40)');
        	}
    	},		
    	saveComplete: function () {
    		$('#ssm_Selection .savingIndicator').removeClass('save-inprocess');
    		$(".pageBlocker").fadeOut(500,function(){$(this).remove();});
    	},       
    	
        applySsmTableStyles : function(opts) {  
//        	Options:
//        		table - if not passed, applies to all tables.  If passed, applies to that table
//        		evenOdd - whether to make the even or odd rows with the gray background        	        	
        	
        	// Styles a specific table        	
        	if(opts.table){
        		opts.table.find(".ssmTable > thead > tr > th:not(:last-child),.ssmTable > tbody > tr > td:not(:last-child)").css("border-right","1px solid #ccc");
        		//opts.table.find(".ssmTable > tbody > tr:nth-child("+opts.evenOdd+"):not(.ssmIgnore) > td").css("background-color","#f4f4f4");
        		opts.table.find(".ssmTable > tbody > tr:not(.ssmIgnore)").each(function(i,row){        			
        			(opts.evenOdd == "even" && ((i % 2)==0) )?$(row).css("background-color","#f4f4f4"):"";
        			(opts.evenOdd == "odd" && ((i % 2)!=0) )?$(row).css("background-color","#f4f4f4"):"";        			
        		})
        	}
        	// Styles all .ssmTables
        	else{
        		$(".ssmTable > thead > tr > th:not(:last-child),.ssmTable > tbody > tr > td:not(:last-child)").css("border-right","1px solid #ccc");
        		//$(".ssmTable > tbody > tr:nth-child("+opts.evenOdd+"):not(.ssmIgnore) > td").css("background-color","#f4f4f4");
        		$(".ssmTable > tbody > tr:not(.ssmIgnore)").each(function(i,row){        			
        			(opts.evenOdd == "even" && ((i % 2)==0) )?$(row).css("background-color","#f4f4f4"):"";
        			(opts.evenOdd == "odd" && ((i % 2)!=0) )?$(row).css("background-color","#f4f4f4"):"";        			
        		})
        	}        	
        },
// 		Dynamically load a js or css file        
        loadjscssfile: function(filename, filetype){
        	 if (filetype=="js"){ //if filename is a external JavaScript file
			  var fileref=document.createElement('script')
			  fileref.setAttribute("type","text/javascript")
			  fileref.setAttribute("src", filename)
			 } else if (filetype=="css"){ //if filename is an external CSS file
			  var fileref=document.createElement("link")
			  fileref.setAttribute("rel", "stylesheet")
			  fileref.setAttribute("type", "text/css")
			  fileref.setAttribute("href", filename)
			 }
			 if (typeof fileref!="undefined")
			  document.getElementsByTagName("head")[0].appendChild(fileref)
			},
			
			/*
			 * Adjust the height of the overlay to avoid awkward cutoff at bottom
			 */ //$App.Utils.adjust_overlay();
			adjust_overlay : function() {
				var _this = this, documentHeight = $(document).height();

				$(".ui-widget-overlay").height(documentHeight);
	        },

	        
	        //	 		Dynamically load a js or css file        
	        help: function(helpkey){
				var fullURL = "http://sal.dancik.com/help/login?key=" + helpkey.split("").reverse().join("");
				var wdw = window.open(fullURL);	
	        }



    });
})(jQuery);