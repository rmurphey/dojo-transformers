dojo.provide('Transformers.Team');

dojo.require('dijit._Widget');

dojo.require('Transformers._Transformer');

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
			d.subscribe('/' + name + '/play', this, '_play');
			
			d.subscribe('/game/end', this, 'destroy');

			this._setup();
			
			d.publish('/team/join', [ this ]);			
		},
		
		_setup : function(config) {
			var size = this.teamSize;
			
			this.members = [];
			
			while (size--) { new Transformers._Transformer(this.team); }
		},
		
		_play : function(config) {
			var orders = {};
			d.publish('/' + this.team.name + '/bots/play', [ orders ]);
		},
		
		_handleBotPing : function(bot) {
			this.pings++;
			if (this.pings == this.members.length) {
				this.pings = 0;
				d.publish('/turn/over', [ this.members ]);
			}
		},
		
		_handleBotJoin : function(bot) {
			console.log(bot);	
			this.members.push(bot);
		}		
	});
})(dojo);