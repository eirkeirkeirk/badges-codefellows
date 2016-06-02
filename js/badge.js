var Badge = (function() {

	function Badge() {
	    this.owners = [];
	    this.name = "";
	    this.image = "";
	    this.link = "";
	}

    Badge.prototype.toString = function() {
      var output = this.name + " owners: " + this.owners;
      return output;
    }

	return Badge;

})();

if (typeof module !== "undefined") {
  module.exports = Badge;
}
