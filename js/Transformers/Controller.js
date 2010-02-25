dojo.provide('Transformers.Controller');

dojo.require('Transformers.Bot');

(function(d) {
	dojo.declare('Transformers.Controller', null, {
		teams : [{
			team : 'autobot',
			evil : false,
			missiles : 1,
			guns : 5
		},
		{
			team : 'decepticons',
			evil : true,
			missiles : 3,
			guns : 1
		}],
		
		players : [],
		
		constructor : function() {
			this.setupButton = d.byId('setup');
			this.playButton = d.byId('play');
			
			d.connect(d.byId('setup'), 'click', this, '_setup');
			d.connect(d.byId('play'), 'click', this, '_play');
		},
		
		_setup : function() {
			d.forEach([this.teams], function(t) {
				this.players.push(new Transformers.Bot(t));
			}, this);
		},
		
		_play : function() {
			
		}
	});
})(dojo);
