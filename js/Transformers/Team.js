dojo.provide('Transformers.Team');

dojo.require('dijit._Widget');

dojo.require('Transformers._Transformer');
dojo.require('Transformers.Autobot');
dojo.require('Transformers.Decepticon');

(function(d) {
	d.declare('Transformers.Team', [ dijit._Widget, dijit._Templated ], {
		rate : 100,
		maxTeamSize : 5,
		creators : {
			'autobots' : Transformers.Autobot,
			'decepticons' : Transformers.Decepticon,
			'default' : Transformers._Transformer
		},
		templatePath : d.moduleUrl('Transformers', 'templates/team.html'),
		
		constructor : function(args) {
			this.team = args.team || 'anonymous';
			this.creator = this.creators[this.name] || this.creators.default;
			
			this.score = 0;
			this.players = [];
		},
		
		postCreate : function() {
			d.subscribe('/game/new', this, '_setup');
			d.subscribe('/game/reset', this, '_reset');
			this.teamName.innerHTML = this.team;
		},
		
		getResults : function() {
			return 'TODO';
		},
		
		_setup : function(config) {
			this.teamSize = config.type == 'random' ? this._randomTeamSize() : this.playerCount.value || 1;
			
			if (this.teamSize > this.maxTeamSize) { 
				this.teamSize = this.maxTeamSize; 
				this.playerCount.value = this.maxTeamSize;
			}
			
			this.playerCount.disabled = true;
			this.playerCount.value = this.teamSize;
			this._buildTeam();
		},
		
		_buildTeam : function() {
			var size = this.teamSize;
			
			while (size--) {
				var t = new this.creator({ team : this.name }).placeAt(this.playerStatus, 'last')
				this.players.push(t);
			}
		},
		
		_reset : function() {
			this.players = d.filter(this.players, function(player) { 
				player.destroy(); 
				return false;
			}, this);

			this.playerCount.disabled = false;
			this.playerCount.value = '';
			this.playerCount.innerHTML = '0';
		},
		
		_randomTeamSize : function() {
			return Math.floor(Math.random() * this.maxTeamSize) + 1;
		}
	});
})(dojo);