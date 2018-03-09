'use strict';

var fs = require('fs');
var documentFormatter = require('./documentRenderer');
var fileConverter = require('./fileConverter');
var http = require('http');

var port = process.env.PORT || 3000;

var requestHandler = function requestHandler(request, response) {
  if (request.body && request.body.data && request.body.template) {
    response.writeHead(200, "OK", {
      "Content-Type": "application/pdf",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    var data = request.body.data;
    var template = request.body.template;
    var html = documentFormatter.templateRender(template, data);
    fileConverter.generatePdf(html).toStream(function (err, stream) {
      stream.pipe(response);
    });
  } else {
    response.writeHead(200, "OK", {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
    response.end('Hello World');
  }
};

var app = http.createServer(requestHandler);
app.listen(port, function (err) {
  if (err) {
    return console.log('Unhandled Exception', err);
  }

  console.log('Server is listening on ' + port);
});