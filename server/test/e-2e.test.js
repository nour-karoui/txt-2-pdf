const request = require('supertest');
const {app} = require('../app');
const fs = require('fs');

describe('can generate a pdf', () => {
    it('should generate a pdf and return status 200', async () => {
        const result = await request(app)
            .post('')
            .send({
                "author": 'some author'
            });
        status = result.status;
        const response = JSON.parse(result.text);

        expect(response.response).toEqual("PDF generated");
        expect(status).toEqual(200);
    });
});

describe('can upload a file, generate pdf and delete the uploaded file', () => {
    it('should upload a file, generate a pdf and return status 200', async () => {
        const result = await request(app)
            .post('/upload')
            .field("author", 'some author')
            .attach('file', 'test/test.txt');

        status = result.status;
        const response = JSON.parse(result.text);

        const files = await fs.readdirSync('uploads');

        expect(files.length).toEqual(0);
        expect(response.response).toEqual("PDF generated");
        expect(status).toEqual(200);
    });

    it('should return a 400 error if file type is invalid', async () => {
        const result = await request(app)
            .post('/upload')
            .field("author", 'some author')
            .attach('file', 'test/invalidfile.docx');

        status = result.status;
        const response = JSON.parse(result.text);

        expect(response.error).toEqual("Only .txt format allowed!");
        expect(status).toEqual(400);
    });
});

