dojo.provide('Transformers.Team');

dojo.require('dijit._Widget');

dojo.require('Transformers.Bot');

(function(d) {
	d.declare('Transformers.Team', [ dijit._Widget ], {
		defaultTeamSize : 20,
		
		constructor : function(team) {
			console.log('new team');
			this.name = team.name;
			this.maxHealth = team.health;
			this.playerConfig = team;
			
			this.pings = 0;
			this.teamSize = this.size || this.defaultTeamSize;

			this.bots = []; 

			d.subscribe('/' + this.name + '/bot/ping', this, '_handleBotPing');
			d.subscribe('/' + this.name + '/bot/join', this, '_handleBotJoin');
			d.subscribe('/team/play', this, '_play');
			
			d.subscribe('/game/end', this, 'destroy');

			this._setup();
		},
		
		_setup : function(config) {
			var size = this.teamSize;
			while (size--) { new Transformers.Bot(this); }
		},
		
		_play : function(teamName) {
			var orders = this._getOrders();
			d.publish('/' + this.name + '/bots/play', [ orders ]);
		},

		_getOrders : function() {
			var orders = {
				strength : 0,
				speed : 0
			};
			
			d.forEach(this.bots, function(bot) {
				orders.strength += bot.health;
				orders.speed += (100 - bot.maxHealth);
			});
			
			return orders;
		},
		
		_handleBotPing : function(bot) {
			this.pings++;
			if (this.pings == this.bots.length) {
				this.pings = 0;
				d.publish('/turn/over', [ this.bots ]);
			}
		},
		
		_handleBotJoin : function(bot) {
			this.bots.push(bot);
			if (this.bots.length === this.teamSize) {
				d.publish('/team/join', [ this ]);			
			}
		}
	});
})(dojo);