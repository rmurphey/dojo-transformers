dojo.provide('Transformers.Game');

dojo.require('dijit._Widget');

dojo.require('Transformers.Referee');
dojo.require('Transformers.Team');

(function(d) {
	d.declare('Transformers.Game', [ dijit._Widget ], {
		
		constructor : function(args) {
			this.teams = (args && args.teams) || [
				{
					name : 'autobots',
					evil : false
				},
				
				{
					name : 'decepticons',
					evil : true
				}
			];
			
			this._newGame();
		},
		
		_newGame : function() {
			this.ref && this.ref.destroy();

			console.log('creating referee');
			this.ref = new Transformers.Referee({ game : this });			

			console.log('creating teams');
			d.forEach(this.teams, function(t) { new Transformers.Team(t); });			
		}
	});
})(dojo);