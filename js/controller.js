if (typeof require !== "undefined") {
	require("./person.js");
	require("./badge.js");
}

var Controller = (function() {

	function Controller() {
		this.usernames = ["jonathanschneider"];
		// this.usernames = ['patharryux' , 'jasonsiren' , 'nathanbennett3' , 'erikphansen' , 'donguyen' , 'adamtaitano' , 'jeffdunn' , 'kathleenkent' , 'tybrenner' , 'jenniferminetree' , 'josephfraley2' , 'mitchelllillie' , 'jtz1983' , 'mkelley2']
		this.people = [];
		this.badges = [];
		this.completedCallback = null;
	}

	function makeJSONCallback(scope) {
		function jsonCallback(data) {
			var theseBadges = data.badges;
			var thisPerson = new Person();
			thisPerson.name = data.name;
			thisPerson.username = data.profile_name;
			thisPerson.gravatar = data.gravatar_url;
			scope.people.push(thisPerson);

			theseBadges.forEach(function(b) {
				// if this badge is already in `badges`, simply add this user to `badges.users` array
				// else, make a new Badge
				var badgeExists = false;
				var existingBadge = null;
				scope.badges.forEach(function(badge) {
					if (badge.name === b.name) {
						badgeExists = true;
						existingBadge = badge;
					}
				});
				if (badgeExists) {
					existingBadge.owners.push(thisPerson);
					thisPerson.badges.push({
						badge: existingBadge,
						earned: b.earned_date
					})
				} else {
					var newBadge = new Badge();
					newBadge.owners = [thisPerson];
					newBadge.name = b.name;
					newBadge.link = b.url;
					if (b.name === "Newbie") {
						newBadge.link = "https://www.teamtreehouse.com"
					}
					newBadge.image = b.icon_url;
					scope.badges.push(newBadge);
					thisPerson.badges.push({
						badge: newBadge,
						earned: b.earned_date
					})
				}
			});
			// console.log(thisPerson.name + " has " + theseBadges.length + " badges");
			if (scope.people.length === scope.usernames.length) {
				if (scope.completedCallback) scope.completedCallback(scope);
			}
		}
		return jsonCallback;
	}

	// A function to call from our Mocha test that avoids fetching data from the
	// *** ONLY CALL THIS WHEN TESTING!!! ***
	Controller.prototype.populateWithFakeData = function (fakeJSONArray) {
		var callback = makeJSONCallback(this);
		this.usernames.length = fakeJSONArray.length;
		// process each JSON string in the fakeJSONArray
		fakeJSONArray.forEach(function (e, i) {
			callback(e);
		});
	};

	Controller.prototype.getAndProcessData = function() {
		// make get JSON calls for each username
		// parse each JSON object and create a ner Person object for each
		// and make a new Badge or update the existing Badge
		this.usernames.forEach(function(e, i) {
			var url = "https://teamtreehouse.com/" + e + ".json";
			$.getJSON(url, makeJSONCallback(this));
		}, this)
	}

	Controller.prototype.getPersonByUsername = function (name) {
		for (var i = 0; i < this.people.length; i++) {
			if (this.people[i].username === name) {
				return this.people[i];
			}
		}
	}

	Controller.prototype.badgesOfPerson = function(person) {
		// loop over the person.badges array and pull out the `badge` key for each object
		return person.getBadgeObjects();
	}

	// returns the badges that p1 and p2 have in common
	Controller.prototype.intersectBadges = function (p1, p2) {
	    return _.intersection(p1.getBadgeObjects(), p2.getBadgeObjects());
	}

	// returns an array of Badge objects
	Controller.prototype.getUnearnedBadgesFor = function (person) {
		return _.difference(this.badges, person.getBadgeObjects());
	};

	Controller.prototype.similarity = function (p1, p2) {
		var badgesA = p1.getBadgeObjects();
		var badgesB = p2.getBadgeObjects();
		return this.intersectBadges(p1, p2).length / Math.max(badgesA.length, badgesB.length);
	}

	Controller.prototype.score = function (badge, person) {
	    // find all people with the badge, not including `person`
	    var people = _.difference(badge.owners, [person]);
	    // return the sum of compatability of `person` with all the people
		return _.reduce(people, function (sum, e) {
			return sum += this.similarity(e, person);
		}, 0, this);

			// 	    return people.reduce(function (sum, e) {
			// // TODO: store this in self and use self in the callback
			// console.log("score() `this`: " + this);
			// return sum += this.similarity(e, person);
			// 	    }, 0);
	}

	Controller.prototype.getRecommendationsFor = function (person, maxRecs) {
		// get the list of badges `person` lacks
		// get the compatability score for each of those badges
		// return the five badges with the highest score
		if(arguments.length < 2){
			maxRecs = 5;
		}
		var unearnedBadges = this.getUnearnedBadgesFor(person);
		// `sortedBadges` is an array os simple objects with badge and compatibility props
	    var sortedBadges = unearnedBadges.map(function(e) {
			var obj = {};
			obj.badge = e;
			obj.compatibility = this.score(e, person);
			return obj;
		}, this).sort(function(a, b) {
			return b.compatibility - a.compatibility;
		});
		// return sortedBadges; // <--this line returns an array of wrapper objects: {badge: Badge, compatibility: score}
		return sortedBadges.map(function (e) {
			return e.badge; // pull out the Badge
		}).slice(0, maxRecs);
	};

	return Controller;

})();

if (typeof module !== "undefined") {
	module.exports = Controller;
}
