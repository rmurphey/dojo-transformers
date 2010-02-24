dojo.provide('Transformers._Weapon');

(function() {
	d.declare('Transformers._Weapon', [ dijit._Widget ], {
		constructor : function() {
			d.subscribe('/game/end', this, 'destroy');
		}
	});
})(dojo);
