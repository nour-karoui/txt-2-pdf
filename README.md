# Text to PDF Mini Project

One of our tasks at the moment is to convert a text document to a PDF file. There are a few requirements (see below). The PDF generation should be done using NodeJS (we will use it either on our frontend and/or on our backend, both of which are written JavaScript).


## Input Data

Use the file [`input.txt`][1] in this repository as the input.


## Expected Result

The output should be a PDF document based on the contents of the input file.


## Requirements

- Use NodeJS.
- You may use any required library available via NPM.
- The basic formatting of the input data should be kept. No new line breaks must be added. Lines should not wrap around to the next line.
- Support page breaks. These are given as three dashes surrounded by empty lines in the input data (see [lines 136-138 in `input.txt`][2] for an example).
- Use a fixed-width font (e.g. Courier).
- Allow to set meta data (author, document title, etc.).


## Optional Features

The original source of the text contains some more formatting options regarding headers, footers, and centering of lines. These are optional to support.

## Realised Work

**The realised work is inside the server folder**

* I implemented the work using an npm package called **jspdf**, I chose this library because it handles client and server side, so we can easily switch the logic to the frontend.  
  
* In addition to that, this is one of the most famous libraries for generating pdf (more than 400k downloads per week)

I worked on an API, that has two endpoints:  
1- one for simply generating a pdf file out of an existing text file  
2- the second endpoint allows you to upload a text file and convert it to a pdf  
  
* I dockerized the project
  
* I implemented unit & e-2-e tests using jest & supertest

* I documented the project using Swagger
## Project Structure

the work realised is in the server folder:

* server.js sets the server port and runs the server
* app.js handles routes
* controllers/pdfController.js handles requests and responses
* services/pdfService.js handles the logic of reading a file and generating a pdf
* /test includes unit and end-2-end tests

## How It Works
````shell script
npm i
npm start
````


**GO TO**: http://localhost:8000/api-docs for documentation and further details

[1]: https://github.com/fiasco-gmbh/mini-project-pdf/blob/main/input.txt
[2]: https://github.com/fiasco-gmbh/mini-project-pdf/blob/dc4e1e26e4e2e794d1256ab7bf72a8383cb17b0c/input.txt#L137
