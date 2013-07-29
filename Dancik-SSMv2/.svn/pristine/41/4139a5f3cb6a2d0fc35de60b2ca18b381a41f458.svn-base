//Any controller/utility methods that need to be triggered on the initial page load happen here.
(function ($) {
	$App.Boot(function () {
		$App.Controller("DWS.Growler").start('ssm_growler');
		$App.Controller('Application').init();
		
		//set dialog defaults
		$.extend($.ui.dialog.prototype.options, {
			dialogClass: 'dancik-dialog',
			resizable: false,
			draggable: false,
			minHeight: 0
		});
		
	});
})(jQuery);

