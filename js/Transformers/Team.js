dojo.provide('Transformers.Team');

dojo.require('dijit._Widget');

dojo.require('Transformers.Bot');

(function(d) {
	d.declare('Transformers.Team', [ dijit._Widget ], {
		defaultTeamSize : 20,
		
		constructor : function(team) {
			this.team = team;
			this.pings = 0;
			this.teamSize = team.size || this.defaultTeamSize;

			var name = this.team.name; 

			d.subscribe('/' + name + '/bot/ping', this, '_handleBotPing');
			d.subscribe('/' + name + '/bot/join', this, '_handleBotJoin');
			d.subscribe('/play', this, '_play');
			
			d.subscribe('/game/end', this, 'destroy');

			this._setup();
		},
		
		_setup : function(config) {
			var size = this.teamSize;
			
			this.members = [];
			
			while (size--) { new Transformers.Bot(this.team); }
		},
		
		_play : function(teamName) {
			var orders = teamName == this.team.name ? this._attack() : this._defend();
			d.publish('/bots/play', [ orders ]);
		},
		
		_attack : function() {
			// needs smartness
			var orders = {
				action : 'attack'
			};
			return orders;
		},
		
		_defend : function() {
			// needs smartness
			var orders = {
				action : 'defend'
			};
			return orders;
		},
		
		_handleBotPing : function(bot) {
			this.pings++;
			if (this.pings == this.members.length) {
				this.pings = 0;
				d.publish('/turn/over', [ this.members ]);
			}
		},
		
		_handleBotJoin : function(bot) {
			this.members.push(bot);
			if (this.members.length === this.teamSize) {
				d.publish('/team/join', [ this ]);			
			}
		}		
	});
})(dojo);