dojo.provide('Transformers._Transformer');

dojo.require('dijit._Widget');

(function(d) {
	d.declare('Transformers._Transformer', [ dijit._Widget ], {
		startingHealth : 100,
		
		constructor : function(args) {
			this.team = args.team;
			this.health = this.startingHealth;
			
			d.subscribe('/status/request', this, '_sendStatus');
			d.subscribe('/game/new', this, 'destroy');
			
			d.publish('/bot/join', [ this ]);
		},
		
		_sendStatus : function() {
			d.publish('/status', [ this ]);
		}
	});	
})(dojo);
