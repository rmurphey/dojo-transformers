dojo.provide('Transformers.Bot');

dojo.require('dijit._Widget');

(function(d) {
	d.declare('Transformers.Bot', [ dijit._Widget ], {
		startingHealth : 100,
		
		constructor : function(team) {
			this.team = team;
			this.health = team.startingHealth || this.startingHealth;
			
			d.subscribe('/game/new', this, 'destroy');
			d.subscribe('/bots/play', this, '_play');
			
			d.publish('/' + this.team.name + '/bot/join', [ this ]);
		},
		
		_play : function(orders) {
			console.log('orders', orders);
			d.publish('/' + this.team.name + '/bot/ping', [ this ]);
		}
	});	
})(dojo);
