dojo.provide('Transformers._Transformer');

dojo.require('dijit._Widget');

(function(d) {
	d.declare('Transformers._Transformer', [ dijit._Widget ], {
		startingHealth : 100,
		
		constructor : function(team) {
			this.team = team;
			this.health = team.startingHealth || this.startingHealth;
			
			d.subscribe('/game/new', this, 'destroy');
			d.subscribe('/' + this.team.name + '/bots/play', this, '_play');
			
			d.publish('/' + this.team.name + '/bot/join', [ this ]);
		},
		
		_play : function(orders) {
			console.dir(orders);
			d.publish('/' + this.team.name + '/bot/ping', [ this ]);
		}
	});	
})(dojo);
