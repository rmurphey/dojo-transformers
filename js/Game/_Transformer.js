dojo.provide('Game._Transformer');

dojo.require('dijit._Widget');

(function(d) {
	d.declare('Game._Transformer', [ dijit._Widget, dijit._Templated ], {
		templatePath : d.moduleUrl('Game', 'templates/transformer.html'),
		startingHealth : 100,
		
		constructor : function(args) {
			this.team = args.team;
			this.health = this.startingHealth;
			
			d.subscribe('/game/start', this, '_play');
		},
		
		postCreate : function() {
			console.log(this);
			this._updateHealth();
		},
		
		_play : function() {
			console.log('playing');
		},
		
		_updateHealth : function() {
			this.healthValue.innerHTML = this.health;
		}		
	});	
})(dojo);
