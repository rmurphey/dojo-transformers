dojo.provide('Transformers.Game');

dojo.require('dijit.Widget');
dojo.require('Transformers.Referee');

(function(d) {
	d.declare('Transformers.Game', [ dijit._Widget ], {
		
		constructor : function(args) {
			this.teams = (args && args.teams) || ['autobots', 'decepticons'],
			this.controller = new Transformers.Referee();
			
			d.forEach(teams, function(t) { new Transformers.Team(t); });
			
			d.publish('/game/new');
			d.publish('/game/start');
		}
	});
})(dojo);