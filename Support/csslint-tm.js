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

function inArray(item, arry) {
	for(var key in arry){
		if(~item.indexOf(arry[key])){
			return true;
		}
	}
	return false;
}

function html(s) {
	return (s || '').replace(/[&"<>]/g, function(c) {return entities[c] || c;});
}

module.exports = function () {
	var file = env.TM_FILEPATH,
		input = fs.readFileSync(file, 'utf8'),
		body = '';
	
	// Is this a CSS file?
	if(/\.css$/i.test(file) === false) return;

	var results = CSSLINT.verify(input);

	if (results) {
		results.messages.forEach(function(e) {
			// Holds the generated segment
			var temp = '';
			if (e && e.line && e.col && e.message) {
				temp += ('<a class="'+ e.type +'" href="txmt://open?url=file://' + escape(file) + '&line=' + e.line + '&column=' + e.col + '">' + e.message);
				temp += ('<tt class="line"> Line ' + e.line + ' Char ' + e.col + '</tt>');
				if (e.evidence && !isNaN(e.col)) {
					temp += '<tt>';
					temp += html(e.evidence.substring(0, e.col-1));
					temp += '<em>';
					temp += (e.col <= e.evidence.length) ? html(e.evidence.substring(e.col-1, e.col)) : '&nbsp;';
					temp += '</em>';
					temp += html(e.evidence.substring(e.col));
					temp += '</tt>';
				}
				temp += ('<p class="desc">' + e.rule.desc + '</p>');
				temp += '</a>';
				// Insert our 'error' messages at the top of the list
				if(e.type === "error"){
					body = temp + body;			
				} else {
					body += temp;
				}
				// For sections that only contain a message - e.g general suggestion errors
			} else if (e.message){
				temp += ('<a class="'+ e.type +'" href="txmt://open?url=file://' + escape(file) + '">' + e.message);
				temp += ('<p class="desc">' + e.rule.desc + '</p>');
				temp += '</a>';
				body += temp;
			}
		});	

		fs.readFile(__dirname + '/output.html', 'utf8', function(e, html) {
			sys.puts(html.replace('{body}', body));
		});
	}
};
