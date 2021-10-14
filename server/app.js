const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {generatePdfController, uploadGeneratePdf} = require('./controllers/pdfController');
const { body } = require('express-validator');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Fiasco PDF Generator API'
        },
        servers: ['http://localhost:8000']
    },
    apis: ['app.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


app
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json({  extended: true }))
    .use(cors())
    /**
     * @swagger
     * /upload:
     *  post:
     *      description: use to upload a text file and generate a pdf file
     *      consumes:
     *          - multipart/form-data
     *      parameters:
     *          - in: formData
     *            name: file
     *            required: true
     *            description: the file to be uploaded
     *            type: file
     *          - in: formData
     *            name: author
     *            description: the author name to be added in metadata.
     *            required: false
     *            type: string
     *          - in: formData
     *            name: title
     *            description: document title to be added in metadata
     *            required: false
     *            type: string
     *          - in: formData
     *            name: subject
     *            description: the subject to be added in metadara
     *            required: false
     *            type: string
     *          - in: formData
     *            name: keywords
     *            description: keywords to be added in metadata
     *            required: false
     *            type: string
     *      responses:
     *          '200':
     *              description: 'PDF generated'
     *          '400':
     *              description: 'file type invalid'
     */
    .post('/upload', body('file').notEmpty(), uploadGeneratePdf)
    /**
     * @swagger
     * /:
     *  post:
     *      description: use to generate pdf from an existing text file
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: body
     *            name: metadata
     *            description: the document's metadata.
     *            schema:
     *              type: object
     *              properties:
     *                  author:
     *                      type: string
     *                  title:
     *                      type: string
     *                  subject:
     *                      type: string
     *                  keywords:
     *                      type: string
     *      responses:
     *          '200':
     *              description: 'PDF generated'
     *          '404':
     *              description: 'file not found'
     */
    .post('', generatePdfController)



module.exports = {
    app
}
