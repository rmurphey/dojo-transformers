dojo.provide('Transformers.Bot');

dojo.require('dijit._Widget');
dojo.require('Transformers.Missile');
dojo.require('Transformers.Gun');

(function(d) {
	d.declare('Transformers.Bot', [ dijit._Widget ], {
		constructor : function(config) {
			this.config = config;
			this.health = config.maxHealth;
			
			if (!this.health) {
				console.log('you created a dead bot -- it has no health');
				return;
			}
			
			d.subscribe('/game/new', this, 'destroy');
			d.subscribe('/bots/play', this, '_play');
			d.subscribe('/bots/status', this, '_sendStatus');
			
			this.missiles = [];
			this.guns = [];

			while (this.config.missiles--) {
				this.missiles.push(new Transformers.Missile());
			}
			
			while (this.config.guns--) {
				this.guns.push(new Transformers.Gun());
			}
			
			d.publish('/' + this.config.name + '/bot/join', [ this ]);
		},
		
		_play : function(orders) {
			console.log('orders', orders);
			d.publish('/' + this.config.name + '/bot/ping', [ this ]);
		},
		
		_addHealth : function(h) {
			this.health += h;
		},
		
		_sendStatus : function() {
			
		}
	});	
})(dojo);
