dojo.provide('Transformers.Referee');

(function(d) {
	d.declare('Transformers.Referee', [ dijit._Widget ], {
		rate : 1000, 	// ms
		
		constructor : function() {
			this.nextTurn = Math.random() > 0.5 ? 0 : 1;
			this.teams = [];
			this.teamResults = [];
			
			this.turns = 0;
			this.maxTurns = 100;
			
			d.subscribe('/team/ping', this, '_handleTeamPing');
			d.subscribe('/game/start', this, '_doTurn');
			d.subscribe('/game/end', this, '_endGame');
			d.subscribe('/team/join', this, '_handleTeamJoin');
			d.subscribe('/turn/over', this, '_turnOver');
		},
		
		_doTurn : function() {
			if (this.turns++ > this.maxTurns) { 
				d.publish('/game/end');
				return;
			}
			console.log('referee doing turn');
			console.log(this.teams);
			
			var teamName = this.teams[this.nextTurn].team.name;
			console.log('turn: ' + teamName);
			d.publish('/play', [ teamName ]);
			console.log('turn complete');
			
			this.nextTurn = this.nextTurn === 0 ? 1 : 0;
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