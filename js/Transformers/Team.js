dojo.provide('Transformers.Team');

dojo.require('dijit._Widget');

dojo.require('Transformers._Transformer');
dojo.require('Transformers.Autobot');
dojo.require('Transformers.Decepticon');

(function(d) {
	d.declare('Transformers.Team', [ dijit._Widget ], {
		defaultTeamSize : 5,
		
		constructor : function(args) {
			this.team = args.team || 'anonymous';
			this.score = 0;
			this._setup();

			d.subscribe('/game/start', this, '_setup');
			d.subscribe('/status/request', this, '_sendStatus');

			d.publish('/game/join', [ this ]);			
		},
		
		_setup : function(config) {
			var size = this.teamSize || this.defaultTeamSize;
			
			this.members = [];
			while (size--) {
				this.members.push(new this.creator({ team : this.name }));
			}
		},
		
		_sendStatus : function() {
			d.publish('/team/ping', [ this ]);
		}
	});
})(dojo);