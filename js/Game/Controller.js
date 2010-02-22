dojo.provide('Game.Controller');

dojo.require('dijit._Widget');
dojo.require('dojo.string');

dojo.require('Game.Transformers.Autobot');
dojo.require('Game.Transformers.Decepticon');

(function(d) {
	d.declare('Game.Controller', dijit._Widget, {
		rate : 			100, 	// ms
		teamTemplate : '<li><label for="${team}"># of ${team}</label><input id="${team}" /></li>',
		
		constructor : function(args) {
			this.teams = args.teams || {
				autobots : Game.Transformers.Autobot,
				decepticons : Game.Transformers.Decepticon
			};
			
			this.maxTeamSize = args.maxTeamSize || 5;
		},
		
		postCreate : function() {
			this.setupTeams();

			this.connect(dojo.byId('generate'), 'click', 'userGenerated');
			this.connect(dojo.byId('random'), 'click', 'randomGenerated');

			d.subscribe('/game/new', this, 'generate');
			d.subscribe('/game/reset', this, 'reset');
			d.subscribe('/game/end', this, 'displayResults');
		},
		
		setupTeams : function() {
			this.inputs = {};
			this.teamNames = [];

			for (var team in this.teams) {
				if (!this.teams.hasOwnProperty(team)) { return; }

				this.inputs[team] = d.byId(team) || 
					d.place(
						d.string.substitute(this.teamTemplate, { team : team }), 
						d.query('ul', this.domNode)[0],
						'first'
					);

				this.teamNames.push(team);
				this[team] = [];
			}
		},

		generate : function(config) {
			d.publish('/game/reset');
			d.forEach(this.teamNames, function(team) {
				while (--config[team]) {
					this[team].push(new this.teams[team]());
				}
			}, this);
			d.publish('/game/start');
		},
		
		reset : function() {
			d.forEach(this.teamNames, function(team) {
				this[team] = [];
			}, this);
		},

		userGenerated : function(e) {
			e.preventDefault();
			
			var config = {};

			d.forEach(this.teamNames, function(team) {
				config[team] = this.inputs[team].value || 1;
			}, this);
			
			d.publish('/game/new', [ config ]);
		},

		randomGenerated : function(e) {
			e.preventDefault();
			
			var config = {};
			
			d.forEach(this.teamNames, function(team) {
				config[team] = this._randomTeamSize();
			}, this);
			
			d.publish('/game/new', [ config ]);
		},
		
		_randomTeamSize : function() {
			return Math.floor(Math.random() * this.maxTeamSize) + 1;
		},
		
		displayResults : function() {
			
		}
	});
	
})(dojo);

dojo.addOnLoad(function() {
	Game.Controller = new Game.Controller({ rate: dojo.config.frameRate || 10 }, 'controller');
});