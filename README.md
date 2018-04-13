# cherryprint
A small, webbased and easy to use pdf reporting tool

## How to build and launch the containers?

Go to root directory and, Simply execute:

`> docker-compose -f docker-compose.dev.yml build`

`> docker-compose -f docker-compose.dev.yml up`

After that, you will have 2 services working at:

[http://localhost:5000](http://localhost:5000 "")  - reportDesigner

[http://localhost:5001](http://localhost:5001 "")  - pdfGeneratorService

ReportDesigner use vuejs, ParcelJS with hmr. 
PdfGeneratorService use nodemon.

This is only for development purpose. Soon we will have a Production setup.

If you change something in code, the containers code will be reloaded and rebuilt automatically.

