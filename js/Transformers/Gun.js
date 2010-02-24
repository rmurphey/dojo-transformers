dojo.provide('Transformers.Gun');

dojo.require('Transformers._Weapon');

(function(d) {
	d.declare('Transformers.Gun', [ Transformers._Weapon ], {
		maxDamage : 5,
		rounds : 500,
		
		constructor : function(args) {
			this.inherited(args);
		}
	});
})(dojo);