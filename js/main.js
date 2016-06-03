$(function() {
	// start doing UI stuff
	var controller = new Controller();
	var uibuilder = null;
	controller.completedCallback = function(controller) {
		 uibuilder = new UIBuilder(controller);
     uibuilder.buildUi();
	}
	controller.getAndProcessData();
	$('form').submit(function(e) {
		e.preventDefault();
		var username = e.target[name="username"].value;
		e.target[name="username"].value = "";
		controller.setUsername(username);
	})
})
