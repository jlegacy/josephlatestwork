//Set configuration information by profile
$App.Profiles({
	development: {
		logLevel: 'debug',	//$App.Log() log level
		messageDebug: true	//show message key if softcoded message is not found.
	},
	production: {
		logLevel: 'none',
		messageDebug: false
	}
});
