let constants = require('./constants');
let utils = require('./utils');

let Mustache = require('mustache');

String.prototype.replaceAll = String.prototype.replaceAll || utils.replaceAll;


function format(requestTemplate) {
	let template = requestTemplate;
	template = constants.DOCUMENT_HEAD + template + constants.DOCUMENT_END;
	return template;
}

function miniRender(template, data) {
	let output = "";
	output = Mustache.render(template, data);
	return output;
}

function RenderProps(data) {
	for (var key in data) {
		var myCandidate = data[key];
		if (types.get(myCandidate) == utils.types.string) {
			data[key] = miniRender(myCandidate, data);
		}
		else if (types.get(myCandidate) == utils.types.array) {
			data[key] = RenderProps(myCandidate, data[key]);
		}
	}
	return data;
}

function templateRender(template, data) {
	var dataRendered = RenderProps(data);
	return miniRender(template, dataRendered);
}


module.exports = {
	format: format,
	templateRender: templateRender,
};