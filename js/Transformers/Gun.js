dojo.provide('Transformers.Gun');

(function(d) {
	d.declare('Transformers.Gun', [ Transformers._Weapon ], {
		maxDamage : 5,
		rounds : 500,
		
		constructor : function(args) {
			this.inherited(args);
		}
	});
})(dojo);