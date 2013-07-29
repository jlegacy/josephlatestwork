//Class for obtaining user/system/application configuration from the server
$App.Controller('Config', {
	initialize: function(){
		this.model = $App.Model('Config');
		// -- User configuration properties to lookup
		this.configList = [];
	},
	// -- Modify this to manipulate the returned data if needed
	//for example, changing Y/N values to true/false
	parseConfig: function(configData) {
		var _this = this;
		_this.config = configData; //no changes by default
	},
	getConfig: function(callback) {
		var _this = this;
		var configData;
		// -- Load and store configuration info if we don't have it already.
		if( ! _this.config ) {
			configData = this.model.getInitialConfig( _this.configList );
			_this.parseConfig(configData);
		}
		return _this.config;
	},
	reset: function () {
		var _this = this;
		delete _this.config;
		_this.model.reset();
	}
});
