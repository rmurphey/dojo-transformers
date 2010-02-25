dojo.provide('Transformers._Weapon');

(function() {
	d.declare('Transformers._Weapon', null, {
		constructor : function(bot) {
			this.bot = bot;
			this.disabled = false; 
			this.attacking = false;
			
			d.subscribe('/' + bot.config.team + '/attack', this, '_fire');
			d.subscribe('/endTurn', this, '_endTurn');
		},
		
		_fire : function() {
			this.attacking = true;
			
			if (!this.rounds || this.disabled || !this.attacking) { return; }
			this.disabled = true;
			
			d.publish('/firing', [ {
				bot : this.bot,
				maxDamage : this.damage
			} ]);
			
			// fire an arbitrary # of rounds
			this.rounds = this.rounds - Math.floor(Math.random() * this.rounds);
			
			if (this.rounds) {		
				this.timeout = setTimeout(d.hitch(this, function() {
					this.disabled = false;
					this._fire();
				}), this.reload);
			} 
		},
		
		_endTurn : function() {
			this.attacking = false;
			this.disabled = false;
			this.timeout && clearTimeout(this.timeout);
		}
	});
})(dojo);
