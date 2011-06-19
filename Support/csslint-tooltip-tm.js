var sys = require("sys"),
	fs = require("fs"),
	env = process.env || process.ENV,
	CSSLINT = require('./csslint-node.js').CSSLint,
	entities = {
		'&': '&amp;',
		'"': '&quot;',
		'<': '&lt;',
		'>': '&gt;'
	};

function html(s) {
	return (s || '').replace(/[&"<>]/g, function(c) {return entities[c] || c;});
}

module.exports = function (options) {
	var file = env.TM_FILEPATH,
		input = fs.readFileSync(file, 'utf8'),
		output = '',
		errors = 0,
		warnings = 0,
		append = '';
	
	// Is this a css file?
	if(/\.css$/i.test(file) === false) return;

	var results = CSSLINT.verify(input);

	if (results) {
		results.messages.forEach(function(e) {
			if (e) {
				if(e.type === 'warning'){
					warnings += 1;
				} else if (e.type === 'error') {
					errors += 1;
				} else {
					append += e.message;
				}
			}
		});
		if (warnings || errors) {
			output = 'Errors: '+ errors + '\nWarnings: ' + warnings;
			// Appending any extra data that is neither a warning or an error (e.g parser failure)
			if(append){
				output += '\n' + append;
			}
			sys.puts(output);
		}
	}
};
