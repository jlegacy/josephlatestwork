(function ($) {
	$App.Model.Extend('SSM.Ajax', 'Kits', {
		
		initialize: function () {
			this._super();
		},
		addSelectionItems : function (data, callback, errorCallback) {
			var _this = this;
			
			
//			
			_this.post(data, '../../dancik-aws/ssm/addSelectionItemRecords', callback, errorCallback);
		},
		
		out_filter: function (json) {
			var out_json = {
					ssm_Selectionid: json.ssm_Selectionid,
					ssm_Items: []
				},
				keys = [],
				count = 0,
				i, item;
			
			delete json.ssm_Selectionid;
			
			
			$.each(json, function (key, value) {
				keys.push(key);
				if (!$.isArray(value)) {
					json[key] = [value];
				}
			});
			
			count = json.ssm_Item.length;
			
			for (i = 0; i < count; i += 1) {
				item = {};
				$.each(keys, function (index, key) {
					item[key] = json[key][i];
				});
				
				// -- Only load the checked items...
				if (item.kitCheck) {
					out_json.ssm_Items.push(item);
				}
			}
			return out_json;
		},
		in_filter: function (json) {
			return json;
		}	
	});
})(jQuery);