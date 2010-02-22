dojo.provide('Transformers.Referee');

(function(d) {
	d.declare('Transformers.Referee', null, {
		rate : 100, 	// ms
		
		constructor : function() {
			d.subscribe('/team/join', this, '_registerTeam');
			d.subscribe('/bot/ping', this, '_handleBotPing');

			d.subscribe('/game/start', this, '_doTurn');
			
			this.firstTurn = Math.random() > 0.5 ? 0 : 1;
		},
		
		_doTurn : function() {
			
		},
		
		_registerTeam : function(team) {
			this.teams.push(team);
		},
		
		_handleBotPing : function(ping) {
			console.dir(ping);
		}
	});
})(dojo);