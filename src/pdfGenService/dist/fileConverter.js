'use strict';

var pdf = require('html-pdf');

var prefixName = 'pdfname';
var extensionName = '.pdf';
var publicDirectory = 'public/'; // refactor to configfile
function generateName() {
  var filename = prefixName + new Date().getTime().toString() + extensionName;
  return filename;
}

function generatePdf(html) {
  return pdf.create(html);
}

function toFile(pdfObject, callback) {
  var fileName = generateName();
  pdfObject.toFile(publicDirectory + fileName, function () {
    callback(fileName, arguments);
  });
}

function toStream(pdfObject, response) {
  pdfObject.toStream(function (err, stream) {
    var fileName = generateName();
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    response.attachment(fileName);
    stream.pipe(response);
    response.send({ filename: fileName });
  });
}

/* EXAMPLE OF HEADERS AND FOOTERS
 	pdf.create(output,
            { 
                header: {
                     "height": "48px",
                    "contents": {
                        first: ' ',
                        default: "<table style=\"width: 100%;\"><tbody><tr><td style=\"width: 33.3333%; background-color: rgb(44, 130, 201); text-align: center;\"><span style=\"color: rgb(255, 255, 255);\"><strong>Concepto</strong></span><br></td><td style=\"width: 33.3333%; background-color: rgb(44, 130, 201); text-align: right;\"><span style=\"color: rgb(255, 255, 255);\"><strong>Cantidad </strong></span><br></td><td style=\"width: 33.3333%; background-color: rgb(44, 130, 201); text-align: right;\"><span style=\"color: rgb(255, 255, 255);\"><strong>Importe </strong></span><br></td></tr></tbody></table>",
                    }
                },
                footer: {
                    "height": "45px",
                    "contents": {
                        first: '<span style=\"color: #444;\">{{page}}</span>/<span>{{pages}}</span>',
                        default: "<center><span>Clinica Default S.L.</span></center> <span style=\"color: #444;\">{{page}}</span>/<span>{{pages}}</span>",
                    }
                }
            }).toFile('public/' + filename, function(err, stream){
        console.log('name => ' + filename);
        res.send({filename: filename});
	});
*/

module.exports = {
  generateName: generateName,
  generatePdf: generatePdf,
  toFile: toFile,
  toStream: toStream
};