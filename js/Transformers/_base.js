dojo.provide('Transformers._base');

dojo.require('Transformers.Bot');

var autobot = new Transformers.Bot({
	team : 'autobot',
	evil : false,
	missiles : 1,
	guns : 5
});

var decepticon = new Transformers.Bot({
	team : 'decepticons',
	evil : true,
	missiles : 3,
	guns : 1
});