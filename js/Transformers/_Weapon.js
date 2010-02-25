dojo.provide('Transformers._Weapon');

(function() {
	d.declare('Transformers._Weapon', null, {
		constructor : function(bot) {
			this.bot = bot;
			this.disabled = false; 
			
			d.subscribe('/' + bot.config.team + '/attack', this, '_fire');
		},
		
		_fire : function() {
			console.log('attempting to fire');
			if (this.disabled) { return; }
			this.disabled = true;
			
			d.publish('/firing', [ {
				bot : this.bot,
				maxDamage : this.damage
			} ]);
			
			this.rounds--;
			
			if (this.rounds) {		
				setTimeout(d.hitch(this, function() {
					this.disabled = false;
				}), this.reload);
			} 
		}
	});
})(dojo);
