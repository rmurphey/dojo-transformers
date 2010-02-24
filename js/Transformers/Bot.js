dojo.provide('Transformers.Bot');

dojo.require('dijit._Widget');
dojo.require('Transformers.Missile');
dojo.require('Transformers.Gun');

(function(d) {
	d.declare('Transformers.Bot', null, {
		constructor : function(team) {
			this.team = team;
			this.health = team.maxHealth;
			
			if (!this.health) {
				console.log('you created a dead bot -- it has no health');
				return;
			}
			
			d.subscribe('/' + this.team.name + '/bots/play', this, '_play');
			d.subscribe('/bots/status', this, '_sendStatus');
			
			this.missiles = [];
			this.guns = [];

			while (this.team.missiles--) {
				this.missiles.push(new Transformers.Missile());
			}
			
			while (this.team.guns--) {
				this.guns.push(new Transformers.Gun());
			}
			
			d.publish('/' + this.team.name + '/bot/join', [ this ]);
		},
		
		_play : function(orders) {
			console.log('playing');
			d.publish('/' + this.team.name + '/bot/ping', [ this ]);
		},
		
		_addHealth : function(h) {
			this.health += h;
		},
		
		_sendStatus : function() {
			
		}
	});	
})(dojo);
