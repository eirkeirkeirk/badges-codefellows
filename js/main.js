$(function() {
	// start doing UI stuff
	var controller = new Controller();
	var uibuilder = null;
	controller.completedCallback = function(controller) {
		 uibuilder = new UiBuilder(controller);
         uibuilder.testMethod();
         uibuilder.buildUi();
		// console.log(controller.badgesOfPerson(controller.people[2]));
		//var erik = controller.getPersonByUsername("erikphansen")
		//var pat = controller.getPersonByUsername("patharryux")
		//var jason = controller.getPersonByUsername("jasonsiren")
		// console.log("Badges that Pat has that Jason does not:");
		//var unheldBadges = _.difference(pat.getBadgeObjects(), controller.intersectBadges(pat, jason));

		// console.log(unheldBadges);
		// console.log(controller.score(unheldBadges[0]), jason);
		// console.log(controller.intersectBadges(pat, jason));
		// console.log(controller.badges);

		// console.log("recommend badges for Pat");

		//console.log(controller.getRecommendationsFor(jason));
	}
	controller.getAndProcessData();
})
