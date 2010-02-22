dependencies = {
	stripConsole : true,
	action : 'release',
	optimize : 'shrinksafe',
	releaseName : 'game',
	
	layers: [
		{
			name: "../Game/Controller.js",
			dependencies: [
				"Game.Controller"
			]
		},
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "Game", "../Game" ]
	]
}
