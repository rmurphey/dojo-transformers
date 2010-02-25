dojo.provide('Transformers.Bot');

dojo.require('dijit._Widget');
dojo.require('Transformers.Missile');
dojo.require('Transformers.Gun');

(function(d) {
	d.declare('Transformers.Bot', null, {
		turnLength : 1000,
		
		constructor : function(config) {
			this.config = config;
			this.health = 100;
			this.team = [];
			
			while (this.config.missiles--) {
				new Transformers.Missile(this);
			}
			
			while (this.config.guns--) {
				new Transformers.Gun(this);
			}
			
			d.subscribe('/startTurn', this, 'attack');
			d.subscribe('/firing', this, '_defend');

			d.subscribe('/' + this.config.team + '/join', this, '_addTeammate');
			
			d.publish('/' + this.config.team + '/join');
		},
		
		attack : function() {
			d.publish('/' + this.config.team + '/attack', [ this ]);
			
			setTimeout(function() {
				d.publish('/endTurn');
			}, this.turnLength);
		},
		
		_defend : function(attack) {
			console.log('defending');
			/* ignore attacks from our own team */
			if (attack.bot.config.team == this.config.team) { return; }
			
			var damage = this._calculateDamage(attack);
			this.health = this.health - damage;
			
			d.publish('/' + this.config.team + '/healthUpdate', [ {
				health : this.health,
				damage : damage
			} ]);
		},
		
		_calculateDamage : function(attack) {
			return (attack.maxDamage * Math.random()) / (this.team.length + 1);
		},
		
		_addTeammate : function(bot) {
			this.team.push(bot);
		}
	});	
})(dojo);
