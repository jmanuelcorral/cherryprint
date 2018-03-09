'use strict';

var constants = require('./constants');
var utils = require('./utils');

var Mustache = require('Mustache');

String.prototype.replaceAll = String.prototype.replaceAll || utils.replaceAll;

function format(requestTemplate) {
	var template = requestTemplate;
	template = constants.DOCUMENT_HEAD + template + constants.DOCUMENT_END;
	return template;
}

function miniRender(template, data) {
	var output = "";
	output = Mustache.render(template, data);
	return output;
}

function RenderProps(data) {
	for (var key in data) {
		var myCandidate = data[key];
		if (types.get(myCandidate) == utils.types.string) {
			data[key] = miniRender(myCandidate, data);
		} else if (types.get(myCandidate) == utils.types.array) {
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
	templateRender: templateRender
};