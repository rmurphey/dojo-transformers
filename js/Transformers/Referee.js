dojo.provide('Transformers.Referee');

(function(d) {
	d.declare('Transformers.Referee', [ dijit._Widget ], {
		rate : 1000, 	// ms
		
		constructor : function() {
			this.teams = [];
			this.teamResults = [];
			
			this.results = {};
			
			this.turns = 0;
			this.maxTurns = 100;
			
			d.subscribe('/team/ping', this, '_handleTeamPing');
			d.subscribe('/game/start', this, '_doTurn');
			d.subscribe('/game/end', this, '_endGame');
			d.subscribe('/team/join', this, '_handleTeamJoin');
			d.subscribe('/turn/over', this, '_turnOver');
		},
		
		_doTurn : function() {
			console.log('referee doing turn');

			if (this.turns++ > this.maxTurns) { 
				console.log('game over');
				d.publish('/game/end');
				return;
			}
			
			d.publish('/team/play', [ this.results ]);
			console.log('turn complete');
		},
		
		_turnOver : function(bots) {
			this.teamResults.push(bots);
			
			if (this.teamResults.length === this.teams.length) {
				this._evaluateTurn();
			}
		},
		
		_evaluateTurn : function() {
			// fancy calculations go here ... later
			console.log('the turn is over. we have no idea who won yet.');
			console.dir(this.teamResults);
			
			// reset for the next turn
			this.teamResults = [];
			this.timeout = setTimeout(d.hitch(this, '_doTurn'), this.rate);
		},
		
		_handleTeamJoin : function(team) {
			console.log('team joined');
			this.teams.push(team);
			
			if (this.teams.length === 2) {
				console.log('starting game');
				d.publish('/game/start');
			}
		},
		
		_handleTeamPing : function(ping) {
			console.dir(ping);
		},
		
		_endGame : function(data) {
			console.log(data);
			this.timeout && clearTimeout(this.timeout);
			this.destroy();
		}
	});
})(dojo);