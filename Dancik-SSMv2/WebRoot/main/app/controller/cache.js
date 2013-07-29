// -- Class for obtaining cacheable data.  Ex. Dropdown listing data. 
$App.Controller('Cache', {
	initialize: function(){
		this.model = $App.Model('Cache');
	},
	getCacheData: function(params, callback, errorCallback) {
		var _this = this;
		_this.model.getCacheData( params, callback, errorCallback );
	},
	reset: function () {
		var _this = this;
		_this.model.reset();
	},
	remove: function (id) {
		var _this = this;
		_this.model.remove(id);
	}
});
