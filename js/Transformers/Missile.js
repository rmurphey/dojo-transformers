dojo.provide('Transformers.Missile');

(function(d) {
	d.declare('Transformers.Missile', [ Transformers._Weapon ], {
		maxDamage : 20,
		rounds : 5,
		
		constructor : function(config) {
			this.inherited(config);
			
			
		}
		
	});
})(dojo);