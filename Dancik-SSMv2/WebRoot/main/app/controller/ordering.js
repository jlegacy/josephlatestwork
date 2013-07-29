/*globals $App */
(function ($) {
	$App.Controller('Ordering', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('Ordering');
			this.model = $App.Model('Ordering');
			
		},
		// ------------------------------------------------------------
		// -- 
		// ------------------------------------------------------------
		init: function () {
			var _this = this,
				ssmID = $App.Model("Selection").currentSelectionId,
				data = {
					ssm_Id : ssmID
				},
				itemsObject = {
					ssm_Id : 0,
					ssm_items : []
				},
				callback = function (results) {
					//
					$App.Utils.saveComplete();
					
					// Store the reference number
					_this.model.referenceNumber =  results.pending.referenceid;
					
					// Add ssm_id to the pending part of the object
					$.extend(results.pending, {ssm_id : ssmID});					
					
					_this.view.init(results);	
				},
				
				errorCallback = function (errorResults){
//					
					$App.Utils.saveComplete();
					$App.Fire("ajax_errors", errorResults);					
				};						
			
			 //
			// Gather up all selected order items
			itemsObject.ssm_Id = ssmID;			
			$("#ssm_selectionItemTable tbody tr .orderCheck:checked").each(function (i, row) {
				var row = $(this).closest("tr"),
					line = row.data("line"),
					quantity = row.find("td:eq(2) input").val(),
					itemData = {
							ssm_Line     : line, 
							ssm_Qty : quantity
					};
				
				itemsObject.ssm_items.push(itemData);
			})
				
			//
			$App.Utils.saveInProcess({showBlanket : true});
			_this.model.get_order_header_info(itemsObject, callback, errorCallback);				
		},				
		
		// Calls up step from from the breadcrumb
		order_step_1 : function () {
			//
			_this = this;
			
			_this.view.load_step(1, {}, false);
		},
		
		// Order Step 2
		order_step_2  : function (data) {
			// 
			var _this = this,
				referenceNumber = _this.model.referenceNumber,
				stepData = {
					ssm_ReferenceId : referenceNumber
				},
				
				callback = function (results) {
					//
					_this.view.load_step(2, results);
					$App.Utils.saveComplete();
				},
				
				errorCallback = function (errorResults) {
					$App.Fire("ajax_errors", errorResults);
					//
					$App.Utils.saveComplete();
				};
			
			// 
			$App.Utils.saveInProcess({showBlanket : true});
			_this.model.order_step_2(stepData, callback, errorCallback);
		},
		
		submit_order_step_2 : function (data) {
			var _this = this,
			
				callback = function (results) {
					_this.order_step_3(data);
				},
				
				errorCallback = function (errorResults) {
					$App.Fire("ajax_errors", errorResults);
					$App.Utils.saveComplete();
				};
			
			$App.Utils.saveInProcess({showBlanket : true});
			_this.model.submit_order_step_2(data, callback, errorCallback);
			
		},
		
		order_step_3 : function (data) {
			var _this = this,
				referenceNumber = _this.model.referenceNumber,
				stepData = {
					ssm_ReferenceId : referenceNumber
				},
				
				callback = function (results) {
					//
					_this.get_drop_downs(results);	
					
				},
				
				errorCallback = function (errorResults) {
					$App.Fire("ajax_errors", errorResults);
					//
					$App.Utils.saveComplete();
				};
			_this.model.order_step_3(stepData, callback, errorCallback);
		},
		submit_order_step_3 : function (data) {
			var _this=this;
			$.extend(data, {
				ssm_ReferenceId : _this.model.referenceNumber,
				ssm_Id: $App.Model("Selection").currentSelectionId
			});
			//
			$App.Utils.saveInProcess({showBlanket : true});
			
			callback = function (results) {
				_this.order_step_4(data);	
			},
			errorCallback = function (errorResults) {
				$App.Fire("ajax_errors", errorResults);
				$App.Utils.saveComplete();
			};
			_this.model.submit_order_step_3(data, callback, errorCallback);
		},
		order_step_4 : function (data) {
			//console.log("order_step - data - ", data)
			var _this=this;
			callback = function (results) {
				_this.view.load_step(4, results);
				$App.Utils.saveComplete();
			},
			errorCallback = function (errorResults) {
				$App.Fire("ajax_errors", errorResults);
				$App.Utils.saveComplete();
			};
			_this.model.order_step_4(data, callback, errorCallback);
		},
		submit_order_step_4 : function (data) {
			var _this=this;
			$.extend(data, {
				ssm_ReferenceId : _this.model.referenceNumber,
				ssm_Id: $App.Model("Selection").currentSelectionId
			});
			callback = function (results) {
				_this.order_step_5(data);	
			},
			errorCallback = function (errorResults) {
				$App.Fire("ajax_errors", errorResults);
				$App.Utils.saveComplete();
			};
			$App.Utils.saveInProcess({showBlanket : true});
			_this.model.submit_order_step_4(data, callback, errorCallback);
		},
		order_step_5 : function (data) {
			var _this=this;
			//console.log("step 5 - data", data)
			callback = function (results) {
				//console.log("step 5 results -", results)
				_this.view.load_step(5, results);
				$App.Utils.saveComplete();
			},
			errorCallback = function (errorResults) {
				$App.Fire("ajax_errors", errorResults);
				$App.Utils.saveComplete();
			};
			_this.model.order_step_5(data, callback, errorCallback);
		},
		submit_order_step_5 : function (data) {
			var _this=this;
			$.extend(data, {
				ssm_ReferenceId : _this.model.referenceNumber,
				ssm_Id: $App.Model("Selection").currentSelectionId
			});

			callback = function (results) {
				_this.order_step_6(data);
				$App.Utils.saveComplete();
			},
			errorCallback = function (errorResults) {
				$App.Fire("ajax_errors", errorResults);
				$App.Utils.saveComplete();
			};
			$App.Utils.saveInProcess({showBlanket : true});
			_this.model.submit_order_step_5(data, callback, errorCallback);
		},
		order_step_6 : function (data) {
			var _this=this;
			_this.view.load_step(6, data);
		},
		get_drop_downs :function(selected_opts){
			var _this = this, callback,
			needs_list = ['shipvias', 'salespersons', 'branches', 'ordertypes', 'orderhandlings', 'truckroutes', 'orderreasoncodes', 'warehouses'];		
			callback = function(results) {
				//
				$App.Utils.saveComplete();
				$.extend(results, selected_opts);
				_this.view.load_step(3, results);
				
			}
			$App.Model("Cache").getCacheData(needs_list, callback);
		},
		cancel_order :function (data) {
			var _this = this;
			data.from_order = true;
			//console.log("cancel_order - data", data)
			callback = function (results) {
				$App.Fire("return_to_selections", data);
				$App.Utils.saveComplete();
			},
			errorCallback = function (errorResults) {
				$App.Fire("ajax_errors", errorResults);
				$App.Utils.saveComplete();
			};
			$App.Utils.saveInProcess({showBlanket : true});
			_this.model.cancel_order(data, callback, errorCallback);
		}, 
		
        // ------------------------------------------------------------
        // --
        // ------------------------------------------------------------
		printOrderQuote :function (data) {
			var _this = this, 
				service_url,
				$dialog,
				$iframe,
				h =$(window).height(),
				w = $(window).width();
               
			service_url = '../../dancik-aws/ssm/printOrder/pdf?' + $.param( $.extend(data, {
				"ssm_ReferenceId" : data.ssm_ReferenceId,
				"filename" : "Reference " + data.ssm_ReferenceId,
				"content-disposition" : "inline"					
			}))
		
            $iframe = $("<iframe />");
            $dialog = $("<div></div>").append($iframe);   
 			
               // -- Define and open the popup window
           $dialog.dialog({
                autoOpen: false,
                title: "Reference#: " + data.ssm_ReferenceId,
                modal: true,
                width: (w - 50),
                height: (h - 50),
                close: function () {
                     //remove modal
                     $(this).remove();
                },
                position: {
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