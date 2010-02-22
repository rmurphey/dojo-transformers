dojo.provide('Transformers.Controller');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.require('Transformers.Team');

(function(d) {
	d.declare('Transformers.Controller', [ dijit._Widget, dijit._Templated ], {
		rate : 100, 	// ms
		templatePath : d.moduleUrl('Transformers', 'templates/controller.html'),
		
		constructor : function(args) {
			this.teamNames = args.teamNames || ['autobots', 'decepticons'];
		},
		
		postCreate : function() {
			this.setupTeams();

			this.connect(this.generateUserGame, 'click', 'userGenerated');
			this.connect(this.generateRandomGame, 'click', 'randomGenerated');

			d.subscribe('/game/end', this, 'displayResults');
		},
		
		setupTeams : function() {
			this.teams = d.map(this.teamNames, function(team) {
				return new Transformers.Team({ team : team }).placeAt(this.domNode, 'last');
			}, this);
			console.log(this.teams);
		},

		generate : function(type) {
			d.forEach([ 'reset', 'new', 'start' ], function(topic) {
				d.publish('/game/' + topic, [ { type : type }]);
			}, this);
		},
		
		userGenerated : function(e) {
			e.preventDefault();
			this.generate('user');
		},

		randomGenerated : function(e) {
			e.preventDefault();
			this.generate('random');
		},
		
		_randomTeamSize : function() {
			return Math.floor(Math.random() * this.maxTeamSize) + 1;
		},
		
		displayResults : function() {
			var results = [];
			d.forEach(this.teams, function(team) {
				results.push(team.getResults());
			});
			
			console.log(results);
		}
	});
	
})(dojo);