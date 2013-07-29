(function ($) {
	$App.Model.Extend('SSM.Ajax', 'ItemDetails', {
		
		initialize: function () {
			this._super();
		},
		
		get_product_inventory : function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/des/getItemDetails_Inventory', callback, errorCallback);
		},
		
		get_product_knowledge : function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/des/getItemDetails_ProdKnow', callback, errorCallback);
		},
		
		get_item_details: function (data, callback, errorCallback) {
			var _this = this;
			_this.post(data, '../../dancik-aws/des/getItemDetails_Info', callback, errorCallback);
		},
		
		getProductDetails : function() {
			var data = {
				product : {
					item : "SAI109000",
					description1 : "TASTIERA ALMOND 6X8",
					description2 : "Description 2 ABCDEFGHI 123456",
					manufacturer : "SAI - SAICIS S.P.A., CERAMICHE",
					product_line : "TAS - DESCRIPTION MASS UPDATED. OOPS",
					item_status  : "Stock",
					comments     : "NO BROKEN CARTOONS"					
				},
				additional_detials : {
					color_name   : "Almond",
					pattern_name : "6x8",
					item_width   : "18",
					wear_code    : "0",
					rating_abc   : "PREMIUM ITEMS",
					full_carton  : "",
					item_class1  : "TEST",
					item_class2  : "GLAZED CERAMIC TILE (WT)",
					item_class3  : ""
				},
				product_knowledge : {
					item_num     : "this is some text",
					product_line : "Tastier is a rustic look.  You can substitue with AOT Italia Series. Full Ceraimc",
					manufacturer : "allow 3-5 weeks for delivery on most items."
				},
				inventory : [
				             {
				            	serial       : "S5102008",
				            	shade        : "X123",
				            	ware         : "RAL",
				            	location     : "M16",
				            	available_ct : 105.2,
				            	available_sf : 105200, 
				            	status       : "D"
				             },
				             {
					            	serial       : "S5102009",
					            	shade        : "X123",
					            	ware         : "RAL",
					            	location     : "M16",
					            	available_ct : 105.2,
					            	available_sf : 105200, 
					            	status       : "D"
					          },
					          {
					            	serial       : "S5102011", 
					            	shade        : "X523",
					            	ware         : "RAL",
					            	location     : "M16",
					            	available_ct : 105.2,
					            	available_sf : 105200, 
					            	status       : "D"
					          },
					          {
					            	serial       : "S5102013", 
					            	shade        : "X523",
					            	ware         : "RAL",
					            	location     : "M35",
					            	available_ct : 105.2,
					            	available_sf : 105200, 
					            	status       : "D"
					          },
					          {
					            	serial       : "S5102015", 
					            	shade        : "X123",
					            	ware         : "RAL",
					            	location     : "M35",
					            	available_ct : 105.2,
					            	available_sf : 105200, 
					            	status       : "D"
					          },
					          {
					            	serial       : "S5102018", 
					            	shade        : "X523",
					            	ware         : "RAL",
					            	location     : "M35",
					            	available_ct : 105.2,
					            	available_sf : 105200, 
					            	status       : "D"
					          }
				]
			};
			return data;
		}
		
	});
})(jQuery);