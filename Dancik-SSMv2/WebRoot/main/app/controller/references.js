/*globals $App */
(function ($) {
	$App.Controller('References', {
		// ------------------------------------------------------------
		// -
		// ------------------------------------------------------------
		initialize: function () {
			this.view = $App.View('References');
			this.model = $App.Model('References');
		},
		
//		Initialize the References Editor Interface
//		Get All reference types to build the select box
//		Set the initial references to display		
		init: function (referenceIndex) {
			//
			var _this = this, callback,
			needs_list = ['reference_hdrs', 'reference_dtls'];			
			
			callback = function(ref_type_obj) {		
				_this.view.initEditor(ref_type_obj, referenceIndex);
			}
			$App.Model("Cache").getCacheData(needs_list, callback);			
		},		
		
//		Add a new Reference
//		Pass the selected Reference Type ID (role_id) along with the rest of the form data		
		addReferenceRecord : function(data) {
			var _this = this,
				ref_type_selector = $("#ssm_reference_type"),
				role_id = ref_type_selector.val(),
				reference_id_obj = {ssm_HeaderId : role_id},
			
				callback = function() {				
					$App.Utils.saveComplete();				
					_this.view.postSave(ref_type_selector);
					_this.loadReferenceDetails(reference_id_obj);
					$App.Fire("info_message", {message : "Reference has been successfully added."});
				},
				errorCallback = function(errorData) {
					$App.Utils.saveComplete();	
					$App.Fire("ajax_errors", errorData);				
				};	
			
			$App.Utils.saveInProcess({showBlanket : true});
			$.extend(data, {ssm_roleid : role_id});
			_this.model.addReferenceRecord(data, callback, errorCallback);
		},
		
//		Update Reference data when the edit interface is closed
		updateReferenceDetails : function(data) {
			var _this = this, 
			row = data.row;
			
			var callback = function (obj) {
				if(!obj.errors) {
					$App.Fire("info_message", {message : "Reference has been successfully updated."});
					_this.view.update_single_row(row, obj);					
				}else {}
			}
			
			var errorCallback = function (errorData) {
				$App.Utils.saveComplete();	
				$App.Fire("ajax_errors", errorData);
			}
			
			_this.model.getReferenceDetail(data, callback, errorCallback);
		},
		
//		Update the reference data on blur of the data element
		setReference : function (data) {
			var _this = this;		
			
			var callback = function (obj) {
				if(!obj.errors) {					
					
				}else {
					$App.Fire("error", {
						message : "There was an error updating the Reference information"
					});
				}
			}			
			
			var errorCallback = function (errorData) {
//				
				$App.Fire("ajax_errors", errorData);
			}			
			_this.model.setReference(data, callback, errorCallback);
		},
		
//		Get reference details based on selected reference type
		loadReferenceDetails : function (data) {
			var _this = this;			
			var errorCallback = function(errorData){
				$App.Fire("ajax_errors", errorData);
			}			
			var callback = function(data) {
				_this.view.render_rows(data);
				_this.view.clear_add_interface();
				$App.Utils.saveComplete();
			}		
			
			$App.Utils.saveInProcess({showBlanket:true});
			_this.model.getReferenceDetails(data, callback, errorCallback);
		}
		
	});
})(jQuery);