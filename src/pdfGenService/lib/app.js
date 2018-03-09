let fs = require('fs');
let documentFormatter = require('./documentRenderer');
let fileConverter = require('./fileConverter');
const http = require('http');

const port = process.env.PORT || 3000

const requestHandler = (request, response) => {
  if (request.body && request.body.data && request.body.template) {
    response.writeHead(200, "OK", 
    {
      "Content-Type" : "application/pdf",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
        let data = request.body.data;
        let template = request.body.template;
        const html = documentFormatter.templateRender(template, data);
        fileConverter.generatePdf(html).toStream(function(err, stream) {
            stream.pipe(response);
        });
  }
  else {
        response.writeHead(200, "OK", 
        {
        "Content-Type" : "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        });
      response.end('Hello World');
  }
}

const app = http.createServer(requestHandler)
app.listen(port, (err) => {
  if (err) {
    return console.log('Unhandled Exception', err)
  }

  console.log(`Server is listening on ${port}`)
})